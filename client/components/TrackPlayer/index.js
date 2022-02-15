import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';

function TrackPlayer() {
  //   cons = useIsFocused();
  const [pause, setPause] = useState(true);
  return (
    <>
      <View>
        <TouchableOpacity>
          <View>
            <Icon
              name="music"
              size={22}
              color={'#0779e4'}
              onPress={() => setPause(!pause)}
            />
          </View>
        </TouchableOpacity>
        <Video
          source={{
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          }}
          playWhenInactive={true}
          playInBackground={true}
          audioOnly
          paused={pause}
        />
      </View>
    </>
  );
}

export default TrackPlayer;
