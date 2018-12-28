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
        console.log('PushNotification',PushNotification);
        console.log('push--',push);
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
