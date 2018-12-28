package com.neura.cordova.plugin;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.iid.FirebaseInstanceId;
import com.neura.resources.authentication.AnonymousAuthenticateCallBack;
import com.neura.resources.authentication.AnonymousAuthenticateData;
import com.neura.resources.authentication.AnonymousAuthenticationStateListener;
import com.neura.resources.authentication.AuthenticationState;
import com.neura.sdk.object.AnonymousAuthenticationRequest;
import com.neura.sdk.service.SimulateEventCallBack;
import com.neura.sdk.service.SubscriptionRequestCallbacks;
import com.neura.standalonesdk.engagement.NeuraEngagements;
import com.neura.standalonesdk.service.NeuraApiClient;
import com.neura.standalonesdk.util.Builder;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Arrays;
import java.util.List;

public class neura extends CordovaPlugin {

    private static final String TAG = "neura-plugin";

    private static final int ERROR_CODE_UNKNOWN_ERROR = -1;
    private static final int ERROR_CODE_INVALID_ARGS = -2;

    private NeuraApiClient mNeuraApiClient;
    private CordovaInterface mInterface;

    @Override
    public void initialize(final CordovaInterface cordova, final CordovaWebView webView){
        mInterface = cordova;
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, "execute() called with: " + "action = [" + action + "], args = [" + args + "], callbackContext = [" + callbackContext + "]");
        if (mNeuraApiClient==null)
        init1();
        try {
            
            if (action.equals("authenticate")) {
                this.authenticate1(args, callbackContext);
                return true;
            }else if (action.equals("forgetMe")) {
                this.forgetMe(args, callbackContext);
                return true;
            }
            else if (action.equals("getAnonymousAuthenticationState")) {
                this.getAnonymousAuthenticationState(args, callbackContext);
                return true;
            }
            else if (action.equals("logOut")) {
                this.forgetMe(args, callbackContext);
                return true;
            }
            else if (action.equals("subscribeToEvent")) {
                this.subscribeToEvent(args, callbackContext);
                return true;
            }
            else if (action.equals("simulateAnEvent")) {
                this.simulateUserLeftHome(args, callbackContext);
                return true;
            }
            else if (action.equals("tagEngagementAttempt")) {
                this.tagEngagementAttempt(args, callbackContext);
                return true;
            }
            else if (action.equals("tagEngagementFeature")) {
                this.tagEngagementFeature(args, callbackContext);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();

            callbackContext.error(ERROR_CODE_UNKNOWN_ERROR);
        }

        return false;
    }

    private void authenticate1(JSONArray args, CallbackContext callbackContext) {

                       mNeuraApiClient.authenticate(new AnonymousAuthenticationRequest(FirebaseInstanceId.getInstance().getToken()), new AnonymousAuthenticateCallBack() {
                            @Override
                            public void onSuccess(AnonymousAuthenticateData data) {
                                System.out.println(data);
                                callbackContext.success();
                            }

                            @Override
                            public void onFailure(int i) {
                                System.out.println(i);
                                callbackContext.error(i);
                            }
                        });
    }

    private void tagEngagementFeature(JSONArray args, CallbackContext callbackContext) {
        //NeuraEngagements.tagEngagementFeature(mInterface.getContext(),"feature","2",,"2");
    }

    private void tagEngagementAttempt(JSONArray args, CallbackContext callbackContext) {
        NeuraEngagements.tagEngagementAttempt(mInterface.getContext(),"feature","1","red");

    }

    private void getAnonymousAuthenticationState(JSONArray args, CallbackContext callbackContext) {
        AuthenticationState authenticationState=mNeuraApiClient.getAnonymousAuthenticationState();
        Log.wtf("auth",authenticationState.toString());
        Toast.makeText(mInterface.getContext(), authenticationState.toString(),Toast.LENGTH_SHORT).show();
        callbackContext.success(authenticationState.name());
    }

    

    private void init1(){
        mNeuraApiClient = NeuraApiClient.getClient(mInterface.getContext(),"us-f62e09ed95ccb5b0fbdd291580d228a1aaa7bc054b4b059c03368bd34b203e16", "d261c3b18ea0e0a9dc78f12b43c316d90aade9bed95a4fa29114fd1421e20f22");
    }

    private void forgetMe(JSONArray args, final CallbackContext callbackContext) {
        boolean showAreYouSureDialog;
        try {
            showAreYouSureDialog = args.getBoolean(0);
        } catch (JSONException e) {
            e.printStackTrace();
            callbackContext.error(ERROR_CODE_INVALID_ARGS);
            return;
        }
        mNeuraApiClient.forgetMe(mInterface.getActivity(), showAreYouSureDialog, new Handler.Callback() {
            @Override
            public boolean handleMessage(Message msg) {
                callbackContext.success();
                return true;
            }
        });
    }


    private void subscribeToEvent(JSONArray args, final CallbackContext callbackContext) {
        try {
            //Define moments you would like to subscribe to.
            List<String> moments = Arrays.asList("userStartedWalking", "userFinishedWalking",
                    "userStartedDriving", "userFinishedDriving", "userWokeUp", "userGotUp", "userIsIdleFor2Hours",
                    "userIsAboutToGoToSleep", "userArrivedHome", "userLeftHome",
                    "userArrivedToWork", "userLeftWork");

//Subscribe to the moments you wish Neura to alert you :
            for (int i = 0; i < moments.size(); i++) {
// YourMomentIdentifier_ is recommended to be the NeuraID of the user for follow up with customer suppport
                mNeuraApiClient.subscribeToEvent(moments.get(i) ,
                        "YourMomentIdentifier_" + moments.get(i) ,
                        new SubscriptionRequestCallbacks() {
                            @Override
                            public void onSuccess(String eventName, Bundle bundle, String s1) {
                                Log.i(getClass().getSimpleName(), "Successfully subscribed to event " + eventName);

                            }

                            @Override
                            public void onFailure(String eventName, Bundle bundle, int i) {
                                Log.e(getClass().getSimpleName(), "Failed to subscribe to event " + eventName);
                            }
                        });
            }
        } catch (Exception e) {
            e.printStackTrace();

            callbackContext.error(ERROR_CODE_INVALID_ARGS);
        }
    }

    private void simulateUserLeftHome(@SuppressWarnings("UnusedParameters") JSONArray args, final CallbackContext callbackContext) {
        mNeuraApiClient.simulateAnEvent("userLeftHome", new SimulateEventCallBack() {
            @Override
            public void onSuccess(String s) {
                callbackContext.success();
            }

            @Override
            public void onFailure(String s, String s1) {
                callbackContext.error(ERROR_CODE_INVALID_ARGS);
            }
        });
    }

}
