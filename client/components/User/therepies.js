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
                            params.rule === 'rule_1' ||
                            params.rule === 'rule_2' ||
                            params.rule === 'rule_3' ||
                            params.rule === 'rule_4' ||
                            params.rule === 'rule_5' ||
                            params.rule === 'rule_6'
                              ? '#FAD02C'
                              : params.rule === 'rule_13' ||
                                params.rule === 'rule_14' ||
                                params.rule === 'rule_15' ||
                                params.rule === 'rule_16' ||
                                params.rule === 'rule_17' ||
                                params.rule === 'rule_18'
                              ? '#fc2222'
                              : params.rule === 'rule_7' ||
                                params.rule === 'rule_8' ||
                                params.rule === 'rule_9' ||
                                params.rule === 'rule_10' ||
                                params.rule === 'rule_11' ||
                                params.rule === 'rule_12'
                              ? '#ff5e00'
                              : '#00bfff',
                        }}>
                        {params.rule === 'rule_1' ||
                        params.rule === 'rule_2' ||
                        params.rule === 'rule_3' ||
                        params.rule === 'rule_4' ||
                        params.rule === 'rule_5' ||
                        params.rule === 'rule_6'
                          ? 'Accute'
                          : params.rule === 'rule_7' ||
                            params.rule === 'rule_8' ||
                            params.rule === 'rule_9' ||
                            params.rule === 'rule_10' ||
                            params.rule === 'rule_11' ||
                            params.rule === 'rule_12'
                          ? 'Transient'
                          : params.rule === 'rule_13' ||
                            params.rule === 'rule_14' ||
                            params.rule === 'rule_15' ||
                            params.rule === 'rule_16' ||
                            params.rule === 'rule_17' ||
                            params.rule === 'rule_18'
                          ? 'Chronic'
                          : ''}
                      </Text>
                      <Text style={{fontSize: 17, opacity: 0.7}}>
                        {params.rule === 'rule_1' ||
                        params.rule === 'rule_7' ||
                        params.rule === 'rule_13'
                          ? 'Men 20-30'
                          : params.rule === 'rule_2' ||
                            params.rule === 'rule_8' ||
                            params.rule === 'rule_14'
                          ? 'Female 20-30'
                          : params.rule === 'rule_3' ||
                            params.rule === 'rule_9' ||
                            params.rule === 'rule_15'
                          ? 'Men 30-40'
                          : params.rule === 'rule_4' ||
                            params.rule === 'rule_10' ||
                            params.rule === 'rule_16'
                          ? 'Woman 30-40'
                          : params.rule === 'rule_5' ||
                            params.rule === 'rule_11' ||
                            params.rule === 'rule_17'
                          ? 'Men 40 and above'
                          : params.rule === 'rule_6' ||
                            params.rule === 'rule_12' ||
                            params.rule === 'rule_18'
                          ? 'Women 40 and above '
                          : ''}
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
        ) : params.rule === 'rule_2' ? (
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
                3. Walk 5000 steps after dinner.
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
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_3' ? (
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
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Walk 5000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_4' ? (
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
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_5' ? (
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
                2. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_6' ? (
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
                2. Walk 3000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_7' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Walk 7000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_8' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Walk 5000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_9' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Walk 5000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_10' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_11' ? (
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
                2. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_12' ? (
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
                2. Walk 3000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_13' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 7000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Hit workout
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}2 Sets {'\n'} {'\n'}10*3 Push ups {'\n'}30 mountain
                climbers {'\n'}15*3 squats with 5kg weight {'\n'} Forward Lunges
                – each leg 10*3 {'\n'}30 leg raises 50 {'\n'}
                Russian twists. {'\n'}1-minute plank
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_14' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 7000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Simple workout with yoga.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}Simple yoga {'\n'} {'\n'}Stretching {'\n'}15-minute
                jogging {'\n'}Jumping jacks {'\n'}Knee push-ups 8*3 {'\n'}Squats
                without weight {'\n'}
                Leg raises 20 {'\n'}Hands in and out breathing {'\n'}30 seconds
                plank
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_15' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 5000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Hit workout
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}2 Sets {'\n'} {'\n'}Stretching {'\n'}10 minutes jogging
                {'\n'}8*3 Push ups {'\n'}20 mountain climbers {'\n'}10*3 squats
                with 5kg weight {'\n'}
                Forward Lunges – each leg 8*2 {'\n'}30 leg raises {'\n'}30
                Russian twists. {'\n'}30 seconds plank
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_16' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Hit workout
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}Simple yoga{'\n'} {'\n'}Stretching {'\n'}10 minutes
                jogging
                {'\n'}Jumping jacks {'\n'}Knee push-ups 5*3{'\n'}Squats without
                weight {'\n'}
                Leg raises 15 {'\n'}Hands in and out breathing {'\n'}30 seconds
                plank
                {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_17' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 4000 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Hit workout
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}2 Sets {'\n'} {'\n'}5*3 Push ups {'\n'}15 mountain
                climbers
                {'\n'}8*3 squats with 5kg weight{'\n'}Forward Lunges – each leg
                8*2{'\n'}25 leg raises {'\n'}
                25 Russian twists. {'\n'}30 seconds plank {'\n'}
              </Text>
            </View>
          </View>
        ) : params.rule === 'rule_18' ? (
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
                2. Maintain lower room temperature
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Maintaining lower room temperature helps fall asleep.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                3. Set time out for electronic devices
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}
                Setting time outs for electronic devices such as mobile phones,
                tabs and laptops. The excessive use of these devices are the
                main causes of insomnia
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                4. 4-7-8 breathing technique –
              </Text>

              <Text style={{fontSize: 17}}>
                {'\n'}• First, let your lips part. Make a whooshing sound,
                {'\n'}• Next, press your lips together as you silently inhale
                through the nose for a count of 4 seconds. {'\n'}• Afterwards,
                Hold your breath for a count of 7. {'\n'}• Next, Exhale again
                for a full 8 seconds, making a whooshing sound throughout.
                {'\n'}• Repeat the above steps 2 times again.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                5. Reduce intake of coffee or drinks that contain caffeine after
                5 p.m.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                High intake of caffeine keeps the brain more active which
                doesn’t tire the brain. This effect a lot in sleep. Not having
                coffee after 5 pm will result in making the brain tired by the
                normal sleep time of a person.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                6. Walk 2500 steps after dinner.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Walking after dinner helps with easy digestion and also tires
                the brain which will help to fall asleep easily.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                7. Listen to relaxing music.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}
                Listen to music that helps to fall asleep. The app has some
                suggested music that can be listened.
                {'\n'}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                8. Simple workout with yoga.
              </Text>
              <Text style={{fontSize: 17}}>
                {'\n'}Simple yoga {'\n'} {'\n'}Stretching {'\n'}10 minutes fast
                walking
                {'\n'}Squats without weight {'\n'}Leg raises 10{'\n'}Hands in
                and out breathing {'\n'}
                30 seconds plank {'\n'}
              </Text>
            </View>
          </View>
        ) : null}
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
