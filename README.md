apk-updater
===========

Android's apk automatic updater server module for Node.js

See [android-auto-updater-client](https://github.com/NDMAC/android-auto-updater-client) for Android's client library.

## Getting Started

### Simple Example

To enable Apk updater server in a Node.js + Express app :
```javascript
var apkUpdater = require('apk-updater');

var app = express()

apkUpdater.enable(app, '/anyUpdateServerRoute');
```

This will enable both post GET and POST methods for '/anyUpdateServerRoute' in 'app' and will provide APK files found in './.apk_repo' directory.

### Configuration

#### APK Directory

To change APK directory an extra parameter is needed during initialization. Eg.
```javascript
enable(app, '/anyUpdateServerRoute', 'myDirectory');
```

