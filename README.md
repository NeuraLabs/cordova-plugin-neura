# cordova-neura-plugin

This plugin is a wrapper of the <a href="https://dev.theneura.com/">Neura SDK</a> allowing you to use all its functions on a cordova app

## Installation

Install via repo url directly:

    cordova plugin add https://github.com/NeuraLabs/cordova-plugin-neura.git
    
## Sample app


The sample app included in this repo under the branch "sample"  demonstrates the basic usage of the Neura SDK via this plugin.
To run the sample app please follow these steps:

## Android
    
1. Pull or download the code in branch "sample"
2. cd to the sample app folder
3. run `cordova platforms add android`
4. In the file platforms/android/app/src/main/java/com/neura/cordova/plugin/neura.java Add your app's UID and Secret as you received them after registering your app with Neura
5. run `cordova run android`

## iOS - plugin integration into sample application

### iOS implementation is currently under development and in beta
Due to a fact the cordova-neura-plugin is based on NeuraSDK.framework, and the framework is distributed separately from the plugin, please perform following steps to set up the environment correctly.

1. Download <a href="https://github.com/NeuraLabs/cordova-neura-plugin.git">Neura Cordova Plugin</a>
2. Download <a href="https://cdn.theneura.com/files/product/ios/sdk/NeuraStandaloneSDKPackage.zip">Neura SDK framework</a> and unzip the contents.
3. Copy 'NeuraSDK.framework' from the 'Release-universal' folder to previously downloaded 'path/to/cordova-neura-plugin/' folder.
4. Download <a href="https://github.com/NeuraLabs/NeuraSampleCordova.git">NeuraSampleCordova application</a>.
5. cd to application folder
6. Add iOS platform to the application: 
	'cordova platform add ios'
7. Install 'xcode' package via 'npm' for that application (necessary for correct xcode project setup):
	'npm i xcode'
8. Add previously fetched plugin (local installation):
	'cordova plugin add /path/to/cordova-neura-plugin/'
9. Build cordova project (--verbose can be omitted here): 
 	'cordova build ios --verbose'
10. Open xcode project 'path/to/NeuraSampleCordova/platforms/ios/NeuraSampleCordova.xcworkspace'
11. Select appropriate signing team.
12. If you plan on using Push Notification functionality (including NeuraSDK automatic Push Notification functionality), go to the 'Capabilities' tab of the 'NeuraSampleCordova' target and turn on 'Push Notification' capability.

## Using the plugin

After device is ready you must defined the main variable:
```javascript
var neura = window.cordova.plugins.neura;
```
If you using Typescript
```javascript
const neura = window['cordova'].plugins.neura;
```

:thumbsup: *After this you may use all method in your code.*

## Methods

```javascript
neura.init(appUid, appSecret, success, error);
neura.authenticate(permissions, phone, success, error);
```
> permissions - array of string ["userLeftWork", "userLeftHome", "userPhoneNumber"]
> phone - phone number or empty string

```javascript
neura.subscribeToEvent(eventName, webHookId, neuraSendEventViaPush, success, failure);
```
