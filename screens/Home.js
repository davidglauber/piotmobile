import React from 'react';
import {ScrollView, Image,  StyleSheet, Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, Alert, TextInput, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../components';
import articles from '../constants/articles';


import firebase from './firebase/firebase';

const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lugaresDisponiveis:[],
      idUsuarioAtual: '',
    }
  }


  componentDidMount() {
    let e = this;

    var emailDoUsuario = '';
    var id = '';
    var lugaresDisponiveis = this.state.lugaresDisponiveis;

    const idUsuarioAtual = this.state.idUsuarioAtual;
    const confirmacaoDeMudancaState = this.state.confirmacaoDeMudancaState;

    const db = firebase.database().ref('usuarios');


    firebase.auth().onAuthStateChanged(function(user) {
      alert('seu id: '+ user.uid)

      if(user == null || user == undefined) {
        console.log('entrou no if de usuario nulo')
        e.props.router.push({
          pathname: '/login'
        });
      } 

      let firebaseGET = firebase.database().ref(`/usuarios/${user.uid}/locais`)
  
      firebaseGET.on('value', (snap) => {
        var lugares = [];

        snap.forEach((child) => {
          lugares.push({
            location: child.val().location,
            url: child.val().url
          })
        })

        lugaresDisponiveis = lugares
        e.setState({lugaresDisponiveis: lugares})
      })

  })


    try { 
      firebase.auth().onAuthStateChanged(function(user) {
            

        db.on('value', gotData);

        function gotData(data) {
          var b = false;

          console.log('entrou na função de et')
            var confirmed = data.val();


        var confirmedUser = Object.keys(confirmed);

        for(var i = 0; i < confirmedUser.length; i++) {
          var k = confirmedUser[i];
          var confirmacao = confirmed[k].confirmed;

          if(user == null) {
            e.props.router.push({
              pathname: '/login'
            });
          } 

          console.log('usuario confirmado: ' + confirmacao)
          console.log('id do usuario confirmado: ' + user.uid)

          if(k !== user.uid) {
            b = true
          }

          if(k == user.uid && confirmacao === true) {
              return null
          }

          }

          if(b == true) {
            let firebaseEmail = firebase.database().ref(`usuarios/${user.uid}`)
         
        
            firebaseEmail.push('')
              firebaseEmail.set({
                confirmed: true
              })
          }
        }
      
      });
  } catch(error) {
    console.log(error)
  }
  
  } 
  
  

  renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>

          <Block flex row>
            <Card item={{title: 'LUGAR: Área da Piscina',
            image: 'https://odis.homeaway.com/odis/listing/a5e6710d-5ec3-45bc-8b80-b1886a3a7089.c10.jpg',
            cta: 'Acessar Local', 
            horizontal: true
            }} style={{ marginRight: theme.SIZES.BASE }} />
            <Card item={articles[2]} />
          </Block>
          <Card item={articles[3]} horizontal />
          <Card item={articles[4]} full />
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
