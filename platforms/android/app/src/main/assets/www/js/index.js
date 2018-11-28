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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

console.log('\n deviceready!');

    var output = function(message) {
        console.log(message);
        alert(message);
    }

//var neura = window.cordova.plugins.neura;

        var push = PushNotification.init({
                                         android: {
//                                         senderID: "904777039558",
//                                            senderID: "244738623152",
//                                            forceShow: true
                                         }
                                         });
console.log('\n\n push : ', push);

PushNotification.hasPermission(data => {
console.log('PushNotification.hasPermission: ', data);
  if (data.isEnabled) {
    console.log('isEnabled');
  }
});

        push.on('registration', function(data) {
console.log('push.on registration: ', data);
                output("push.on.registration: [" + data.registrationId + "]");
//               anonymousAuthenticate(data.registrationId);
                });

        push.on('error', function(e) {
console.log('push.on error: ', e);
                output("push.on.error: [" + e.message + "]");
                });

        push.on('notification', function(data) {
console.log('push.on notification: ', data);
                output("push.on.notification: [" + JSON.stringify(data) + "]");
//                anonymousAuthenticate(data.additionalData.pushData.content);
                });

//        push.on('test', function(data) {
//console.log('push.on test: ', data);
//                output("push.on.notification: [" + JSON.stringify(data) + "]");
////                anonymousAuthenticate(data.additionalData.pushData.content);
//                });

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