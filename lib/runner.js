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
  handleConfig();


  function handleConfig(err, results) {
    console.log("Outputing " + config.resourceName + " to: ".grey + path.relative(process.cwd(), config.target));
    utils.touchFilesInDir(config.target, config.touchFiles);
    processTemplates(config.templates, config.templateVars,  config.target);
  }
};

function processTemplates(templates, templateVars, target, localComponent) {
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
