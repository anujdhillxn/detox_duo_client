package com.anujdhillxn.detox_duo_client.utils;

import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;

public class AppUtils {

    // Check if the app has usage stats permission
    // Define the list of packages to track (e.g., Hinge, YouTube, Netflix)
    public static final String[] TARGET_PACKAGES = {
        "com.facebook.katana",
        "com.instagram.android",
        "com.snapchat.android",
        "com.whatsapp",
        "com.twitter.android",
        "com.tencent.ig",
        "com.robo.dev.arknights",
        "com.google.android.youtube", // YouTube
        "com.netflix.mediaclient", // Netflix
        "com.hulu.plus", // Hulu
        "com.amazon.avod.thirdpartyclient", // Prime Video
        "com.disney.disneyplus", // Disney+
        "com.tinder", // Tinder
        "com.okcupid.okcupid", // OkCupid
        "com.bumble.app", // Bumble
        "co.hinge.app", // Hinge
        "com.match.com" // Match.com
    };
}
