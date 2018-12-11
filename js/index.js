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

      //================== phonegap-plugin-push ==============start====
      const push = PushNotification.init({
        android: {
        },
        browser: {
          // pushServiceURL: 'https://neura-276e6.firebaseio.com',
          pushServiceURL: 'https://fcm.googleapis.com/fcm/send',
          applicationServerKey: 'BC_wXdQ3gUfUumewxYMMLlicXBCYfu0ttZzUCa2TosPk8-hiXgKAEDgbUDSGB4sKM02qaXP2IGtCOt7jbvmNeMM'
        },
        ios: {
          alert: "true",
          badge: "true",
          sound: "true"
        },
        windows: {}
      });

      push.on('registration', (data) => {
        // data.registrationId
        console.log('registration', data);
      });

      push.on('notification', (data) => {
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
        console.log('notification', data);
      });

      push.on('error', (e) => {
        // e.message
        console.log('error', e);
      });
      //================== phonegap-plugin-push ==============end====


      app.receivedEvent('deviceready');

      var neura = window.cordova.plugins.neura;

      var output = function(message) {
        console.log(message);
        alert(message);
      };


      var getAnonymousAuthenticationState = function(){
        var success = function() {
          output('Neura Anonymous Authentication success');
        };

        var failure = function(errorCode) {
          output('Neura Anonymous Authentication failed [' + errorCode + ']');
        };
        neura.getAnonymousAuthenticationState(success, failure);
      };


      var authenticate = function() {
        var success = function() {
          output('Neura authenticate success');
        };

        var failure = function(errorCode) {
          output('Neura authenticate failed [' + errorCode + ']');
        };

        neura.authenticate(["userLeftWork", "userLeftHome", "userPhoneNumber", "userDetails", "userSituation"],"", success, failure);
      };


      var forgetMe = function() {
        var success = function() {
          output('Neura logout success');
        };

        var failure = function(errorCode) {
          output('Neura logout failed [' + errorCode + ']');
        };

        neura.forgetMe(true, success, failure);
      };


      var subscribeToEvent = function(eventName, webHookId, neuraSendEventViaPush) {
        var success = function(eventName) {
          output('Neura subscribeToEvent success [' + eventName + ']');
        };

        var failure = function(errorCode) {
          output('Neura subscribeToEvent failed [' + errorCode + ']');
        };

        neura.subscribeToEvent(eventName, webHookId, neuraSendEventViaPush, success, failure);
      };


      var simulateAnEvent = function(eventName) {
        var success = function() {
          output('Neura simulateAnEvent success [' + eventName + ']');
        };

        var failure = function(errorCode) {
          output('Neura simulateAnEvent failed [' + errorCode + ']');
        };

        neura.simulateAnEvent(success, failure);
      };


      var tagEngagementFeature = function() {
        var success = function() {
          output('Neura tagEngagementFeature success');
        };

        var failure = function(errorCode) {
          output('Neura tagEngagementFeature failed [' + errorCode + ']');
        };

        neura.tagEngagementFeature(success, failure);
      };


      var tagEngagementAttempt = function() {
        var success = function() {
          output('Neura tagEngagementAttempt success');
        };

        var failure = function(errorCode) {
          output('Neura tagEngagementAttempt failed [' + errorCode + ']');
        };

        neura.tagEngagementAttempt(success, failure);
      };


      document.getElementById("getAnonymousAuthenticationState").addEventListener("click", getAnonymousAuthenticationState);
      document.getElementById("authenticate").addEventListener("click", authenticate);
      document.getElementById("forgetMe").addEventListener("click", forgetMe);
      document.getElementById("subscribeToEvent").addEventListener("click", subscribeToEvent);
      document.getElementById("simulateAnEvent").addEventListener("click", simulateAnEvent);
      document.getElementById("tagEngagementAttempt").addEventListener("click", tagEngagementAttempt);
      document.getElementById("tagEngagementFeature").addEventListener("click", tagEngagementFeature);


      var success = function() {
        output('Neura init success');

        var push = PushNotification.init({
          android: {
            senderID: "************"
            // senderID: "904777039558"
          }
        });

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
      };

      var failure = function(errorCode) {
        output('Neura init failed [' + errorCode + ']');
      };

      neura.init("****************", "*****************", success, failure);
      // neura.init("c532adf109730db39b6600b8574035f316a62be5e223dd5524fc17bb96f88c27", "1da1870dad66f1028fb68a7bba70164546852c95b7e81d3bc525fa6b40d541b1", success, failure);


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
