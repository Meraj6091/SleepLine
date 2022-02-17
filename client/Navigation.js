import React, {useEffect, Component, useState, useLayoutEffect} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from './components/Signup';
import Login from './components/Login';
import CreateAccountAs from './components/CreateAccountAs';
import AsyncStorage from '@react-native-community/async-storage';
import UserNavigation from './components/User/navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/User/home';
import Prediction from './components/User/prediction';
import DocNavigation from './components/Doctor/navigation';
import FirstScreen from './components/Intro/firstScreen';
import SecondScreen from './components/Intro/secondScreen';
import LastScreen from './components/Intro/lastScreen';

import createProfile from './components/User/createProfile';
//doc intro
import DocFirstScreen from './components/Intro/Doc/firstScreen';
import DocSecondScreen from './components/Intro/Doc/secondScreen';
import DocLastScreen from './components/Intro/Doc/lastScreen';
import DocCreateProfile from './components/Doctor/createProfile';
import DrawerNavigation from './components/Navigation/DrawerNavigation';
import Profile from './components/Doctor/profile';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CreateAccountAs"
          component={CreateAccountAs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UserNavigation"
          component={UserNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocNavigation"
          component={DocNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="firstScreen"
          component={FirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LastScreen"
          component={LastScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="createProfile"
          component={createProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocFirstScreen"
          component={DocFirstScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocSecondScreen"
          component={DocSecondScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocLastScreen"
          component={DocLastScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DocCreateProfile"
          component={DocCreateProfile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
