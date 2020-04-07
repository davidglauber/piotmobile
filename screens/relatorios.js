import React, { Component, useState } from 'react';
import {Text, View, Dimensions, StatusBar} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from './firebase/firebase';



const lineSemanal = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    {
      data: [20, 43, 101, 15, 22, 10, 95],
      strokeWidth: 3, // optional
    },
  ],
};

const lineMensal = {
  labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
  datasets: [
    {
      data: [40, 10, 105, 77],
      strokeWidth: 3, // optional
    },
  ],
};


//atualiza o type que dependendo vai renderizar um tipo de gráfico diferente 

export default class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 2,
      valores: [100,131,40, 3,6,1]
    };
  }

  async componentDidMount() {
    const valores = this.state.valores;
    let e = this;


    await firebase.auth().onAuthStateChanged(function(user) {
      if ( user == null ) { 
        e.props.navigation.navigate('Login')
      }

      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/medidor`)
        firebaseGET.on('value', (snap) => {
          console.log('valor da lista : ' + snap.val())
          var med = [];
              snap.forEach((child) => {
                
                  med.push({
                    valor: child.val().valor
                  });

              });
              
              e.setState({
                valores: med
              });
        });

    })

  }


  render_graphic() {
    const type = this.state.type;
    
    const lineDiaria = {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [
        {
          data: [100,131,40, 3,6,1],
          strokeWidth: 3, // optional
        },
      ],
    };


    console.log("type: " + type);

    if( type == 1 ) {
      //relatório semanal

      return (
        <LineChart
            data={lineSemanal}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'R$'}
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
      );
    } 
    
    if ( type == 0 ) {
      //relatório mensal

      return(
        <LineChart
            data={lineMensal}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'R$'}
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
      );
    }

    if( type == 2 ) {
      //relatório diário

      return(
        <LineChart
            data={lineDiaria}
            width={Dimensions.get('window').width} // from react-native
            height={220}
            yAxisLabel={'R$'}
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
      );
    }

}


  render() {
    return(
        <View>

          <StatusBar backgroundColor="#527FE2" barStyle="dark-content" />
        {/*Mostra o grafico de acordo com o type*/}
        {this.render_graphic()}

        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>

            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
              <TouchableOpacity onPress={() => this.setState({type: 2})} style={{width:70, height:40, marginTop:15, marginRight:10 ,backgroundColor: '#527FE2', borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11 , padding:3}}> 
                <Text style={{fontWeight:'bold', color: '#fff', marginLeft:13, marginTop:5}}>Diário</Text>
              </TouchableOpacity>
            </View>
          
            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
              <TouchableOpacity onPress={() => this.setState({type: 1})} style={{width:80, height:40, marginTop:15, backgroundColor: '#527FE2', borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11 , padding:3}}> 
                <Text style={{fontWeight:'bold', color: '#fff', marginLeft:10, marginTop:5}}>Semanal</Text>
              </TouchableOpacity>
            </View>


            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center', flexDirection:'row'}}>
              <TouchableOpacity onPress={() => this.setState({type: 0})} style={{width:80, height:40, backgroundColor: '#527FE2', marginTop:15, marginLeft:10, marginRight: 20, borderRadius:10, shadowColor: "#000", shadowOffset: {width: 0,height: 5,},shadowOpacity: 0.36,shadowRadius: 6.68, elevation: 11 , padding:3}}> 
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
