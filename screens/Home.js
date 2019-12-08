import React from 'react';
import {ScrollView, Image, StyleSheet, Text, View, Button, KeyboardAvoidingView, AsyncStorage, Modal, Switch, Alert, TextInput, ImageBackground, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '../components';
import articles from '../constants/articles';
import { argonTheme } from '../constants';

import firebase from './firebase/firebase';

const { width } = Dimensions.get('screen');
const { height } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lugaresDisponiveis:[],
      idUsuarioAtual: '',
    }
  }


  async componentDidMount() {
    let e = this;
    var lugaresDisponiveis = this.state.lugaresDisponiveis

      await firebase.auth().onAuthStateChanged(function(user) {
      
        let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/locais`)
        
        firebaseGET.on('value', (snap) => {

        var lugares = [];
        snap.forEach((child) => {
          
            lugares.push({
              location: child.val().location,
              url: child.val().url,
            });

        });
        
        e.setState({
          lugaresDisponiveis: lugares
        });
       });

      })
      console.log('Lista de locais: ' + lugaresDisponiveis)
  
  } 
  
  

  renderArticles = () => {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    const cardContainer = [styles.card, styles.shadow];
    const cardContainer2 = [styles.card2, styles.shadow];

    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    const lugaresDisponiveis = this.state.lugaresDisponiveis;

    return (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.articles}>

                <FlatList
                    data={lugaresDisponiveis}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback onPress={() => navigation.navigate('Local', {
                            image: item.url,
                            local: item.location
                          })}>
                            <Block flex style={imgContainer}>
                              <Image source={{uri: item.url}} style={imageStyles} />
                            </Block>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={() => navigation.navigate('Local', {
                            image: item.url,
                            local: item.location
                          })}>
                            <Block flex space="between" style={styles.cardDescription}>
                              <Text size={14} style={styles.cardTitle}>{item.location}</Text>
                              <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Local</Text>
                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                </View>
                } />

                  <View>
                    <Text style={{fontWeight: 'bold', fontSize:20, marginTop:70, color: '#5E72E4'}}>Sensores E Atuadores</Text>
                  </View>

                  {/*lâmpadas*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Lampadas')}>
                      <Block flex style={{width: 100}}>
                        <Image source={require('./lamp.png')} style={imageStyles} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Lampadas')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Lâmpadas</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Lâmpadas</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>

                  {/*presença*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Local')}>
                      <Block flex style={{width: 100}}>
                        <Image source={require('./presenca.png')} style={imageStyles} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Local')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Presença</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>


                  {/*temperatura*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Temperatura')}>
                      <Block flex style={{width: 100}}>
                        <Image source={require('./cold.png')} style={imageStyles} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Temperatura')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Temperatura</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>
            
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
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  card2: {
    flexDirection:'row',
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    marginTop:30,
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

export default Home;
