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
    tagEngagementAttempt : function(featureName,success, error) {
        exec(success, error, "neura", "tagEngagementAttempt", [featureName]);
    },
    tagEngagementFeature : function(featureName,action,success, error) {
        exec(success, error, "neura", "tagEngagementFeature", [featureName,action]);
    },
    simulateAnEvent : function(eventName,success, error) {
        exec(success, error, "neura", "simulateAnEvent",[eventName]);
    },
	getToken : function(success, error) {
        exec(success, error, "neura", "getToken", []);
    },
    setExternalId: function(externalId, success, error) {
        exec(success, error, "neura", "setExternalId",[externalId]);
    },
    subscribeToEventWithWebhook: function(eventName, eventID, webhookID, success, error) {
        exec(success, error, "neura", "subscribeToEventWithWebhook",[eventName, eventID, webhookID]);
    },
    subscribeToEventWithPush: function(eventName, eventID, success, error) {
        exec(success, error, "neura", "subscribeToEventWithPush",[eventName, eventID, null]);
    },
    subscribeToEventWithBraze: function(eventName, eventID, success, error) {
        exec(success, error, "neura", "subscribeToEventWithBraze",[eventName, eventID, null]);
    },
    subscribeToEventWithSFMC: function(eventName, eventID, success, error) {
        exec(success, error, "neura", "subscribeToEventWithSFMC",[eventName, eventID, null]);
    }
};
