import React, {useState} from 'react';
import {ScrollView, Image, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


export default function Rules() {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null)

    function uploadImage() {
        let e = this;
        let reader = new FileReader();

        reader.onloadend = function (evt) {
            var blob = new Blob([evt.target.result], {type: "image"});

            var storageUrl = 'locais/';
            var storageRef = firebase.storage().ref(storageUrl)
        }
    }

        return(
            <ScrollView>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                    <View style={{backgroundColor: '#527fe2', flex:1, flexDirection: 'row', marginLeft:10, marginRight:10, marginTop:30, borderRadius:20}}>
                        <StatusBar hidden={false} />
                        <View style={{width: 100, padding: 20}}>
                            <Image source={require('../assets/imgs/nofound.png')} style={{width:85, height:80, borderRadius: 20}} />
                        </View>

                        <View>
                            <TouchableOpacity style={{width: 190, backgroundColor: 'white', borderRadius:40, padding: 5, marginTop:20, marginLeft: 70}}>
                                <TextInput value={input} onChangeText={(e) => setInput(e)} placeholder="Qual o nome do local?" placeholderTextColor="#9c9c9c" maxLength={20}></TextInput>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={() => uploadImage()} style={{marginTop:30, marginLeft:80}}>
                                <Text style={{fontWeight: 'bold', color:'white'}}>Escolher Imagem</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </ScrollView>
        );
}


