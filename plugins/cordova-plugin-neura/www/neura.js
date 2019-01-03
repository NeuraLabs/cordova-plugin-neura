cordova.define("cordova-plugin-neura.neura", function(require, exports, module) {
var exec = require('cordova/exec');

module.exports = {
    getAnonymousAuthenticationState : function(success, error) {
        exec(success, error, "neura", "getAnonymousAuthenticationState");
    },
    authenticate : function(permissions, phone, success, error) {
        exec(success, error, "neura", "authenticate", []);
    },
    forgetMe : function(showAreYouSureDialog, success, error) {
        exec(success, error, "neura", "forgetMe", [showAreYouSureDialog]);
    },
    subscribeToEvent : function(eventName, webHookId, neuraSendEventViaPush, success, error) {
        exec(success, error, "neura", "subscribeToEvent", [eventName, webHookId, neuraSendEventViaPush]);
    },
    simulateAnEvent : function(success, error) {
        exec(success, error, "neura", "simulateAnEvent");
    },
    tagEngagementAttempt : function(success, error) {
        exec(success, error, "neura", "tagEngagementAttempt", []);
    },
    tagEngagementFeature : function(success, error) {
        exec(success, error, "neura", "tagEngagementFeature", []);
    },
	getToken : function(success, error) {
        exec(success, error, "neura", "getToken", []);
    }
};

});
