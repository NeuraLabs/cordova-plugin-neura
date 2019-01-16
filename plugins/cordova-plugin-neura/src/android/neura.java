package com.neura.cordova.plugin;

import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ActivityCompat;
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
import com.neura.standalonesdk.engagement.EngagementFeatureAction;
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
            initNeura();
        try {
            checkLocation();
            if (action.equals("authenticate")) {
                this.authenticateNeuraUser(args, callbackContext);
                return true;
            }else if (action.equals("forgetMe")) {
                this.forgetMe(args, callbackContext);
                return true;
            }
            else if (action.equals("getAnonymousAuthenticationState")) {
                this.getAnonymousAuthenticationState(args, callbackContext);
                return true;
            }
            else if (action.equals("subscribeToEvent")) {
                this.subscribeToEvent(args, callbackContext);
                return true;
            }
            else if (action.equals("simulateAnEvent")) {
                this.simulateAnEvent(args, callbackContext);
                return true;
            }
            else if (action.equals("tagEngagementAttempt")) {
                this.tagEngagementAttempt(args, callbackContext);
                return true;
            }
            else if (action.equals("getToken")) {
                this.getToken(args, callbackContext);
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
    private void checkLocation(){
        if (ActivityCompat.checkSelfPermission(mInterface.getActivity(),
                android.Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(mInterface.getActivity(),
                android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(mInterface.getActivity(),
                    new String[]{ android.Manifest.permission.ACCESS_FINE_LOCATION}, 1111);
        }
    }

    private void authenticateNeuraUser(JSONArray args, CallbackContext callbackContext) {

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

    private void getToken(JSONArray args, CallbackContext callbackContext) {
        try{
            String token = mNeuraApiClient.getUserAccessToken();
            Log.wtf("userToken",token);
            callbackContext.success(token);
        }
        catch(Exception e ){
            callbackContext.error(e.toString());
        }
    }

    private void tagEngagementFeature(JSONArray args, CallbackContext callbackContext) {
        EngagementFeatureAction action;
        try {
            switch ( args.getString(1)){
                case "CLOSE": action=EngagementFeatureAction.CLOSE;
                    break;
                case "OPT_OUT ": action=EngagementFeatureAction.OPT_OUT ;
                    break;
                case "REJECT": action=EngagementFeatureAction.REJECT;
                    break;
                case "SNOOZE": action=EngagementFeatureAction.SNOOZE;
                    break;
                case "SUCCESS": action=EngagementFeatureAction.SUCCESS ;
                    break;
                default:
                    callbackContext.error(ERROR_CODE_INVALID_ARGS);
                    action=EngagementFeatureAction.CLOSE;
                    break;
            }
            NeuraEngagements.tagEngagementFeature(mInterface.getContext(),args.getString(1),null,action,null);
            callbackContext.success();
        } catch (JSONException e) {
            e.printStackTrace();
            callbackContext.error(ERROR_CODE_INVALID_ARGS);
        }
    }

    private void tagEngagementAttempt(JSONArray args, CallbackContext callbackContext) {
        try {
            NeuraEngagements.tagEngagementAttempt(mInterface.getContext(),args.getString(0),null,null);
            callbackContext.success();
        } catch (JSONException e) {
            callbackContext.error(ERROR_CODE_INVALID_ARGS);
            e.printStackTrace();
        }

    }

    private void getAnonymousAuthenticationState(JSONArray args, CallbackContext callbackContext) {
        AuthenticationState authenticationState=mNeuraApiClient.getAnonymousAuthenticationState();
        Log.wtf("auth",authenticationState.toString());
        Toast.makeText(mInterface.getContext(), authenticationState.toString(),Toast.LENGTH_SHORT).show();
    }



    private void initNeura(){
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
            String eventName = args.getString(0);
            String eventIdentifier = args.getString(1);
            mNeuraApiClient.subscribeToEvent(eventName ,
                    eventIdentifier ,
                    new SubscriptionRequestCallbacks() {
                        @Override
                        public void onSuccess(String eventName, Bundle bundle, String s1) {
                            Log.i(getClass().getSimpleName(), "Successfully subscribed to event " + eventName);
                            callbackContext.success(eventName);
                        }

                        @Override
                        public void onFailure(String eventName, Bundle bundle, int i) {
                            Log.e(getClass().getSimpleName(), "Failed to subscribe to event " + eventName);
                            callbackContext.error(i);
                        }
                    });

        } catch (Exception e) {
            e.printStackTrace();

            callbackContext.error(ERROR_CODE_INVALID_ARGS);
        }
    }

    private void simulateAnEvent(JSONArray args, final CallbackContext callbackContext) {
        try {
            String eventName = args.getString(0);
            mNeuraApiClient.simulateAnEvent(eventName, new SimulateEventCallBack() {
                @Override
                public void onSuccess(String s) {
                    callbackContext.success();
                }

                @Override
                public void onFailure(String s, String s1) {
                    callbackContext.error(ERROR_CODE_INVALID_ARGS);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
            callbackContext.error(ERROR_CODE_INVALID_ARGS);
        }
    }

}
