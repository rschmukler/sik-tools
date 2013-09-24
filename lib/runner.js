var path = require('path'),
    fs = require('fs'),
    read = fs.readFile,
    write = fs.writeFile,
    mkdirp = require('mkdirp'),
    join = path.join,
    stat = fs.statSync,
    exists = fs.existsSync,
    utils = require('./utils.js'),
    prompt = require('prompt'),
    resolve = path.resolve;

require('colors');

var noop = function() { };

// Configure Prompt
prompt.message = "  ";
prompt.delimiter = " # ";
prompt.start();

module.exports = function(config) {
  mkdirp.sync(config.target);

  var component = config.component;

  if(component) {
    var componentPrompts = component._prompts;
    delete config.component._prompts;
  } else {
    handleConfig();
  }

  prompt.get(componentPrompts, handleConfig);

  function handleConfig(err, results) {
    console.log("Outputing " + config.resourceName + " to: ".grey + path.relative(process.cwd(), config.target));
    if(component  && componentPrompts) {
      for(var key in componentPrompts) { component[key] = results[key]; }
      writeComponent(config.target, component);
    }
    utils.touchFilesInDir(config.target, config.touchFiles);
    if(config.localComponent || config.templateVarsUseLocalComponent) {
      // Update Project component.json
      read(process.cwd() + '/component.json', function(err, data) {
        if(!err) {
          var localComponent = JSON.parse(data);
          if(config.localComponent) {
            localComponent.local = localComponent.local || [];
            localComponent.local.push(config.localComponent);
            write(process.cwd() + '/component.json', JSON.stringify(localComponent, null, 2), noop);
          }
          if(config.templates) {
            processTemplates(config.templates, config.templateVars, config.target, localComponent);
          }
        }
      });
    } else if(!config.templateVarsUseLocalComponent && config.templates) {
      processTemplates(config.templates, config.templateVars,  config.target);
    }
  }
};

function writeComponent(target, component) {
  utils.writeFileMessage("component.json");
  var output = JSON.stringify(component, null, 2);
  write(target + '/component.json', output, function(err) { });
}

function processTemplates(templates, templateVars, target, localComponent) {
  processTemplateVars(templateVars, localComponent);
  renameTemplates(templates, templateVars);
  var keys = Object.keys(templates);
  keys.forEach(function(key) {
    var tKeys = Object.keys(templateVars);
    read(__dirname + '/../templates/' + templates[key], {encoding: 'utf8'}, function(err, data) {
      tKeys.forEach(function(tKey) {
        var regex = new RegExp('{\s*' + tKey + '\s*}', 'g');
        data = data.replace(regex, templateVars[tKey]);
      });
      utils.writeFileMessage(key);
      write(target + '/' + key, data, noop);
    });
  });
}

function renameTemplates(templates, templateVars) {
  var key, val, match;
  for(key in templates) {
    val = templates[key];
    match = key.match(/{\s*(\w+)\s*}/);
    if(match) {
      var keyName = key.replace(match[0], templateVars[match[1]]);
      delete templates[key];
      templates[keyName] = val;
    }
  }
}

function processTemplateVars(templateVars, component) {
  if(!component)
    return;
  for(var key in templateVars) {
    if(/^\$component\./.test(templateVars[key]))
       templateVars[key] = component[templateVars[key].split('.')[1]];
  }
}
