import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon, {Icons} from './Icons';
import Colors from './Colors';
import ColorScreen from './colorScreen';
import * as Animatable from 'react-native-animatable';
import Home from '../User/home';
import Profile from '../User/profile';
import Therapiests from '../User/therapiests';
//doc
import DocHome from '../Doctor/home';
import DocMedicalRecords from '../Doctor/medicalRecords';
import DocProfile from '../Doctor/profile';
import DocPatients from '../Doctor/patients';
import DrawerNavigation from './DrawerNavigation';
import Prediction from '../User/prediction';
import MedicalRecords from '../User/medicalRecords';

const userTabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: Home,
  },
  {
    route: 'Prediction',
    label: 'Prediction',
    type: Icons.FontAwesome5,
    icon: 'hand-holding-heart',
    component: Prediction,
  },
  {
    route: 'Medical Records',
    label: 'Medical Records',
    type: Icons.FontAwesome5,
    icon: 'file-medical',
    component: MedicalRecords,
  },
  {
    route: 'Therapists',
    label: 'Therapists',
    type: Icons.Fontisto,
    icon: 'doctor',
    component: Therapiests,
  },
  {
    route: 'Profile',
    label: 'Profile',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: Profile,
  },
];

const docTabArr = [
  {
    route: 'Home',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: DocHome,
  },
  {
    route: 'Medical Records',
    label: 'Medical Records',
    type: Icons.FontAwesome5,
    icon: 'file-medical',
    component: DocMedicalRecords,
  },
  {
    route: 'Patients ',
    label: 'Patients ',
    type: Icons.FontAwesome,
    icon: 'user',
    component: DocPatients,
  },
  {
    route: 'Profile',
    label: 'Profile',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: DocProfile,
  },
];

const Tab = createBottomTabNavigator();

const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = (props) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function Navigation({route, user, isUser, navigation}) {
  let data = user;
  data.navigation = navigation;

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}>
        {isUser
          ? userTabArr.map((item, index) => {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  initialParams={data}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton {...props} item={item} />
                    ),
                  }}
                />
              );
            })
          : docTabArr.map((item, index) => {
              return (
                <Tab.Screen
                  key={index}
                  name={item.route}
                  component={item.component}
                  initialParams={data}
                  options={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                      <TabButton {...props} item={item} />
                    ),
                  }}
                />
              );
            })}
      </Tab.Navigator>
      {/* <DrawerNavigation /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
  },
});
