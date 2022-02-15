import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Styles from './styles';
import Colors from './Colors';
import MyHeader from './myHeader';

export default function ColorScreen({route, navigation}) {
  const viewRef = React.useRef(null);
  const [bgColor, setBgColor] = useState();
  useEffect(() => {
    setBgColor(Colors.green);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({0: {opacity: 0.5}, 1: {opacity: 1}});
    });
    return () => unsubscribe;
  }, [navigation]);
  return (
    <View style={Styles.container}>
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
      />
      <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        style={Styles.container}>
        <View style={{backgroundColor: Colors.green, flex: 1}} />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({});
