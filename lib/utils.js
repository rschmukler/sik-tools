var fs = require('fs'),
    path = require('path'),
    read = fs.readFile,
    mkdirp = require('mkdirp'),
    Batch = require('batch'),
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

exports.convertToCapitalized = function(str) {
  return str.split('-').map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join('');
};

exports.createDirsForFiles = function(files, cb) {
  var dirs = files.map(path.dirname);
  var batch = new Batch();

  dirs.forEach(function(d) {
    batch.push(mkdirp.bind(mkdirp, d));
  });

  batch.end(cb);
};

exports.touchFiles = function(files) {
  files.forEach(function(f) {
    exports.writeFileMessage(f);
    write(f, '', noop);
  });
};

exports.touchFilesInDir = function(target, files) {
  files.forEach(function(f) {
    exports.writeFileMessage(f);
    write(target + '/' + f, '', noop);
  });
};

exports.writeFileMessage = function(fileName) {
  console.log("  ["+ "create".green + "] " + fileName);
};
