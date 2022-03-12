import React, {useState, useEffect} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  SectionList,
  FlatList,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {useSelector} from 'react-redux';
import {getAllSleepInfo, saveSleepTime} from './service';
import {Snackbar} from 'react-native-paper';
import AvgSleptTime from '../../Graphs/avgSleptTime';

const SleepTracker = () => {
  const Userstate = useSelector((state) => state.userData);
  let todayDate = new Date();

  const [state, setState] = useState({
    timerStart: false,
    stopwatchStart: false,
    totalDuration: 90000,
    timerReset: false,
    stopwatchReset: false,
  });
  const [showTimer, setShowTimer] = useState(false);
  const [save, setSave] = useState({trigger: false});
  const [sleepRecords, setSleepRecords] = useState([]);
  const [filteredData, setFilteredData] = useState({
    docs: [],
  });
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [splitText, setSplitText] = useState([]);

  useEffect(() => {
    if (Userstate) getAllUserSleepRecords();
  }, [refresh]);

  useEffect(() => {
    if (save.trigger) {
      saveUserSleepTime();
    }
  }, [save]);
  useEffect(() => {
    if (showGraph) {
      const data = getEachTotalSleepTime(sleepRecords, true);
      if (data) {
        setSplitText(data.split(':'));
      }
    }
    return () => setSplitText([]);
  }, [showGraph]);

  useEffect(() => {
    if (!filteredData.docs.some((data) => data.isInitial)) {
      filteredData.docs.push({
        date: 'Track Now',
        month: todayDate.getMonth() + 1,
        isInitial: true,
      });
    }
  }, [filteredData]);

  useEffect(() => {
    if (sleepRecords.length > 0) {
      getEachTotalSleepTime(sleepRecords);
    }
  }, [sleepRecords]);
  const getEachTotalSleepTime = (arr, graph) => {
    if (arr && !graph) {
      let result = [];

      arr.forEach(function (a) {
        if (!this[a.date]) {
          this[a.date] = {date: a.date, sleepTime: 0};
          result.push(this[a.date]);
        }

        this[a.date].sleepTime += hoursStringToDecimal(a.sleepTime);
      }, Object.create(null));

      setFilteredData({
        ...filteredData,
        docs: result.map((row) => ({
          ...row,
          sleepTime: decimalHoursToString(row.sleepTime),
        })),
      });
    }
    if (graph) {
      let sumHoras = 0;
      for (let i = 0; i < arr.length; i++) {
        sumHoras += hoursStringToDecimal(arr[i].sleepTime);
      }
      return decimalHoursToString(sumHoras);
    }
  };

  function hoursStringToDecimal(hoursString) {
    const [hoursPart, minutesPart] = hoursString.split(':');
    return Number(hoursPart) + Number(minutesPart) / 60;
  }
  function decimalHoursToString(hoursDecimal) {
    const numHours = Math.floor(hoursDecimal);
    const numMinutes = Math.round((hoursDecimal - numHours) * 60);
    return `${numHours < 10 ? '0' : ''}${numHours}:${
      numMinutes < 10 ? '0' : ''
    }${numMinutes}`;
  }

  // const toggleTimer = () => {
  //   setState({timerStart: !state.timerStart, timerReset: false});
  // };

  // const resetTimer = () => {
  //   setState({timerStart: false, timerReset: true});
  // };

  const toggleStopwatch = () => {
    setState({
      stopwatchStart: !state.stopwatchStart,
      stopwatchReset: false,
    });
  };

  const resetStopwatch = () => {
    setState({stopwatchStart: false, stopwatchReset: true});
  };

  const getFormattedTime = (time) => {
    if (save.trigger) {
      save.sleepTime = time;
    }
  };
  const handleSave = () => {
    setSave({trigger: true});
    setState({
      stopwatchStart: false,
      stopwatchReset: false,
    });
  };
  const saveUserSleepTime = async () => {
    if (save.trigger) {
      let postData = save;
      postData.userId = Userstate._id;
      postData.date = todayDate.getDate();
      const {data} = await saveSleepTime(postData);
      if (data) {
        setVisible(!visible);
        setRefresh(!refresh);
      }
    }
  };

  const getAllUserSleepRecords = async () => {
    try {
      const {data} = await getAllSleepInfo({userId: Userstate._id});
      setSleepRecords(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleShowTimer = (item) => {
    if (item.isInitial) setShowTimer(true);
    else {
      setSplitText(item.sleepTime.split(':'));

      // setFilteredData({
      //   ...filteredData,
      //   totalTime: item.sleepTime,
      // });
      setShowTimer(false);
    }
  };
  const options = {
    container: {
      backgroundColor: '#0099cc',
      padding: 10,
      borderRadius: 15,
      width: 200,
    },
    text: {
      fontSize: 30,
      color: '#FFF',
      textAlign: 'center',
    },
  };

  const ListItem = ({item}) => {
    return (
      <View>
        <View
          style={{
            borderRadius: 100,
            borderWidth: 1,
            borderColor: item.date === 'Track Now' ? '#F08080' : '#0099cc',
            width: 100,
            height: 100,
            margin: 5,
            backgroundColor: item.date === 'Track Now' ? '#FAF0E6' : '#F5FFFA',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 40,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontStyle: 'italic',
                fontWeight: item.date === 'Track Now' ? 'bold' : '',
              }}>
              {item.date}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const data = [
    {
      name: 'Average Slept Time',
      vehical: 'Now',
      msg: 'Check Your Weekly Report',
      img: require('../../../assets/track.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData.docs}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleShowTimer(item)}>
            <ListItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      {showTimer ? (
        <>
          <View style={styles.containerSnapBar}>
            <Snackbar
              style={{
                backgroundColor: '#999999',
                width: 80,
              }}
              visible={visible}
              duration={500}
              onDismiss={() => setVisible(false)}>
              <Text style={{textAlign: 'center'}}>Saved !</Text>
            </Snackbar>
          </View>
          <Stopwatch
            laps
            msecs
            start={state.stopwatchStart}
            reset={state.stopwatchReset}
            options={options}
            getTime={getFormattedTime}
          />
          <View style={{flexDirection: 'row', margin: 10}}>
            <TouchableHighlight onPress={toggleStopwatch}>
              <Text style={{fontSize: 25, color: '#8a9c8f'}}>
                {!state.stopwatchStart ? 'Start' : 'Stop'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={resetStopwatch}>
              <Text style={{fontSize: 25, marginLeft: 25, color: '#8a9c8f'}}>
                Reset
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{margin: 10, bottom: 10}}>
            <TouchableHighlight onPress={handleSave}>
              <Text style={{fontSize: 25, color: '#8a9c8f'}}>Save</Text>
            </TouchableHighlight>
          </View>
        </>
      ) : showGraph === false ? (
        <>
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: '800', color: '#8a9c8f'}}>
              {splitText[0]} HOURS
            </Text>
            <Text style={{fontSize: 25, color: '#c0c0c0', fontWeight: '800'}}>
              {splitText[1]} MINS
            </Text>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item) => item.key}
            contentContainerStyle={{
              marginTop: 50,
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setShowGraph(true)}>
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
                      <Text style={{fontSize: 20, fontWeight: '700'}}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 18, opacity: 0.7}}>
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
        </>
      ) : (
        <View>
          <AvgSleptTime
            close={true}
            setShowGraph={setShowGraph}
            data={filteredData.docs}
          />
          <View
            style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontWeight: '800', color: '#8a9c8f'}}>
              {splitText[0]} HOURS
            </Text>
            <Text style={{fontSize: 25, color: '#c0c0c0', fontWeight: '800'}}>
              {splitText[1]} MINS
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSnapBar: {
    bottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 140,
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
    marginBottom: 10,
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
    height: 200,
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
  itemPhoto: {
    width: 200,
    height: 250,
  },
  submitText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default SleepTracker;
