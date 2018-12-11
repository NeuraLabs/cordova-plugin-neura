var exec = require('cordova/exec');

module.exports = {
    getAnonymousAuthenticationState : function(success, error) {
        exec(success, error, "neura", "getAnonymousAuthenticationState");
    },
    authenticate : function(permissions, phone, success, error) {
        exec(success, error, "neura", "authenticate", [{permissions: permissions, phone: phone}]);
    },
    forgetMe : function(showAreYouSureDialog, success, error) {
        exec(success, error, "neura", "forgetMe", [showAreYouSureDialog]);
    },
    subscribeToEvent : function(eventName, webHookId, neuraSendEventViaPush, success, error) {
        exec(success, error, "neura", "subscribeToEvent", [eventName, webHookId, neuraSendEventViaPush]);
    },
    simulateAnEvent : function(eventName, success, error) {
        exec(success, error, "neura", "simulateAnEvent", [eventName]);
    },
    tagEngagementAttempt : function(success, error) {
        exec(success, error, "neura", "tagEngagementAttempt", []);
    },
    tagEngagementFeature : function(success, error) {
        exec(success, error, "neura", "tagEngagementFeature", []);
    }
};
