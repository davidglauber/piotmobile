import React from 'react';
import {ScrollView, Image,  StyleSheet, Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, Alert, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';


import firebase from '../firebase/firebase';

const { width } = Dimensions.get('screen');

class Lampadas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lampadasDisponiveis:[]
    }
  }


  async componentDidMount() {
    let e = this;
    var lampadasDisponiveis = this.state.lampadasDisponiveis;

      await firebase.auth().onAuthStateChanged(function(user) {
      
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
  
  } 
  

  ligarLampada(e) {
    const lampadasDisponiveis = this.state.lampadasDisponiveis;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'ON'})
    })

  }


  desligarLampada(e) {
    const lampadasDisponiveis = this.state.lampadasDisponiveis;
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'OFF'})
    })

  }
  

  renderArticles = () => {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    const cardContainer = [styles.card, styles.shadow];

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    const lampadasDisponiveis = this.state.lampadasDisponiveis;

    return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}>

                <FlatList
                    data={lampadasDisponiveis}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>
                            <Block flex style={{width: 100}}>
                            {item.status === 'ON' ? 
                                <Image source={require('../lamp.png')} style={{width:100, height:150}} />
                                : 
                                <Image source={require('../lampOFF.png')} style={{width:100, height:150}} />
                            }
                            </Block>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>
                              <Text size={14} style={styles.cardTitle}>{item.location}</Text>
                              
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
    paddingBottom: 6
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
