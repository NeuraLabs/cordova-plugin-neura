cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-neura.neura",
    "file": "plugins/cordova-plugin-neura/www/neura.js",
    "pluginId": "cordova-plugin-neura",
    "clobbers": [
      "cordova.plugins.neura"
    ]
  },
  {
    "id": "phonegap-plugin-push.PushNotification",
    "file": "plugins/phonegap-plugin-push/www/push.js",
    "pluginId": "phonegap-plugin-push",
    "clobbers": [
      "PushNotification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-neura": "0.0.3",
  "cordova-plugin-whitelist": "1.3.2",
  "cordova-support-google-services": "1.2.1",
  "phonegap-plugin-multidex": "1.0.0",
  "phonegap-plugin-push": "2.2.3"
};
// BOTTOM OF METADATA
});