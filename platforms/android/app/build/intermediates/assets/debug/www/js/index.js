
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
initialize: function() {
    this.bindEvents();
},
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
},
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady: function() {
    app.receivedEvent('deviceready');

    var output = function(message) {
        console.log(message);
        alert(message);
    }

    var neura = window.cordova.plugins.neura;    

    var authenticate = function() {
        var success = function() {
            output('Neura authenticate success');
        }

        var failure = function(errorCode) {
            output('Neura authenticate failed [' + errorCode + ']');
        }

        // TODO: Update the permissions list according to the permissions your app requested on Neura devsite at this link
        // (replace APP_UID with your app UID):
        // https://dev.theneura.com/console/edit/APP_UID
        // Go to "Permissions", scroll all the way down and paste the list of permissions

        neura.authenticate(["userLeftWork", "userLeftHome", "userPhoneNumber", "userDetails", "userSituation"],"", success, failure);
    }

    var anonymousAuthenticate = function(deviceToken){
        var success = function() {
                    output('Neura authenticate success');
                }

                var failure = function(errorCode) {
                    output('Neura authenticate failed [' + errorCode + ']');
                }
        neura.anonymousAuthenticate(deviceToken, success, failure);
    }

    var forgetMe = function() {
        var success = function() {
            output('Neura logout success');
        }

        var failure = function(errorCode) {
            output('Neura logout failed [' + errorCode + ']');
        }

        neura.forgetMe(true, success, failure);
    }

    var getSubscriptions = function() {
        var success = function(subscriptions) {
            output('Neura getSubscriptions success [' + JSON.stringify(subscriptions) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getSubscriptions failed [' + errorCode + ']');
        }

        neura.getSubscriptions(success, failure);
    }

    var subscribeLeftHome = function() {
        subscribeToEvent("userLeftHome", "com.neuraSampleApp", true);
    }

    var subscribeLeftWork = function() {
        subscribeToEvent("userLeftWork", "com.neuraSampleApp", true);
    }

    var subscribeToEvent = function(eventName, webHookId, neuraSendEventViaPush) {
        var success = function(eventName) {
            output('Neura subscribeToEvent success [' + eventName + ']');
        }

        var failure = function(errorCode) {
            output('Neura subscribeToEvent failed [' + errorCode + ']');
        }

        neura.subscribeToEvent(eventName, webHookId, neuraSendEventViaPush, success, failure);
    }

    var unsubscribeLeftHome = function() {
        removeSubscription("userLeftHome", "userLeftHome", true);
    }

    var unsubscribeLeftWork = function() {
        removeSubscription("userLeftWork", "userLeftWork", true);
    }

    var removeSubscription = function(eventName, eventIdentifier, neuraSendEventViaPush) {
        var success = function(eventName) {
            output('Neura removeSubscription success [' + eventName + ']');
        }

        var failure = function(errorCode) {
            output('Neura removeSubscription failed [' + errorCode + ']');
        }

        neura.removeSubscription(eventName, eventIdentifier, neuraSendEventViaPush, success, failure);
    }

    var shouldSubscribeUserPhone = function() {
        shouldSubscribeToEvent("userPhoneNumber");
    }

    var shouldSubscribeLeftWork = function() {
        shouldSubscribeToEvent("userLeftWork");
    }

    var shouldSubscribeToEvent = function(eventName) {
        var success = function(eventName) {
            output('Neura shouldSubscribeToEvent success [' + eventName + ']');
        }

        var failure = function(errorCode) {
            output('Neura shouldSubscribeToEvent failed [' + errorCode + ']');
        }

        neura.shouldSubscribeToEvent(eventName, success, failure);
    }

    var getAppPermissions = function() {
        var success = function(permissions) {
            output('Neura getAppPermissions success [' + JSON.stringify(permissions) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getAppPermissions failed [' + errorCode + ']');
        }

        neura.getAppPermissions(success, failure);
    }

    var getPermissionStatus = function() {
        var success = function(permissionsStatus) {
            output('Neura getPermissionStatus success [' + JSON.stringify(permissionsStatus) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getPermissionStatus failed [' + errorCode + ']');
        }

        neura.getPermissionStatus(["userLeftWork"], success, failure);
    }

    var enableLogFile = function() {
        var success = function() {
            output('Neura enableLogFile success');
        }

        var failure = function(errorCode) {
            output('Neura enableLogFile failed [' + errorCode + ']');
        }

        neura.enableLogFile(true, success, failure);
    }

    var enableNeuraHandingStateAlertMessages = function() {
        var success = function() {
            output('Neura enableNeuraHandingStateAlertMessages success');
        }

        var failure = function(errorCode) {
            output('Neura enableNeuraHandingStateAlertMessages failed [' + errorCode + ']');
        }

        neura.enableNeuraHandingStateAlertMessages(true, success, failure);
    }

    var getSdkVersion = function() {
        var success = function(sdkVersion) {
            output('Neura getSdkVersion success [' + sdkVersion + ']');
        }

        var failure = function(errorCode) {
            output('Neura getSdkVersion failed [' + errorCode + ']');
        }

        neura.getSdkVersion(success, failure);
    }

    var isMissingDataForEvent = function() {
        var success = function(isMissingDataForEventResult) {
            output('Neura isMissingDataForEvent success [' + isMissingDataForEventResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura isMissingDataForEvent failed [' + errorCode + ']');
        }

        neura.isMissingDataForEvent("userLeftWork", success, failure);
    }

    var getMissingDataForEvent = function() {
        var success = function(getMissingDataForEventResult) {
            output('Neura getMissingDataForEvent success [' + getMissingDataForEventResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura getMissingDataForEvent failed [' + errorCode + ']');
        }

        neura.getMissingDataForEvent("userLeftActiveZone", success, failure);
    }

    var getKnownDevices = function() {
        var success = function(knownDevices) {
            output('Neura getKnownDevices success [' + JSON.stringify(knownDevices) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getKnownDevices failed [' + errorCode + ']');
        }

        neura.getKnownDevices(success, failure);
    }

    var getKnownCapabilities = function() {
        var success = function(knownCapabilities) {
            output('Neura getKnownCapabilities success [' + JSON.stringify(knownCapabilities) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getKnownCapabilities failed [' + errorCode + ']');
        }

        neura.getKnownCapabilities(success, failure);
    }

    var hasDeviceWithCapability = function() {
        var success = function(hasDeviceWithCapabilityResult) {
            output('Neura hasDeviceWithCapability success [' + hasDeviceWithCapabilityResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura hasDeviceWithCapability failed [' + errorCode + ']');
        }

        neura.hasDeviceWithCapability("sleepQuality", success, failure);
    }

    var addDevice = function() {
        var success = function(addDeviceResult) {
            output('Neura addDevice success [' + addDeviceResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura addDevice failed [' + errorCode + ']');
        }

        neura.addDevice(success, failure);
    }

    var addDeviceByCapabilities = function() {
        var success = function(addDeviceResult) {
            output('Neura addDeviceByCapabilities success [' + addDeviceResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura addDeviceByCapabilities failed [' + errorCode + ']');
        }

        neura.addDeviceByCapabilities(["sleepQuality", "caloriesBurned"], success, failure);
    }

    var addDeviceByName = function() {
        var success = function(addDeviceResult) {
            output('Neura addDeviceByName success [' + addDeviceResult + ']');
        }

        var failure = function(errorCode) {
            output('Neura addDeviceByName failed [' + errorCode + ']');
        }

        neura.addDeviceByName("jawbone up", success, failure);
    }

    var getUserDetails = function() {
        var success = function(userDetails) {
            output('Neura getUserDetails success [' + JSON.stringify(userDetails) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getUserDetails failed [' + errorCode + ']');
        }

        neura.getUserDetails(success, failure);
    }

    var getUserPhone = function() {
        var success = function(userPhone) {
            output('Neura getUserPhone success [' + userPhone + ']');
        }

        var failure = function(errorCode) {
            output('Neura getUserPhone failed [' + errorCode + ']');
        }

        neura.getUserPhone(success, failure);
    }

    var getUserSituation = function() {
        var success = function(userSituation) {
            output('Neura getUserSituation success [' + JSON.stringify(userSituation) + ']');
        }

        var failure = function(errorCode) {
            output('Neura getUserSituation failed [' + errorCode + ']');
        }

        neura.getUserSituation(new Date().getTime(), success, failure);
    }

    var simulateUserLeftHome = function() {
        var success = function() {
            output('Neura simulate userLeftHome success');
        }

        var failure = function(errorCode) {
            output('Neura simulate userLeftHome failed [' + errorCode + ']');
        }

        neura.simulateUserLeftHome(success, failure);
    }


    document.getElementById("authenticate").addEventListener("click", authenticate);
    document.getElementById("anonymousAuthenticate").addEventListener("click", anonymousAuthenticate);
    document.getElementById("forgetMe").addEventListener("click", forgetMe);
    document.getElementById("getSubscriptions").addEventListener("click", getSubscriptions);
    document.getElementById("subscribeLeftHome").addEventListener("click", subscribeLeftHome);
    document.getElementById("subscribeLeftWork").addEventListener("click", subscribeLeftWork);
    document.getElementById("unsubscribeLeftHome").addEventListener("click", unsubscribeLeftHome);
    document.getElementById("unsubscribeLeftWork").addEventListener("click", unsubscribeLeftWork);
    document.getElementById("shouldSubscribeUserPhone").addEventListener("click", shouldSubscribeUserPhone);
    document.getElementById("shouldSubscribeLeftWork").addEventListener("click", shouldSubscribeLeftWork);
    document.getElementById("getAppPermissions").addEventListener("click", getAppPermissions);
    document.getElementById("getPermissionStatus").addEventListener("click", getPermissionStatus);
    document.getElementById("enableLogFile").addEventListener("click", enableLogFile);
    document.getElementById("enableNeuraHandingStateAlertMessages").addEventListener("click", enableNeuraHandingStateAlertMessages);
    document.getElementById("getSdkVersion").addEventListener("click", getSdkVersion);
    document.getElementById("isMissingDataForEvent").addEventListener("click", isMissingDataForEvent);
    document.getElementById("getMissingDataForEvent").addEventListener("click", getMissingDataForEvent);
    document.getElementById("getKnownDevices").addEventListener("click", getKnownDevices);
    document.getElementById("getKnownCapabilities").addEventListener("click", getKnownCapabilities);
    document.getElementById("hasDeviceWithCapability").addEventListener("click", hasDeviceWithCapability);
    document.getElementById("addDevice").addEventListener("click", addDevice);
    document.getElementById("addDeviceByCapabilities").addEventListener("click", addDeviceByCapabilities);
    document.getElementById("addDeviceByName").addEventListener("click", addDeviceByName);
    document.getElementById("getUserDetails").addEventListener("click", getUserDetails);
    document.getElementById("getUserPhone").addEventListener("click", getUserPhone);
    document.getElementById("getUserSituation").addEventListener("click", getUserSituation);
    document.getElementById("simulateUserLeftHome").addEventListener("click", simulateUserLeftHome);



    var success = function() {
        output('Neura init success');

        var push = PushNotification.init({
                                         android: {
//                                         senderID: "904777039558"
                                         senderID: "244738623152"
                                         }
                                         });
//concole.log('push: ', push)
        push.on('registration', function(data) {
                output("push.on.registration: [" + data.registrationId + "]");
               anonymousAuthenticate(data.registrationId);
                });

        push.on('error', function(e) {
                output("push.on.error: [" + e.message + "]");
                });

        push.on('notification', function(data) {
                output("push.on.notification: [" + JSON.stringify(data) + "]");
                anonymousAuthenticate(data.additionalData.pushData.content);
                });
    }

    var failure = function(errorCode) {
        output('Neura init failed [' + errorCode + ']');
    }

    neura.init("c532adf109730db39b6600b8574035f316a62be5e223dd5524fc17bb96f88c27", "1da1870dad66f1028fb68a7bba70164546852c95b7e81d3bc525fa6b40d541b1", success, failure);
},
    // Update DOM on a Received Event
receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
}
};

app.initialize();
