var path = require('path'),
    mkdirp = require('mkdirp'),
    Batch = require('batch');

module.exports = function(config) {
};

function touchFiles(files, cb) {
  var dirs = files.map(path.dirname);

  var batch = new Batch();

  dirs.forEach(function(d) {
    batch.push(mkdirp.bind(mkdirp, d));
  });

  batch.end(cb);
}
