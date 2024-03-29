import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';

import Styles from '../Navigation/styles';

import MyHeader from '../Navigation/myHeader';

import {getAllDocInfo, isChanneled} from './service';
import DocDetails from './DocModal';
import {useSelector} from 'react-redux';
import {round} from 'react-native-reanimated';

const Therapiests = ({route, navigation}) => {
  const {params} = route;
  const state = useSelector((state) => state.userData);
  const signUpState = useSelector((state) => state.signUpData);
  const [visible, setVisible] = useState(false);
  const [channeled, setChanneled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const [docData, setDocData] = useState({});
  const SPACING = 20;
  const AVATAR_SIZE = 70;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible(false);

      // setIsChanneled(!IsChanneled);
      // setChanneled([]);
      checkIsChanneled();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getAllDocProfiles();
  }, []);

  const getAllDocProfiles = async () => {
    const {data} = await getAllDocInfo();
    setProfileInfo(data);
    //checkIsChanneled();
  };

  const checkIsChanneled = async () => {
    setLoading(true);
    const {data} = await isChanneled({userId: state._id});
    await setChanneled(data.map((data) => data._id));
    // getAllDocProfiles();
    setLoading(false);
  };

  const showDoctorDetails = (data) => {
    if (channeled.some((id) => id === data._id)) {
      navigation.navigate('UserChat', {docId: data._id});
    } else {
      setDocData({
        data,
      });
      setVisible(true);
    }
  };

  return (
    <View style={Styles.container}>
      <MyHeader
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
        user={true}
      />

      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          {docData && (
            <DocDetails
              visible={visible}
              setVisible={setVisible}
              docData={docData}
              params={params}
            />
          )}

          <View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#2759ff"
                animating={loading}
              />
            )}
            {profileInfo.length > 0 && (
              <FlatList
                data={profileInfo}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                  padding: SPACING,
                }}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => showDoctorDetails(item)}>
                      <View style={styles.cardBody}>
                        <Image
                          source={require('../../assets/doc.png')}
                          style={{
                            width: AVATAR_SIZE,
                            height: AVATAR_SIZE,
                            borderRadius: AVATAR_SIZE,
                            marginRight: SPACING / 2,
                          }}
                        />
                        <View>
                          {/* <Text style={{fontSize: 20, fontWeight: '700'}}>
                        {item.name}
                      </Text> */}
                          <Text
                            style={{
                              fontSize: 18,
                              opacity: 0.7,
                              paddingTop: 15,
                            }}>
                            DR. {item.firstName} {item.lastName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 15,
                              opacity: 1.8,
                              color: '#0099cc',
                            }}>
                            {channeled.some((data) => data === item._id)
                              ? 'Chat Now'
                              : 'Channel Now'}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
          <View>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textTitleChoose: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
    marginRight: 100,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 3,
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 40,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
  },
  formContainer: {
    width: '90%',
    marginVertical: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#52524e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  submit: {
    width: '90%',
    height: 50,
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default Therapiests;
