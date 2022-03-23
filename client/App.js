/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    LogBox.ignoreAllLogs();
  }, []);

  return <Navigation />;
};

export default App;
