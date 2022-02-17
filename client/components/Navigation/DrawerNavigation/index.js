import React, {useEffect, useRef} from 'react';
import Home from '../../Doctor/home';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../../Doctor/profile';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({route, navigation}) => {
  const {user} = route.params;
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" initialParams={user} component={Profile} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
