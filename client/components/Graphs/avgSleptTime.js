import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Close from 'react-native-vector-icons/Fontisto';
const AvgSleptTime = ({close = false, setShowGraph, data}) => {
  const [filterdData, setFilterdData] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setFilterdData(
      ...filterdData,
      data
        .filter((data) => data.date !== 'Track Now')
        .map((row) => ({
          ...row,
          sleepTime: row.sleepTime?.replace(':', '.'), //replace the ':' to '.'
        })),
    );
  }, [data]);

  useEffect(() => {
    if (filterdData.find((data) => data.date !== '0')) {
      filterdData.unshift({date: '0', sleepTime: '0'}); //push to first index
      setShow(true);
    }
  }, [filterdData]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{opacity: 0.8, fontSize: 13, fontWeight: '600'}}>
          {close
            ? 'Weekly Average Slept Time'
            : 'Confirmed Insomnia Cases (Yearly)'}
        </Text>
        {close && (
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: 10,
              paddingLeft: 40,
            }}>
            <Close
              name="close"
              color="#b92b27"
              size={22}
              onPress={() => setShowGraph(false)}
            />
          </View>
        )}
      </View>
      {filterdData.length > 0 && show && (
        <LineChart
          data={{
            //
            labels: filterdData.map((data) => data.date),
            datasets: [
              {
                //
                data: filterdData.map((data) => data.sleepTime),
              },
            ],
          }}
          width={330} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#40E0D0',
            backgroundGradientFrom: '#40E0D0',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 15,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
};

export default AvgSleptTime;
