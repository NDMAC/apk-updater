'use strict';

var uuid = require('node-uuid')
  , reader = require('./apkReader');

var HOUR = 3600000;

var androidUpdate = {}
  , expressApp
  , routePfx
  , links = [];

androidUpdate.updater = function (req, res){
  var name = req.body.pkgname
    , version = req.body.version
    , last = reader.last(name);
  if(last && last.version > version){
  	if(!links[name]){
  		links[name] = { 
  			url: routePfx + '/' + uuid.v4(),
  			timeoutId: setTimeout(function() {
  				var idx;
  				for(idx in expressApp.routes.get){
  					if(expressApp.routes.get[idx].path === links[name].url){
  					  expressApp.routes.get.splice(idx, 1);
  					  break;
  					}
  				}
  				links[name] = null;
  			}, 4 * HOUR)
  		};  		
  		expressApp.get(links[name].url, function(req, res){
  			res.download(last.filepath);
  		});
  		// hack to put this route at first
  		expressApp.routes.get.unshift(expressApp.routes.get.pop());
  	}
    console.log("have update\n" + links[name].url);
    res.send("have update\n" + links[name].url);
  } else {
    console.log("ok : no update " + name + " - " + version + " / " + last );
  	res.send(200);
  }
};


/**
 * Enable auto apk updater for provided Express application and route.
 * @param {@Object} app parent Express application
 * @param {@String} route route prefix for current updater
 * @param {@String} repoDir path for apk directory
 */
function enable(app, route, repoDir){
  expressApp = app;
  routePfx = route;
  if(repoDir){
    reader.setRepoDir(repoDir);
  }
  app.post(route, androidUpdate.updater);
};


/**
 * Module exports.
 */
module.exports = {
   'enable': enable
};
