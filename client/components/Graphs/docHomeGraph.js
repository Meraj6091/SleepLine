import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Close from 'react-native-vector-icons/Fontisto';
const DocHomeGraphs = ({close = false, setShowGraph}) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
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
          }}>
          <Close
            name="close"
            color="#b92b27"
            size={22}
            onPress={() => setShowGraph(false)}
          />
        </View>
      )}
      <LineChart
        data={{
          labels: ['2000', '2005', '2010', '2015', '2020', '2022'],
          datasets: [
            {
              data: [10, 20, 22, 53, 50, 55],
            },
          ],
        }}
        width={330} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix="k"
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
    </View>
  );
};

export default DocHomeGraphs;
