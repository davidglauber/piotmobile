import React from 'react';
import {ScrollView, Image,  StyleSheet, Text, Picker, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, Alert, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Block, theme } from 'galio-framework';
import firebase from '../firebase/firebase';

const { width } = Dimensions.get('screen');

class Lampadas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lampadasDisponiveis:[],
      lugaresDisponiveis:[],
      selecionado:''
    }
  }


  /*Acessa o Firebase*/
  async componentDidMount() {
    let e = this;

      await firebase.auth().onAuthStateChanged(function(user) {
        
        if ( user == null ) { 
          e.props.navigation.navigate('Login')
        }
        let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/lampadas`)
        
        firebaseGET.on('value', (snap) => {

        var lamps = [];
        snap.forEach((child) => {
          
            lamps.push({
              location: child.val().location,
              status: child.val().status,
              id: child.val().id
            });

        });
        
        e.setState({
          lampadasDisponiveis: lamps
        });
       });

      })


      //locais
      await firebase.auth().onAuthStateChanged(function(user) {
      
        let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/locais`)
        
        firebaseGET.on('value', (snap) => {

        var lugares = [];
        snap.forEach((child) => {
          
            lugares.push({
              location: child.val().location,
            });

        });
        
        e.setState({
          lugaresDisponiveis: lugares
        });
       });

      })
      
  } 
  
  /*Muda o status para ON no Firebase*/
  ligarLampada(e) {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'ON'})
    })

  }

  /*Muda o status para OFF no Firebase*/
  desligarLampada(e) {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'OFF'})
    })

  }

  /*Muda o Local da lãmpada*/
  onValueChangePlace = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${c}`).update({location: e})
    })
  }
  

  renderArticles = () => {
    const cardContainer = [styles.card, styles.shadow];
    const lampadasDisponiveis = this.state.lampadasDisponiveis;
    const lugaresDisponiveis = this.state.lugaresDisponiveis;

    return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}>

              { lampadasDisponiveis.length == 0  ? 
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Image style={{width:300, height: 300}} source={require('../assets/imgs/404.gif')}/>


                  <Text style={{color:'blue', fontWeight:'bold', fontSize:30}}>Página vazia!</Text>
                </View>
                :

                <FlatList
                    data={lampadasDisponiveis}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>
                            <Block flex style={{width: 100}}>
                            {item.status === 'ON' ? 
                                <Image source={require('../assets/imgs/lamp.png')} style={{width:100, height:150}} />
                                : 
                                <Image source={require('../assets/imgs/lampOFF.png')} style={{width:100, height:150}} />
                            }
                            </Block>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlace(value, item.id)}>

                                    {lugaresDisponiveis.map(l => (
                                      <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                    ))}
                                  </Picker>
                              </View>

                                <Text size={14} style={styles.cardTitle}>Local Atual: {item.location}</Text>
                              
                            <View style={{flexDirection:'row'}}>
                             
                              <TouchableOpacity onPress={() => this.ligarLampada(item.id)} style={{backgroundColor: '#a9c9d7', padding:5, borderRadius:5}}>
                                    <Text style={{fontWeight:'bold', color: 'white', left:0}}>Ligar</Text>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={() => this.desligarLampada(item.id)} style={{backgroundColor: '#ff6124', padding:5, marginLeft:50, borderRadius:5}}>
                                    <Text style={{fontWeight:'bold', color: 'white'}}>Desligar</Text>
                              </TouchableOpacity>
                              
                            </View>
                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                </View>
                } />

              }

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
  card: {
    flexDirection:'row',
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6, 
    fontWeight:'bold'
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  }
});

export default Lampadas;
