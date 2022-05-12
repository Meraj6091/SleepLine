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
const Therepies = ({route, navigation}) => {
  const {params} = route;

  const [isPressed, setIsPressed] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [level, setLevel] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [validate, setValidate] = React.useState({});

  useEffect(() => {
    console.log(validate);
  }, [validate]);

  const data = [
    {
      name: 'Check Insomnia Level ',
      vehical: 'Press Here',
      msg: 'Predict Your insomnia Level',
      img: require('../../assets/exercise-icon.png'),
    },
  ];
  const handleChange = (id, value) => {
    setSelectedValue({
      ...selectedValue,
      [id]: value,
    });
  };

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
                          color:
                            params.rule === 'rule_1'
                              ? '#FAD02C'
                              : level === 'Chronic (Level 3)'
                              ? '#fc2222'
                              : level === 'Transient (Level 2)'
                              ? '#ff5e00'
                              : '#00bfff',
                        }}>
                        {params.rule === 'rule_1' && 'Accute'}
                      </Text>
                      <Text style={{fontSize: 17, opacity: 0.7}}>
                        {params.rule === 'rule_1' && 'Men 20-30'}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          opacity: 0.8,
                          color: '#0099cc',
                        }}>
                        Do It Now !
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {params.rule === 'rule_1' ? (
          <View style={styles.selectontainer}>
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                1. Make sure hygiene is maintained and the room is cleaned every
                day.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining a healthy sleeping hygiene helps improving yourself
                both mentally and physically. Having an environment that is
                clean helps you fall asleep easily with comfort.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                2. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Walk 7000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>

              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
              </Text>
            </View>
          </View>
        ) : (
          <View></View>
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

export default Therepies;
