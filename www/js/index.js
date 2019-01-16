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

        neura.authenticate([],"", success, failure);
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


      var subscribeToEvent = function(eventName, eventIdentifier) {
        var success = function(eventName) {
          output('Neura subscribeToEvent success [' + eventName + ']');
        };

        var failure = function(errorCode) {
          output('Neura subscribeToEvent failed [' + errorCode + ']');
        };

        neura.subscribeToEvent("userLeftHome", "YourMomentIdentifier_userLeftHome", success, failure);
      };


      var simulateAnEvent = function(eventName) {
        var success = function() {
          output('Neura simulateAnEvent success');
        };

        var failure = function(errorCode) {
          output('Neura simulateAnEvent failed [' + errorCode + ']');
        };

        neura.simulateAnEvent("userLeftHome",success, failure);
      };


      var tagEngagementFeature = function(featureName) {
        var success = function() {
          output('Neura tagEngagementFeature success');
        };

        var failure = function(errorCode) {
          output('Neura tagEngagementFeature failed [' + errorCode + ']');
        };

        neura.tagEngagementFeature("featureName","SNOOZE",success, failure);
      };


      var tagEngagementAttempt = function(featureName) {
        var success = function() {
          output('Neura tagEngagementAttempt success');
        };

        var failure = function(errorCode) {
          output('Neura tagEngagementAttempt failed [' + errorCode + ']');
        };

        neura.tagEngagementAttempt("SNOOZE",success, failure);
      };
       var getToken = function() {
        var success = function(code) {
          output(code);
        };

        var failure = function(errorCode) {
          output('Neura failed [' + errorCode + ']');
        };

        neura.getToken(success, failure);
      };



      document.getElementById("getAnonymousAuthenticationState").addEventListener("click", getAnonymousAuthenticationState);
      document.getElementById("authenticate").addEventListener("click", authenticate);
      document.getElementById("forgetMe").addEventListener("click", forgetMe);
      document.getElementById("subscribeToEvent").addEventListener("click", subscribeToEvent);
      document.getElementById("simulateAnEvent").addEventListener("click", simulateAnEvent);
      document.getElementById("tagEngagementAttempt").addEventListener("click", tagEngagementAttempt);
      document.getElementById("tagEngagementFeature").addEventListener("click", tagEngagementFeature);
    document.getElementById("getToken").addEventListener("click", getToken);

      var success = function() {
        output('Neura init success');

        var push = PushNotification.init({
          android: {
            senderID: "************"
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
