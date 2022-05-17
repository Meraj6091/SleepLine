import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
  StatusBar,
  Modal,
} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {docChannel} from './service';
import Icon from 'react-native-vector-icons/Feather';
import DateIncon from 'react-native-vector-icons/Fontisto';

const PaymentProcess = ({route, navigation}) => {
  const {params} = route;
  //check double destructing
  const state = useSelector((state) => state.userData);
  const {data} = params;
  let user = data?.user;
  const [userData, setUserData] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [createProfile, setCreateProfile] = useState({});

  useEffect(() => {
    if (user) {
      getAllUsers();
    }
  }, [user]);

  const getAllUsers = () => {
    setUserData({
      ...state,
      docId: params.docId, //setting the specific doc id
    });
  };

  const handleChannel = async () => {
    const {data} = await docChannel(userData);
    if (data) {
      navigation.goBack();
    }
  };

  const handleChange = (event, id) => {
    setCreateProfile({
      ...createProfile,
      [id]: event,
    });
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {/* <View style={styles.container}>
        <View style={{marginTop: 20}} /> */}
      {/* <View style={[styles.formContainer]}>
          <Input
            placeholder="First Name"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'firstName')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
          />
          <Input
            placeholder="Last Name"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'lastName')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
          />

          <Input
            placeholder="Weight"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'weight')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
          />
          <Input
            placeholder="Height"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'height')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
          />
        </View> */}

      {/* <TouchableOpacity
          style={[styles.submit, {backgroundColor: '#0251ce'}]}
          onPress={handleChannel}>
          <Text style={styles.submitText}>Proceed</Text>
        </TouchableOpacity> */}
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{fontSize: 18, marginLeft: 15, flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 15}}>Channeling Fee</Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  marginRight: 15,
                  fontSize: 15,
                }}>
                3000 LKR
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 15}}>Tax</Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  marginRight: 15,
                  fontSize: 15,
                }}>
                70 LKR
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Summary</Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'right',
                  marginRight: 15,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                3070 LKR
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Image
            source={require('../../../assets/paymentProceed.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={{marginTop: 50}}>
          <Button
            title="Proceed"
            icon={{
              name: 'arrow-right',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconRight
            iconContainerStyle={{marginLeft: 10, marginRight: -10}}
            titleStyle={{fontWeight: '700'}}
            buttonStyle={{
              backgroundColor: 'rgba(90, 154, 230, 1)',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 250,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate('PaymentGateWay', {...params})}
          />
        </View>
      </View>

      {/* </View> */}
    </ScrollView>
  );

  //   <View style={styles.container}>
  //     {/* <Text onPress={handleChannel}>Pay now</Text> */}
  //   </View>
  // );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },

  textStyle: {
    fontSize: 25,
    flex: 1,
  },
  image: {
    width: 320,
    height: 200,
    marginVertical: 55,
  },
});

export default PaymentProcess;
