import React, { Component } from 'react';
import {ScrollView, Image, StyleSheet,Clipboard , Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';

export default class presenceRule extends Component {
  render() {
    return (
        <View style={{flex:1}}>
            <View style={{flex:0.5, backgroundColor:'#527fe2', justifyContent:'center', alignItems:'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                <Image source={require('../presenca.png')} style={{width:155, height:155}}/>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize:25}}>Sensor de Presença</Text>
                <Text style={{color: '#fff', marginLeft: 20, marginRight:10, marginTop: 20, fontStyle:'italic'}}>Crie regras como: ligue a luz quando perceber movimento, desative o ar condicionado quando alguem entrar</Text>
            </View>

            <TouchableOpacity style={{backgroundColor:'#527fe2', marginRight:20, marginLeft:20, borderRadius:15, marginTop:20, padding:10}}>
                <Text style={{color:'#fff', fontWeight: 'bold'}}>Acender Lâmpada</Text>
            </TouchableOpacity>
        </View>
    );
  }
}
