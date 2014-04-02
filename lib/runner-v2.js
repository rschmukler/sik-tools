var path = require('path'),
    mkdirp = require('mkdirp'),
    utils = require('./utils');

require('colors');

module.exports = function(config) {
  var fileList = [];

  // Build a lit of all the files we need to touch
  [config.touchFiles].forEach(function(files) {
    fileList = fileList.concat(files);
  });

  utils.createDirsForFiles(fileList, function(err) {
    if(err) throw err;
    utils.touchFiles(config.touchFiles);
  });

};
