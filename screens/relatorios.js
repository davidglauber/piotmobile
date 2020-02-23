import React, { Component } from 'react';
import {Text, View, Dimensions} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';


const line = {
  labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
  datasets: [
    {
      data: [20, 43, 101, 15, 22, 10],
      strokeWidth: 3, // optional
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
        />

        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
              <TouchableOpacity style={{width:80, height:40, marginTop:15, backgroundColor: '#527FE2', borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11 , padding:3}}> 
                <Text style={{fontWeight:'bold', color: '#fff', marginLeft:10, marginTop:5}}>Semanal</Text>
              </TouchableOpacity>
            </View>


            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
              <TouchableOpacity style={{width:80, height:40, backgroundColor: '#527FE2', marginTop:15, marginLeft:10, marginRight: 20, borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11 , padding:3}}> 
                <Text style={{fontWeight:'bold', color: '#fff', marginLeft:13, marginTop:5}}>Mensal</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity style={{marginTop:18, marginLeft:10, marginRight:10, backgroundColor: '#527FE2', padding:10, borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11}}>
                <Ionicons name="md-code-download" color="#fff" size={40}/>
            </TouchableOpacity>  
        </View>
      </View>
    )
  }
}
