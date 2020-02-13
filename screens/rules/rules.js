import React from 'react';

import {ScrollView, Image, StyleSheet,Clipboard , Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

//firebase
import firebase from '../firebase/firebase';


const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

class Rules extends React.Component {
    render() {
        
            return(
                <ScrollView>
                        <View style={{backgroundColor: '#527fe2', flex:1, flexDirection: 'row', marginLeft:10, marginRight:10, marginTop:30, borderRadius:20}}>
                            <View style={{width: 100, padding: 20}}>
                                <Image source={require('../lamp.png')} style={{width:55, height:80}} />
                            </View>

                            <View>
                                <TouchableOpacity onPress={() => alert('foi!')} style={{width: 50, backgroundColor: 'white', borderRadius:40, padding: 5, marginTop:20, marginLeft: 170}}>
                                    <Ionicons name="ios-add-circle" size={24} color="#527fe2"/>
                                </TouchableOpacity>
                                
                                <View style={{marginTop:30, marginLeft:80}}>
                                    <Text style={{fontWeight: 'bold', color:'white'}}>Criar Regra (Lâmpada)</Text>
                                </View>
                            </View>
                        </View>
                </ScrollView>
            );
    }
}



export default Rules;