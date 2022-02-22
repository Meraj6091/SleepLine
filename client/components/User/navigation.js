import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Navigation from '.././Navigation';
const Tab = createBottomTabNavigator();

function UserNavigation({route, navigation}) {
  const {user} = route.params;

  return <Navigation isUser={true} user={user} navigation={navigation} />;
}
export default UserNavigation;
