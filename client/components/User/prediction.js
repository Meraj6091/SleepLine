import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Picker,
  ActivityIndicator,
} from 'react-native';
import MyHeader from '../Navigation/myHeader';
import {
  RadioButton,
  Text,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from 'react-native-paper';
import {getPrediction, saveInsomniaLevelInToProfile} from './service';
import {useSelector} from 'react-redux';
const Prediction = ({route, navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [level, setLevel] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [validate, setValidate] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const state = useSelector((state) => state.userData);
  //const showDialog = () => setVisible(true);

  //const hideDialog = () => setVisible(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsPressed(false);
      setSelectedValue({});
      setLevel(null);
      setValidate({});
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (level !== null) {
      saveInsomniaLevel(level);
    }
  }, [level]);

  const data = [
    {
      name: 'Check Insomnia Level ',
      vehical: 'Press Here',
      msg: 'Predict Your insomnia Level',
      img: require('../../assets/insomnia.jpg'),
    },
  ];
  const handleChange = (id, value) => {
    setSelectedValue({
      ...selectedValue,
      [id]: value,
    });
  };
  const saveInsomniaLevel = async (data) => {
    try {
      let postData = {};
      postData.level = data;
      postData.id = state._id;
      await saveInsomniaLevelInToProfile(postData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    if (
      selectedValue.gender &&
      selectedValue.age &&
      selectedValue.acute1 &&
      selectedValue.acute2 &&
      selectedValue.acute3 &&
      selectedValue.acute4 &&
      selectedValue.transient1 &&
      selectedValue.transient2 &&
      selectedValue.chronic1 &&
      selectedValue.chronic2 &&
      selectedValue.chronic3 &&
      selectedValue.chronic4
    ) {
      if (
        selectedValue.acute1 === 'true' ||
        selectedValue.acute2 === 'true' ||
        selectedValue.acute3 === 'true' ||
        selectedValue.acute4 === 'true'
      ) {
        setValidate({
          ...validate,
          acute: true,
        });
      }
      if (
        selectedValue.transient1 === 'true' ||
        selectedValue.transient2 === 'true'
      ) {
        setValidate({
          ...validate,
          transient: true,
        });
      }
      if (
        selectedValue.chronic1 === 'true' ||
        selectedValue.chronic2 === 'true' ||
        selectedValue.chronic3 === 'true' ||
        selectedValue.chronic4 === 'true'
      ) {
        setValidate({
          ...validate,
          chronic: true,
        });
      }
      if (
        selectedValue.acute1 === 'second' &&
        selectedValue.acute2 === 'second' &&
        selectedValue.acute3 === 'second' &&
        selectedValue.acute4 === 'second' &&
        selectedValue.transient1 === 'second' &&
        selectedValue.transient2 === 'second' &&
        selectedValue.chronic1 === 'second' &&
        selectedValue.chronic2 === 'second' &&
        selectedValue.chronic3 === 'second' &&
        selectedValue.chronic4 === 'second'
      ) {
        setValidate({
          ...validate,
          none: true,
        });
      }
      if (
        validate.chronic ||
        validate.transient ||
        validate.acute ||
        validate.none
      ) {
        if (
          validate?.acute === true &&
          !validate?.transient &&
          !validate?.chronic
        ) {
          setLevel('Acute (Level 1)');
        } else if (
          !validate?.acute &&
          validate?.transient === true &&
          !validate?.chronic
        ) {
          setLevel('Transient (Level 2)');
        } else if (
          !validate?.acute &&
          !validate?.transient &&
          validate?.chronic === true
        ) {
          setLevel('Chronic (Level 3)');
        } else if (
          validate?.acute === true &&
          validate?.transient === true &&
          !validate?.chronic
        ) {
          setLevel('Transient (Level 2)');
        } else if (
          !validate?.acute &&
          validate?.transient === true &&
          validate?.chronic === true
        ) {
          setLevel('Chronic (Level 3)');
        } else if (
          validate?.acute === true &&
          !validate?.transient &&
          validate?.chronic === true
        ) {
          setLevel('Chronic (Level 3)');
        } else {
          setLevel('None');
        }
        setVisible(true);
      }
    }
  };

  const handleRuleBase = async () => {
    try {
      setLoading(true);
      let postData = {};
      postData.age = selectedValue.age;
      postData.gender = selectedValue.gender;
      postData.level = level;

      const {data} = await getPrediction(postData);
      if (data && data.suggestions) {
        setLoading(false);
        setVisible(false);
        navigation.navigate('Therepies', {
          rule: data.suggestions,
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleDismiss = () => {
    setVisible(false);
    setValidate({});
    setSelectedValue({});
  };

  // const handleCheckChange = (id, value) => {
  //   setLevel({
  //     ...selectedValue,
  //     [id]: value,
  //   });

  //   if (
  //     (id === 'acute1' && value === 'true') ||
  //     (id === 'acute2' && value === 'true') ||
  //     (id === 'acute3' && value === 'true') ||
  //     (id === 'acute4' && value === 'true')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       acute: true,
  //     });
  //   }
  //   if (
  //     (id === 'acute1' && value === 'second') ||
  //     (id === 'acute2' && value === 'second') ||
  //     (id === 'acute3' && value === 'second') ||
  //     (id === 'acute4' && value === 'second')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       acute: false,
  //     });
  //   }
  //   if (
  //     (id === 'transient1' && value === 'true') ||
  //     (id === 'transient2' && value === 'true')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       transient: true,
  //     });
  //   }
  //   if (
  //     (id === 'transient1' && value === 'second') ||
  //     (id === 'transient2' && value === 'second')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       transient: false,
  //     });
  //   }
  //   if (
  //     (id === 'chronic1' && value === 'true') ||
  //     (id === 'chronic2' && value === 'true') ||
  //     (id === 'chronic3' && value === 'true') ||
  //     (id === 'chronic4' && value === 'true')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       chronic: true,
  //     });
  //   }
  //   if (
  //     (id === 'chronic1' && value === 'second') ||
  //     (id === 'chronic2' && value === 'second') ||
  //     (id === 'chronic3' && value === 'second') ||
  //     (id === 'chronic4' && value === 'second')
  //   ) {
  //     setSelectedValue({
  //       ...selectedValue,
  //       chronic: false,
  //     });
  //   }
  // };
  return (
    <ScrollView style={{backgroundColor: isPressed ? 'white' : 'white'}}>
      <View style={styles.container}>
        <MyHeader
          onPressMenu={() => navigation.goBack()}
          title={route.name}
          right="more-vertical"
          onRightPress={() => console.log('right')}
          user={true}
        />
        {isPressed === false ? (
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              contentContainerStyle={{
                padding: 20,
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => setIsPressed(true)}>
                    <View style={styles.cardBody}>
                      <Image
                        source={item.img}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 70,
                          marginRight: 20 / 2,
                        }}
                      />
                      <View>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '700',
                            color: '#eb6161',
                          }}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 17, opacity: 0.7}}>
                          {item.msg}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            opacity: 0.8,
                            color: '#0099cc',
                          }}>
                          {item.vehical}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : (
          <View style={styles.selectontainer}>
            <Picker
              selectedValue={selectedValue.gender}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                itemValue !== '' && handleChange('gender', itemValue)
              }>
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
            <Picker
              selectedValue={selectedValue.age}
              style={{height: 50, width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                itemValue !== '' && handleChange('age', itemValue)
              }>
              <Picker.Item label="Age Group" value="" />
              <Picker.Item label="20-30" value="20-30" />
              <Picker.Item label="30-40" value="30-40" />
              <Picker.Item label="40 and above" value="40 and above" />
            </Picker>
            <View style={{marginLeft: 10}}>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                1. Do you have Difficulty falling asleep?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.acute1 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute1', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.acute1 === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute1', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                2. Do You have Difficulty in staying asleep?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.acute2 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute2', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.acute2 === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute2', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                3. Do you face waking up throughout the night?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.acute3 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute3', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.acute3 === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute3', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                4. Do you wake up way too early?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.acute4 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute4', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.acute4 === 'second' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('acute4', 'second')}
                />
              </View>

              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                5. Do you have Fatigue or daytime sleepiness?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.transient1 === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('transient1', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.transient1 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('transient1', 'second')}
                />
              </View>

              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                6. Do you feel lack of motivation or energy?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.transient2 === 'true'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('transient2', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.transient2 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('transient2', 'second')}
                />
              </View>

              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                7. Do you face Poor attention or concentration?
              </Text>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.chronic1 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('chronic1', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.chronic1 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('chronic1', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                8. Do you have regular Tension, headache or anxiety attacks?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.chronic2 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('chronic2', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.chronic2 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('chronic2', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                9. Do you have high temper or increased aggressiveness?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.chronic3 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('chronic3', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.chronic3 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('chronic3', 'second')}
                />
              </View>
              <Text
                style={{fontSize: 18, fontStyle: 'italic', fontWeight: 'bold'}}>
                10. Do you face problems with remembering things?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>YES</Text>
                <RadioButton
                  value="true"
                  status={
                    selectedValue.chronic4 === 'true' ? 'checked' : 'unchecked'
                  }
                  onPress={() => handleChange('chronic4', 'true')}
                />
                <Text style={{marginTop: 8, color: 'rgb(128, 0, 0)'}}>NO</Text>
                <RadioButton
                  value="second"
                  status={
                    selectedValue.chronic4 === 'second'
                      ? 'checked'
                      : 'unchecked'
                  }
                  onPress={() => handleChange('chronic4', 'second')}
                />
              </View>
            </View>
            <View style={{padding: 30}}>
              <Button mode="contained" onPress={handleSubmit}>
                Submit
              </Button>
            </View>
            <Provider>
              <View>
                <Portal>
                  <Dialog visible={visible} onDismiss={handleDismiss}>
                    <Dialog.Title>Insomnia Level</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>
                        Your Insomnia Level Is{' '}
                        <Text
                          style={{
                            color:
                              level === 'Acute (Level 1)'
                                ? '#FAD02C'
                                : level === 'Chronic (Level 3)'
                                ? '#fc2222'
                                : level === 'Transient (Level 2)'
                                ? '#ff5e00'
                                : '#00bfff',
                            fontWeight: 'bold',
                          }}>
                          {level}
                        </Text>
                      </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      {level !== 'None' && loading === false ? (
                        <Button onPress={handleRuleBase}>
                          Predict Your Therepies
                        </Button>
                      ) : level !== 'None' && loading ? (
                        <ActivityIndicator size="small" color="#a132f0" />
                      ) : null}
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </View>
            </Provider>
          </View>
        )}
        <View>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
          <Text>{'\n'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  selectontainer: {
    flex: 1,
    paddingTop: 20,
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
    marginBottom: 20,
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

export default Prediction;
