import React, { Component } from 'react';
import {Text, View, Dimensions} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit';


const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      strokeWidth: 2, // optional
    },
  ],
};


export default class Relatorio extends Component {
  render() {

    return(
        <View>
        <LineChart
          data={line}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel={'$'}
          chartConfig={{
            backgroundColor: '#527FE2',
            backgroundGradientFrom: '#527FE2',
            backgroundGradientTo: '#527FE2',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 3,
          }}
        />
      </View>
    )
  }
}
