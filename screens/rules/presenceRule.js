import React, { Component } from 'react';
import {ScrollView, Image, StyleSheet,Clipboard , Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

export default class presenceRule extends Component {

  constructor() {
    super(); 
    this.state = {
      isVisible: false,
    }
  }

  openModal() {
    const isVisible = this.state.isVisible;

    this.setState({isVisible: true})
  }

  render() {
    return (
        <View style={{flex:1}}>
            <View style={{flex:0.5, backgroundColor:'#527fe2', justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../presenca.png')} style={{width:155, height:155}}/>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize:25}}>Sensor de Presença</Text>
                <Text style={{color: '#fff', marginLeft: 20, marginRight:10, marginTop: 20, fontStyle:'italic'}}>Crie regras como: ligue a luz quando perceber movimento, desative o ar condicionado quando alguem entrar</Text>
            </View>

            <TouchableOpacity onPress={() => this.openModal()} style={{backgroundColor:'#527fe2', marginRight:20, marginLeft:20, borderRadius:15, marginTop:20, padding:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Acender Lâmpada</Text>
            </TouchableOpacity>




          {/*MODAL*/}

          <Modal
                transparent={true}
                animationType="slide"
                visible={this.state.isVisible}
            >
              <View style={{flex: 1, flexDirection:'row', marginTop: height / 2, backgroundColor: '#fff', shadowColor: "black",shadowOffset: {width: 0,height: 4},shadowOpacity: 0.32,shadowRadius: 20,elevation: 9, borderRadius: 20}}>
                  <TouchableOpacity style={{marginLeft: 10, marginTop:10}} onPress={() => this.setState({isVisible: false})}>
                     <Ionicons color="#527fe2" name="ios-close-circle-outline" size={34}/>
                  </TouchableOpacity>
                  
                  <View style={{flexDirection:'column', alignContent:'center', alignItems:'center'}}>
                      <Text>ID do Sensor</Text>
                      <TextInput style={{marginTop:50, borderWidth:2, borderColor: 'gray', borderRadius:10, padding:10}} placeholder="Digite o ID Sensor de Presença"></TextInput>
                  </View> 

              </View>
            </Modal>
        </View>
    );
  }
}
