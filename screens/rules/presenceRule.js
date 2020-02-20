import React, { Component } from 'react';
import {Picker, Image, Text, View, Button, Modal, Dimensions, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../firebase/firebase';

/*Pega a dimensão da tela*/
const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

export default class presenceRule extends Component {

  constructor() {
    super(); 
    this.state = {
      isVisible: false,
      presenceList: [],
      presenceID:''
    }
  }

  /*Acessa o banco de dados*/
  async componentDidMount() {
    let e = this;

      await firebase.auth().onAuthStateChanged(function(user) {
      
        let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/presenca`)
        
        firebaseGET.on('value', (snap) => {

        var pres = [];
        snap.forEach((child) => {
          
            pres.push({
              location: child.val().location,
              movimento: child.val().movimento,
              id: child.val().id
            });

        });
        
        e.setState({
            presenceList: pres
        });
       });

      })

  } 

  /*Abre o modal*/
  openModal() {
    this.setState({isVisible: true})
  }

  /*Muda o id do sensor selecionado*/
  onValueChangeIDPresence = (c) => {
    this.setState({presenceID: c})
    console.log('presence ID: ' + c)
  }

  render() {
    return (
        <View style={{flex:1}}>
            <View style={{flex:0.5, backgroundColor:'#527fe2', justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../assets/imgs/presenca.png')} style={{width:155, height:155}}/>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize:25}}>Sensor de Presença</Text>
                <Text style={{color: '#fff', marginLeft: 20, marginRight:10, marginTop: 20, fontStyle:'italic'}}>Crie regras como: ligue a luz quando perceber movimento, desative o ar condicionado quando alguem entrar</Text>
            </View>

            <TouchableOpacity onPress={() => this.openModal()} style={{backgroundColor:'#527fe2', marginRight:20, marginLeft:20, borderRadius:5, marginTop:20, padding:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Acender Lâmpada</Text>
            </TouchableOpacity>




          {/*MODAL*/}

          <Modal
                transparent={true}
                animationType="slide"
                visible={this.state.isVisible}
            >
              <View style={{flex: 1, flexDirection:'column', marginTop: height / 2, backgroundColor: '#fff', shadowColor: "black",shadowOffset: {width: 0,height: 4},shadowOpacity: 0.32,shadowRadius: 20,elevation: 9, borderRadius: 20}}>
                  <TouchableOpacity style={{marginLeft: 10, marginTop:10}} onPress={() => this.setState({isVisible: false})}>
                     <Ionicons color="#527fe2" name="ios-close-circle" size={34}/>
                  </TouchableOpacity>
                  
                  <View style={{flexDirection:'row', marginTop:30}}>
                      <Text style={{color: '#527fe2', fontWeight: 'bold', marginLeft: 30}}>ID (Presença)</Text>
                      
                      <Picker
                          selectedValue={this.state.selecionados}
                          style={{height: 50, width: width / 2, marginLeft:10, marginTop:30,  textDecorationLine: 'underline'}}
                          itemStyle={{color: 'blue', fontWeight:'bold'}}
                          mode='dropdown'
                          onValueChange={value => this.onValueChangeIDPresence(value)}>

                          {this.state.presenceList.map(l => (
                            <Picker.Item label={l.id} value={l.id} key={l.id} />
                          ))}
                      </Picker>
                      
                  </View>

                  <View style={{flexDirection:'row', marginTop:70}}>
                      <Text style={{color: '#527fe2', fontWeight: 'bold', marginLeft: 30}}>ID (Lâmpada)</Text>
                      <Picker
                          selectedValue={this.state.language}
                          style={{height: 50, width: width / 2, marginLeft:10, textDecorationLine: 'underline'}}
                          itemStyle={{color: 'blue', fontWeight:'bold'}}
                          mode='dropdown'
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                          }>
                          <Picker.Item label="JavaScript" value="js" />
                          <Picker.Item label="React" value="js" />
                      </Picker>
                  </View>
                      
              </View>
            </Modal>
        </View>
    );
  }
}
