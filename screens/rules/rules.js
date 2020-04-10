import React, {useState, useEffect} from 'react';
import {ScrollView, Image, Text, View, TouchableOpacity, StatusBar, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import firebase from "../firebase/firebase";

export default class Rules extends React.Component{
    constructor() {
        super();
        this.state = {
            image: null,
            input: ''
        }
    }

    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
 
    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            this.setState({image: result.uri});
          }
    
          console.log(result);
          console.log('imae do state: ' + this.state.image)
        } catch (E) {
          console.log(E);
        }
    };



    onTextChange = (e) => {
        this.setState({input: e}) 
    } 


    uploadImageToFirebase(imageURL) {

        var getFileBlob = function (url, cb) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.responseType = "blob";
            xhr.addEventListener('load', function() {
              cb(xhr.response);
            });
            xhr.send();
        };

          
        let e = this;
        var storageUrl = 'locais/';

            getFileBlob(imageURL, blob => {
                firebase.storage().ref(`${storageUrl}/${e.state.input}`).put(blob).then(function(snapshot) {
                   console.log('Uploaded a blob or file!');
                })
            })


        this.sleep(2000).then(() => { 
            firebase.auth().onAuthStateChanged(function(user) {
                firebase.storage().ref(`locais/${e.state.input}`).getDownloadURL().then(function(urlLocal) {
                
                  let firebaseLocal = firebase.database().ref(`usuarios/${user.uid}/locais/${e.state.input}`)
                  
                firebaseLocal.push('')
                    firebaseLocal.set({
                      location: e.state.input,
                      url: urlLocal
                    })
                alert('Lugar Cadastrado com Sucesso')
                e.props.navigation.navigate('Home')
              })
            })
        })

    }

    componentDidMount() {
        this.getPermissionAsync()
    }

    getPermissionAsync = async () => {
        if (Constants.platform.android || Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Desculpe, é preciso que a câmera esteja com a permissão concedida');
          }
        }
      };
    
      render() {
        return(
            <ScrollView>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <View style={{backgroundColor: '#527fe2', flex:1, flexDirection: 'row', marginLeft:10, marginRight:10, marginTop:30, borderRadius:20}}>
                        <StatusBar hidden={false} />
                        <View style={{width: 100, padding: 20}}>
                            {this.state.image == null ?  
                                <Image source={require('../assets/imgs/nofound.png')} style={{width:85, height:80, borderRadius: 20}} /> 
                                : 
                                <Image source={{uri: this.state.image}} style={{width:85, height:80, borderRadius: 20}} />
                            }
                        </View>

                        <View>
                            <TouchableOpacity style={{width: 190, backgroundColor: 'white', borderRadius:40, padding: 5, marginTop:20, marginLeft: 70}}>
                                <TextInput value={this.state.input} onChangeText={(e) => this.onTextChange(e)} placeholder="Qual o nome do local?" placeholderTextColor="#9c9c9c" maxLength={20}></TextInput>
                            </TouchableOpacity>
                            
                        <View style={{flex:1, flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => this._pickImage()} style={{marginTop:30, marginLeft:80}}>
                                <Text style={{fontWeight: 'bold', color:'white'}}>Escolher Imagem</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.uploadImageToFirebase(this.state.image)} style={{marginTop: 30, marginLeft:10}}>
                                <MaterialIcons name="present-to-all" size={27} color="white"/>
                            </TouchableOpacity>

                        </View>
                        </View>
                    </View>
            </ScrollView>
        );
    }
}


