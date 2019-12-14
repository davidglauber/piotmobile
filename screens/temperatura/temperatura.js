import React from 'react';
import {ScrollView, Image,  StyleSheet, Text, Picker, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, Alert, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';
import {Select} from "../../components/";


import firebase from '../firebase/firebase';

const { width } = Dimensions.get('screen');

class Temperatura extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        temperatura: [],
        lugaresDisponiveis: []
    }
  }


  async componentDidMount() {
    let e = this;
    var temperatura = this.state.lampadasDisponiveis;
    var lugaresDisponiveis = this.state.lugaresDisponiveis;

      await firebase.auth().onAuthStateChanged(function(user) {
      
        let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/temperatura`)
        
        firebaseGET.on('value', (snap) => {

        var temp = [];
        snap.forEach((child) => {
          
            temp.push({
              location: child.val().location,
              temperatura: child.val().temperatura,
              id: child.val().id
            });

        });
        
        e.setState({
          temperatura: temp
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
  


  onValueChangePlace = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/temperatura/${c}`).update({location: e})
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
    const temperatura = this.state.temperatura;
    const lugaresDisponiveis = this.state.lugaresDisponiveis;

    return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}>


              { temperatura.length == 0  ? 
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                  <Image style={{width:300, height: 300}} source={require('../404.gif')}/>


                  <Text style={{color:'blue', fontWeight:'bold', fontSize:30}}>Página vazia!</Text>
                </View>
                :

                <FlatList
                    data={temperatura}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../cold.png')} style={{width:100, height:150}} />
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

                                <Text size={14} style={styles.cardTitle}><Text style={{fontWeight:'bold'}}>Local atual:</Text> {item.location}</Text>
                                <Text style={{fontWeight:'bold', color: 'black', left:0}}>Temperatura: {item.temperatura}</Text>


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

export default Temperatura;
