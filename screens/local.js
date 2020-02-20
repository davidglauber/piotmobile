import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Picker,
  View,
  ImageBackground, 
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform, 
  FlatList
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import firebase from './firebase/firebase';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Local extends React.Component {

  constructor() {
    super();
    this.state = {
        lampadas: [],
        agua:[],
        nivelagua:[],
        presenca:[],
        temperatura:[],
        umidade:[],
        lugares:[],
        selecionado:'',
        selecionado2:'',
        selecionado3:'',
        selecionado4:'',
        selecionado5:'',
        selecionado6:'',
    }
  }


  async componentDidMount() {
    const location = this.props.navigation.state.params.local;
    console.log('location parametro: ' + location)


    let e = this;


    await firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        return null
      }

      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/lampadas`)
        
      firebaseGET.on('value', (snap) => {

      var lamps = [];
      snap.forEach((child) => {
        if(location == child.val().location) {
         
          lamps.push({
            location: child.val().location,
            status: child.val().status,
            id: child.val().id
          });

        }
      });
      
      e.setState({
        lampadas: lamps
      });
     });
    })





    await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/agua`)
      
      firebaseGET.on('value', (snap) => {

      var water = [];
      snap.forEach((child) => {
        if(location == child.val().location) {
         
          water.push({
            location: child.val().location,
            porcetagem: child.val().porcetagem,
            id: child.val().id
          });
        
        }
      });
      
      e.setState({
          agua: water
      });
     });

    })




    await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/presenca`)
      
      firebaseGET.on('value', (snap) => {

      var pres = [];
      snap.forEach((child) => {
        if(location == child.val().location) {

          pres.push({
            location: child.val().location,
            movimento: child.val().movimento,
            id: child.val().id
          });
        
        }
      });
      
      e.setState({
          presenca: pres
      });
     });

    })



    await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/temperatura`)
      
      firebaseGET.on('value', (snap) => {

      var temp = [];
      snap.forEach((child) => {
        if(location == child.val().location) {
         
          temp.push({
            location: child.val().location,
            temperatura: child.val().temperatura,
            id: child.val().id
          });
        }

      });
      
      e.setState({
        temperatura: temp
      });
     });

    })





    await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/umidade`)
      
      firebaseGET.on('value', (snap) => {

      var umid = [];
      snap.forEach((child) => {
        if(location == child.val().location) {
        
          umid.push({
            location: child.val().location,
            status: child.val().status,
            id: child.val().id
          });
        }

      });
      
      e.setState({
          umidade: umid
      });
     });

    })



    await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/nivelagua`)
      
      firebaseGET.on('value', (snap) => {

      var agua = [];
      snap.forEach((child) => {
        if(location == child.val().location) {
        
          agua.push({
            location: child.val().location,
            status: child.val().status,
            id: child.val().id
          });
        }

      });
      
      e.setState({
          nivelagua: agua
      });
     });

    })




     //locais
     await firebase.auth().onAuthStateChanged(function(user) {
      
      let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/locais`)
      
      firebaseGET.on('value', (snap) => {

      var lugar = [];
      snap.forEach((child) => {
        
          lugar.push({
            location: child.val().location,
          });

      });
      
      e.setState({
        lugares: lugar
      });
     });

    })
  }






  ligarLampada(e) {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'ON'})
    })

  }


  desligarLampada(e) {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${e}`).update({status: 'OFF'})
    })

  }


  //Muda a localização
  onValueChangePlace = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/lampadas/${c}`).update({location: e})
    })
  }

  //Muda a localização
  onValueChangePlaceAgua = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/agua/${c}`).update({location: e})
    })
  }

  //Muda a localização
  onValueChangePlaceTemp = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/temperatura/${c}`).update({location: e})
    })
  }

  //Muda a localização
  onValueChangePlaceNVAgua = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/nivelagua/${c}`).update({location: e})
    })
  }

  //Muda a localização
  onValueChangePlacePresenca = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/presenca/${c}`).update({location: e})
    })
  }

  //Muda a localização
  onValueChangePlaceUmidade = (e, c) => {
    firebase.auth().onAuthStateChanged(function(user) {
      firebase.database().ref(`/usuarios/${user.uid}/umidade/${c}`).update({location: e})
    })
  }



  
  render() {
    const { navigation } = this.props;
    const imagem = navigation.state.params.image;
    const local = navigation.state.params.local;
    const cardContainer = [styles.card, styles.shadow];

    const lampadas = this.state.lampadas;
    const agua = this.state.agua;
    const nivelagua = this.state.nivelagua;
    const presenca = this.state.presenca;
    const temperatura = this.state.temperatura;
    const umidade = this.state.umidade;
    const lugares = this.state.lugares;


    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '25%' }}
            >
              <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{ uri: imagem}}
                    style={styles.avatar}
                  />
                </Block>

                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {local}
                    </Text>
                  </Block>
                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ textAlign: "center" }}
                    >
                      Abaixo estão os Sensores e Atuadores do(a) {local}
                    </Text>
                  </Block>



                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Lâmpadas
                    </Text>
                  </Block>
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  
                  
                  <FlatList
                    data={lampadas}
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

                                          {lugares.map(l => (
                                            <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                          ))}
                                        </Picker>
                                    </View>

                                      <Text size={14} style={styles.cardTitle}>{item.location}</Text>
                                    
                                  <View style={{flexDirection:'row'}}>
                                  
                                    <TouchableOpacity onPress={() => this.ligarLampada(item.id)} style={{backgroundColor: '#a9c9d7', padding:5, borderRadius:5}}>
                                          <Text style={{fontWeight:'bold', color: 'white', left:0}}>Ligar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.desligarLampada(item.id)} style={{backgroundColor: '#ff6124', padding:5, marginLeft:40, borderRadius:5}}>
                                          <Text style={{fontWeight:'bold', color: 'white'}}>Desligar</Text>
                                    </TouchableOpacity>
                                    
                                  </View>
                                  </Block>
                                </TouchableWithoutFeedback>
                              </Block>
                          </Block>

                      </View>
                  } />




                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Sensores de Água
                    </Text>
                  </Block>



                  <FlatList
                    data={agua}
                    renderItem={({item}) =>
                  <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../assets/imgs/drop.png')} style={{width:150, height:150}} />
                            </Block>

                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado2}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlaceAgua(value, item.id)}>

                                    {lugares.map(l => (
                                      <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                    ))}
                                  </Picker>
                              </View>

                                <Text size={14} style={styles.cardTitle}><Text style={{fontWeight:'bold'}}>Local atual:</Text> {item.location}</Text>
                                <Text style={{fontWeight:'bold', color: 'black', left:0}}>Porcetagem de água: {item.porcetagem}%</Text>


                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                  </View>
                } />





                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Sensores de Presença
                    </Text>
                  </Block>



                  <FlatList
                    data={presenca}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../assets/imgs/presenca.png')} style={{width:150, height:150}} />
                            </Block>

                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado3}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlacePresenca(value, item.id)}>

                                    {lugares.map(l => (
                                      <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                    ))}
                                  </Picker>
                              </View>

                                <Text size={14} style={styles.cardTitle}><Text style={{fontWeight:'bold'}}>Local atual:</Text> {item.location}</Text>
                                <Text style={{fontWeight:'bold', color: 'black', left:0}}>Status: {item.movimento}</Text>


                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                </View>
                } />








                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Sensores de Temperatura
                    </Text>
                  </Block>


                  <FlatList
                    data={temperatura}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../assets/imgs/cold.png')} style={{width:100, height:150}} />
                            </Block>

                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado4}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlaceTemp(value, item.id)}>

                                    {lugares.map(l => (
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




                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Sensores de Umidade
                    </Text>
                  </Block>





                  <FlatList
                    data={umidade}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../assets/imgs/umidade.png')} style={{width:150, height:150}} />
                            </Block>

                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado5}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlaceUmidade(value, item.id)}>

                                    {lugares.map(l => (
                                      <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                    ))}
                                  </Picker>
                              </View>

                                <Text size={14} style={styles.cardTitle}><Text style={{fontWeight:'bold'}}>Local atual:</Text> {item.location}</Text>
                                <Text style={{fontWeight:'bold', color: 'black', left:0}}>Status: {item.status}</Text>


                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                </View>
                } />



                  <Block
                    row
                    style={{ paddingVertical: 14, alignItems: "baseline" }}
                  >
                    <Text bold size={16} color="#525F7F">
                      Sensores de Nível de Água
                    </Text>
                  </Block>



                  <FlatList
                    data={nivelagua}
                    renderItem={({item}) =>
                <View>

                    <Block flex row>
                        <Block card flex style={cardContainer}>
                          <TouchableWithoutFeedback>

                            <Block flex style={{width: 100}}>
                                <Image source={require('../assets/imgs/flood.png')} style={{width:150, height:150}} />
                            </Block>

                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                            <Block flex space="between" style={styles.cardDescription}>

                              <Text size={14} style={{flex: 1, flexWrap: 'wrap', paddingBottom: 6, fontWeight:'bold', color: '#a9c9d7'}}>{item.id}</Text>

                              <View>
                                  <Picker
                                      selectedValue={this.state.selecionado6}
                                      style={{height: 50, width: 200}}
                                      onValueChange={value => this.onValueChangePlaceNVAgua(value, item.id)}>

                                    {lugares.map(l => (
                                      <Picker.Item placeholder={item.location} label={l.location} key={item.id} value={l.location} />
                                    ))}
                                  </Picker>
                              </View>

                                <Text size={14} style={styles.cardTitle}><Text style={{fontWeight:'bold'}}>Local atual:</Text> {item.location}</Text>
                                <Text style={{fontWeight:'bold', color: 'black', left:0}}>Status: {item.status}</Text>


                            </Block>
                          </TouchableWithoutFeedback>
                        </Block>
                    </Block>

                </View>
                } />


                </Block>
                </Block>
              </Block>
            </ScrollView>
          </ImageBackground>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
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

export default Local;
