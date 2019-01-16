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
    subscribeToEvent : function(eventName, eventIdentifier, success, error) {
        exec(success, error, "neura", "subscribeToEvent", [eventName, eventIdentifier]);
    },
    simulateAnEvent : function(eventName,success, error) {
        exec(success, error, "neura", "simulateAnEvent",[eventName]);
    },
    tagEngagementAttempt : function(featureName,success, error) {
        exec(success, error, "neura", "tagEngagementAttempt", [featureName]);
    },
    tagEngagementFeature : function(featureName,action,success, error) {
        exec(success, error, "neura", "tagEngagementFeature", [featureName,action]);
    },
	getToken : function(success, error) {
        exec(success, error, "neura", "getToken", []);
    }
};

