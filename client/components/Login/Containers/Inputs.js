import React, {Component, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';

const Inputs = props => {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (event, id) => {};
  return (
    <View
      style={[styles.container, {borderColor: isFocused ? '#0779ef' : '#eee'}]}>
      <Input
        placeholder={props.name}
        onFocus={() => setIsFocused(true)}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        secureTextEntry={props.pass}
        onChangeText={event => handleChange(event, props.id)}
        leftIcon={
          <Icon
            name={props.icon}
            size={22}
            color={isFocused ? '#0779e4' : 'grey'}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#52524e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Inputs;
