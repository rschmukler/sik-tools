var fs = require('fs'),
    read = fs.readFile,
    write = fs.writeFile;

require('colors');

var noop = function() { };

exports.replaceFromTemplate = function(templateName, outputPath, replacements, cb) {
  read(__dirname + '../templates/' + templateName, function(err, data) {
    for(var key in replacements) {
      data = data.replace(':' + key, replacements[key]);
    }
    write(outputPath, data, function(err) {
      if(cb)
        cb(err);
    });
  });
};

exports.parseOptionArray = function(str, extension) {
  return str.split(',').map(function(l) { 
    l = l.trim(); 
    if(extension) {
      var end = l.slice(-1 * extension.length);
      if(end != extension) l += "." + extension;
    }
    return l;
  });
};

exports.touchFilesInDir = function(target, files) {
  files.forEach(function(f) {
    exports.writeFileMessage(f);
    write(target + '/' + f, '', noop);
  });
};

exports.writeFileMessage = function(fileName) {
  console.log("  ->".green + " " + fileName);
};
