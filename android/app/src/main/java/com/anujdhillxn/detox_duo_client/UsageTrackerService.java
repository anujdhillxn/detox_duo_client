package com.anujdhillxn.detox_duo_client;

import android.app.Service;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.os.Binder;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.anujdhillxn.detox_duo_client.rules.ScreentimeRule;
import com.anujdhillxn.detox_duo_client.utils.AppUtils;

import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UsageTrackerService extends Service {

    private final Map<String, Integer> hourlyScreentimeMap = new HashMap<>();
    private final Map<String, Integer> dailyScreentimeMap = new HashMap<>();
    private final Map<String, ScreentimeRule> ruleMap = new HashMap<>();
    private UsageStatsManager usageStatsManager;
    private final String TAG = "UsageTrackerService";
    private final IBinder binder = new LocalBinder();

    public class LocalBinder extends Binder {
        UsageTrackerService getService() {
            return UsageTrackerService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        Log.i(TAG, "Service bound");
        return binder;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        usageStatsManager = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);
        Log.i(TAG, "Service created");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i(TAG, "Service started");
        return START_STICKY;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        Log.i(TAG, "Service unbound");
        return super.onUnbind(intent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i(TAG, "Service destroyed");
    }

    public int getHourlyScreentime(final String packageName) {
        long currentTime = System.currentTimeMillis();


        // Calculate the start of the current hour
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        long startTime = calendar.getTimeInMillis();

        // Query usage stats from the start of the current hour to the current time
        List<UsageStats> stats = usageStatsManager.queryUsageStats(
                UsageStatsManager.INTERVAL_BEST, startTime, currentTime);

        if (stats != null) {
            for (UsageStats usageStat : stats) {
                if (packageName.equals(usageStat.getPackageName())) {
                    return (int) (usageStat.getTotalTimeInForeground() / 1000); // Return time in seconds
                }
            }
        }
        return 0;
    }

    public int getDailyScreentime(final String packageName) {
        long currentTime = System.currentTimeMillis();

        // Calculate the start of the current day
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        long startTime = calendar.getTimeInMillis();

        // Query usage stats from the start of the current day to the current time
        List<UsageStats> stats = usageStatsManager.queryUsageStats(
                UsageStatsManager.INTERVAL_DAILY, startTime, currentTime);

        if (stats != null) {
            for (UsageStats usageStat : stats) {
                if (packageName.equals(usageStat.getPackageName())) {
                    return (int) (usageStat.getTotalTimeInForeground() / 1000); // Return time in seconds
                }
            }
        }
        return 0;
        
    }

    public boolean isHourlyLimitExceeded (final String packageName) {
        final int hourlyUsage = getHourlyScreentime(packageName);
        ScreentimeRule rule = ruleMap.get(packageName);
        Log.i(TAG, String.format("Hourly limit for %s = %s", packageName, rule == null ? "null" : rule.getHourlyMaxSeconds()));
        return (rule != null && hourlyUsage >= rule.getHourlyMaxSeconds());
    }

    public void updateRules(final Map<String, ScreentimeRule> newRules) {
        ruleMap.clear();
        ruleMap.putAll(newRules);
    }
}
