package com.sleepline2;

import com.facebook.react.ReactActivity;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

     @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
   
  }
  @Override
  protected String getMainComponentName() {
    return "SLEEPLINE2";
  }
}
