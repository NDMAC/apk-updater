'use strict';

var fs = require('fs')
  , _ = require('underscore');

/** Contains apk definitions. */
var apk = null
	  /** APK filenames pattern. */
  , apkPattern = /(\w+)-(\d+)\.apk/;


function init(){
	var repoDir = '.apk_repo'
	  , files = fs.readdirSync(repoDir, 'utf8');
	apk = {};

  function addApk(file){
    if(apkPattern.test(file)){
      if(!apk[RegExp.$1]){
        apk[RegExp.$1] = [];
      }
      apk[RegExp.$1].push({
          'version' : parseInt(RegExp.$2),
          'filename' : file,
          'filepath' : repoDir + '/' + file
      });
      apk[RegExp.$1] = _.sortBy(apk[RegExp.$1], function(def){ return def.version; });
    }
  }

  function removeApk(file){
    if(apkPattern.test(file)){
      if(!apk[RegExp.$1]){
        apk[RegExp.$1] = [];
      }
      apk[RegExp.$1] = _.reject(apk[RegExp.$1], function(def){ return def.filename === file; });
    }
  }

  _.each(files, addApk);

  fs.watch(repoDir, function (event, filename) {
    var filepath = repoDir + '/' + filename;
    if (event === 'rename') {
      if (fs.existsSync(filepath)) {
        // file created or renamed
        for(i in apk){
          apk[i] = _.filter(apk[i], function(def){ 
            return fs.existsSync(repoDir + '/' + def.filename); 
          });
        }
        addApk(filename);
      } else {
        // file deleted
        removeApk(filename);
      }
    }
  });
}

/**
 * Returns all available apk files for provided name.
 * @param {@String} name name (prefix) for apk files to look for.
 */
function available(name){
	if(!apk) { init(); }
	return apk;
};

/**
 * Returns last apk for provided name.
 * @param {@String} name name (prefix) for apk files to look for.
 */
function last(name){
  if(!apk) { init(); }
  return _.last(apk[name]);
};

/**
 * Module exports.
 */
module.exports = {
    'available': available
  , 'last': last
};
