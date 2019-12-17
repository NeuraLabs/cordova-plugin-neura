package com.neura.cordova.plugin;

import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.BitmapFactory;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.neura.standalonesdk.events.NeuraEvent;
import com.neura.standalonesdk.events.NeuraEventCallBack;
import com.neura.standalonesdk.events.NeuraPushCommandFactory;
import java.util.Map;

public class NeuraEventsService extends FirebaseMessagingService {
    String TAG  = "MyFirebaseMsgService";
    @Override
    public void onMessageReceived(RemoteMessage message) {
        final Map data = message.getData();
        Log.i(getClass().getSimpleName(), "Received push");
        NeuraPushCommandFactory.getInstance().isNeuraPush(getApplicationContext(), data, new NeuraEventCallBack() {
            @Override
            public void neuraEventDetected(NeuraEvent event) {
                String eventText = event != null ? event.toString() : "couldn't parse data";
                Log.i(getClass().getSimpleName(), "received Neura event - " + eventText);
                // Optional, when a Neura moment is delivered via push (great for debugging) you can generate a notification at this point
                // generateNotification(getApplicationContext(), eventText);
            }
        });
    }

//     private void generateNotification(Context context, String eventText) {
//         String appName = "Neura";
//         int stringId = context.getApplicationInfo().labelRes;
//         if (stringId > 0)
//             appName = context.getString(stringId);

//         String channelId = "def_token";
//         NotificationCompat.Builder builder =
//                 new NotificationCompat.Builder(context, channelId)
//                         .setContentTitle(appName + " detected event")
//                         .setContentText(eventText)
//                         .setSmallIcon(BitmapFactory.decodeResource(context.getResources(), context.getApplicationInfo().icon))
//                         .setLargeIcon(BitmapFactory.decodeResource(context.getResources(), context.getApplicationInfo().icon))
//                         .setAutoCancel(true)
//                         .setWhen(System.currentTimeMillis())
//                         .setStyle(new NotificationCompat.BigTextStyle().bigText(eventText));
//         Notification notification = builder.build();

//         NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
//         notificationManager.notify((int) System.currentTimeMillis(), notification);
//     }

}
