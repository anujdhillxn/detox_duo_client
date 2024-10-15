package com.anujdhillxn.detox_duo_client;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import androidx.annotation.RequiresApi;

import com.anujdhillxn.detox_duo_client.utils.AppUtils;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UsageTrackerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final Map<String, String> screenTimeMap = new HashMap<>();  // Map to store screen times
    private final Handler handler = new Handler(Looper.getMainLooper());

    UsageTrackerModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;

        // Start the periodic tracking of app usage
        startTrackingScreenTimes();
    }

    @Override
    public String getName() {
        return "UsageTracker";
    }

    // Periodically updates the screen time for the tracked apps
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)  // Requires API 21+
    private void startTrackingScreenTimes() {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                updateScreenTimes();  // Update screen times
                handler.postDelayed(this, 5000);  // Schedule to run every 5 seconds
            }
        };
        handler.post(runnable);  // Start the runnable
    }

    // Method to update screen times for each tracked app
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private void updateScreenTimes() {
        UsageStatsManager usageStatsManager = (UsageStatsManager) reactContext.getSystemService(Context.USAGE_STATS_SERVICE);
        Calendar calendar = Calendar.getInstance();
        long endTime = calendar.getTimeInMillis();
        calendar.add(Calendar.DAY_OF_MONTH, -1);  // Track usage for the past day
        long startTime = calendar.getTimeInMillis();

        List<UsageStats> stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

        if (stats != null) {
            for (UsageStats usageStat : stats) {
                String packageName = usageStat.getPackageName();
                for (String trackedApp : AppUtils.TARGET_PACKAGES) {
                    if (packageName.equals(trackedApp)) {
                        long totalTimeInForeground = usageStat.getTotalTimeInForeground();
                        screenTimeMap.put(packageName, Long.toString(totalTimeInForeground / 1000));  // Update the map
                    }
                }
            }
        }
    }

    // Method to fetch the screen time for a specific app from the map
    @ReactMethod
    public void getScreenTime(String packageName, Promise promise) {
        if (screenTimeMap.containsKey(packageName)) {
            String screenTime = screenTimeMap.get(packageName);
            promise.resolve(screenTime);
        } else {
            promise.reject("Error", "No data found for the app.");
        }
    }

    // Method to fetch all screen times from the map
    @ReactMethod
    public void getAllScreenTimes(Promise promise) {
        promise.resolve(screenTimeMap);
    }
}
