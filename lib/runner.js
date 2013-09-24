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
    debugger;
    var componentPrompts = component._prompts;
    delete config.component._prompts;
  } else {
    handleConfig();
  }

  debugger;
  prompt.get(componentPrompts, handleConfig);

  function handleConfig(err, results) {
    console.log("Outputing " + config.resourceName + " to: ".grey + path.relative(process.cwd(), config.target));
    if(component  && componentPrompts) {
      for(var key in componentPrompts) { component[key] = results[key]; }
      writeComponent(config.target, component);
    }
    utils.touchFilesInDir(config.target, config.touchFiles);
    if(config.localComponent) {
      // Update Project component.json
      read(process.cwd() + '/component.json', function(err, data) {
        if(!err) {
          var projectComponent = JSON.parse(data);
          projectComponent.local.push(config.localComponent);
          write(process.cwd() + '/component.json', JSON.stringify(projectComponent, null, 2), noop);
        }
      });
    }
  }
};

function writeComponent(target, component) {
  utils.writeFileMessage("component.json");
  var output = JSON.stringify(component, null, 2);
  write(target + '/component.json', output, function(err) { });
}
