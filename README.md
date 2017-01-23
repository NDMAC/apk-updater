apk-updater
===========

Android's apk automatic updater server module for [Node.js](http://nodejs.org/) with [Express](http://expressjs.com/). This update server is an alternative to Google play server in order to completely manage the APK packages to offer.

See [android-auto-updater-client](https://github.com/NDMAC/android-auto-updater-client) for Android's client library.

## Installation

Install with [npm](https://github.com/npm/npm) :
```
npm install apk-updater
```

## Public API

### enable(app, route, repoDir)

Enables update server module.
- **app** parent Express application (required)
- **route** route prefix for current updater (required)
- **repoDir** path for apk directory (*optional*)

```javascript
var apkUpdater = require('apk-updater');

var app = express()

apkUpdater.enable(app, '/anyUpdateServerRoute');
```

This will enable both post GET and POST methods for '/anyUpdateServerRoute' in 'app' and will provide APK files found in './.apk_repo' directory. These APK file names must match the following format: *packageName*-*packageVersion*.apk with `packageName` the APK name itself (matched as `\w+` for now), and `packageVersion` the package version number (matched as `\d+` for now).

In the above example the 'http://yourserver/anyUpdateServerRoute' URL will return the list of all available APK packages as a JSON list.

## Configuration

### APK Directory

To change APK directory an extra parameter is needed during initialization. Eg.
```javascript
enable(app, '/anyUpdateServerRoute', 'myDirectory');
```

## Client usage

See [android-auto-updater-client](https://github.com/NDMAC/android-auto-updater-client) for client implementation.

### Provided routes

HTTP GET method returns a JSON list of all available packages.

HTTP POST method with 'pkgname' and 'version' parameters returns an auto-generated download URL if an update is available for the given package and version.

