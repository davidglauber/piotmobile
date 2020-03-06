import React from 'react';
import {ScrollView, Image, StyleSheet,Clipboard , Text, View, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback, Alert, StatusBar, Modal } from 'react-native';
import { Block, theme } from 'galio-framework';
import { Ionicons } from '@expo/vector-icons';

//Obtem as dimensões
import firebase from './firebase/firebase';

const { width, height } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
      lugaresDisponiveis:[],
      idUsuarioAtual: '',
      isVisible: false,
      notifications:[]
    }
  }


  async componentDidMount() {
    let e = this;
    var lugaresDisponiveis = this.state.lugaresDisponiveis;

      await firebase.auth().onAuthStateChanged(function(user) {

        if(  user !== null ) {
          e.setState({idUsuarioAtual: user.uid})

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
        } else {
          e.props.navigation.navigate('Login')
        }
      

      })
      console.log('Lista de locais: ' + lugaresDisponiveis)
  














      await firebase.auth().onAuthStateChanged(function(user) {

        if(user) {
            let firebaseGET = firebase.database().ref(`usuarios/${user.uid}/notificacoes`)
            
            firebaseGET.on('value', (snap) => {
  
            var notif = [];
            snap.forEach((child) => {
              
                notif.push({
                  id: child.val().id,
                  message: child.val().message
                });
  
            });
            
            e.setState({
              notifications: notif
            });
          });
        }
      })

      console.log('notificao: ' + this.state.notifications)
  } 


  
  openNotifications() {
    console.log('entrou na funcao not')
    var isVisible = this.state.isVisible;

    this.setState({isVisible: true})
  }



  deleteNotification(e) {
    firebase.auth().onAuthStateChanged(function(user) {

      if(user) {
        firebase.database().ref(`/usuarios/${user.uid}/notificacoes/${e}`).remove()
      }
    
  })
}


  async copyText(e) {
    await Clipboard.setString(e)

    Alert.alert(
      `${this.state.idUsuarioAtual}`,
      'ID Copiado com Sucesso',
      [
        {text: 'OK, entendi', onPress: () => console.log('OK Pressed')}
      ],
      {cancelable: false},
    );
  }
  

  renderArticles = () => {
    const { navigation, horizontal, full, imageStyle } = this.props;
    const cardContainer = [styles.card, styles.shadow];
    const cardContainer2 = [styles.card2, styles.shadow];
    var isVisible = this.state.isVisible;
    const notifications = this.state.notifications;

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
              
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <StatusBar hidden={false} />

          <View style={{flex:1, flexDirection: 'row'}}>

            {/*Modal*/}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isVisible}
                onRequestClose={() => this.setState({isVisible: false})}
            >
              <View style={{flex: 1, marginTop: 300, marginLeft:10,marginRight:10, backgroundColor: '#f0f4ee', borderRadius: 20}}>
                  <ScrollView contentContainerStyle={{flexDirection:'column', alignContent:'center', alignItems:'center'}}>
                    <Image source={require('../assets/imgs/foto.png')} style={{width: 120, height:70}}></Image>
                      <View style={{flexDirection:'row'  , justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop:10}}>
                          <View style={{padding:5, borderRadius:5, backgroundColor:'#527fe2'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color:'#fff'}}>Sensores e Atuadores</Text>
                          </View>

                          <TouchableOpacity onPress={() => this.setState({isVisible: false})}>
                            <Ionicons 
                              name='md-exit'
                              size={29}
                              style={{color: '#527fe2', marginLeft: 50}}
                            />
                          </TouchableOpacity>


                      </View>


                      <View style={{marginTop:50}}>

                        {notifications.length == 0 ?
                          <View style={{flex:1, justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                            <Image style={{marginTop:200, width:400, height: 200}} source={require('../assets/imgs/404.gif')}/>
          
          
                            <Text style={{color:'black', fontWeight:'bold', fontSize:20}}>Sem Notificações!</Text>
                          </View>
                        :

                          <FlatList 
                            data={notifications}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 

                                <View style={{flexDirection:'column', width: width - 30, marginTop:40, backgroundColor:'#eaeaea', borderRadius: 15, marginLeft:5,marginRight:5, padding:10}}>
                                  <View style={{ flexDirection:'row'}}>
                                    <Text style={{color:'#878787'}}>{item.id}</Text>
                                    <TouchableOpacity onPress={() => this.deleteNotification(item.id)}>
                                                <Ionicons style={{color: '#527fe2', marginLeft: 140}} name='md-checkbox' size={27}/>
                                    </TouchableOpacity>
                                  </View>
                                  <Text style={{fontWeight: 'bold'}}>{item.message}</Text>
                                </View>
                              
                          

                          } />
                        }
                        
                      </View>
                  </ScrollView>
              </View>
            </Modal>

          <TouchableOpacity onPress={() => navigation.navigate('Rules')} style={{flexDirection:'row', width: 200, backgroundColor: '#527fe2', borderRadius:7, padding: 5, marginTop:7, marginRight:15}}>
              <Ionicons name="ios-add-circle" size={24} color="white"/>
              <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginLeft: 8, marginTop:1}}
            >Criar Regra</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{flexDirection:"row",width:60, height:30, backgroundColor: '#527fe2', padding: 5, borderRadius:7, marginTop:10}} onPress={() => this.copyText(this.state.idUsuarioAtual)}>
              <Ionicons name="ios-finger-print" size={19} color="white"/>
              <Text style={{fontSize: 15, color:'white', fontWeight:'bold', marginLeft: 8}}>ID</Text>
            </TouchableOpacity>


            {/*abre o modal de notificações*/}
            <TouchableOpacity style={{flexDirection:"row",width:30, height:30, backgroundColor: '#527fe2', padding: 5, borderRadius:7, marginTop:10, marginLeft:15}} onPress={() => this.openNotifications()}>
                <Ionicons
                  size={19}
                  name="md-notifications"
                  style={{color:'#fff', marginLeft:3}}
                />
              </TouchableOpacity>
            
          </View>

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
                    <Text style={{fontWeight: 'bold', fontSize:20, marginTop:70, color: '#5E72E4'}}>Sensores e Atuadores</Text>
                  </View>

                  {/*lâmpadas*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Lampadas')}>
                      <Block flex style={{width: 100, padding: 20}}>
                        <Image source={require('../assets/imgs/lamp.png')} style={{width:55, height:80}} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Lampadas')}>
                      <Block flex style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Lâmpadas</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Lâmpadas</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>

                  {/*presença*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Presenca')}>
                      <Block flex style={{width: 100, padding: 20}}>
                        <Image source={require('../assets/imgs/presenca.png')} style={{width:80, height:80}}/>
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Presenca')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Presença</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>


                  {/*temperatura*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Temperatura')}>
                      <Block flex style={{width: 100, padding:20}}>
                        <Image source={require('../assets/imgs/cold.png')} style={{width:60, height:80}} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Temperatura')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Temperatura</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>



                  {/*sensor de água*/}
                  <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Agua')}>
                      <Block flex style={{width: 100, padding:20}}>
                        <Image source={require('../assets/imgs/drop.png')} style={{width:65, height:80}} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Agua')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Água</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>


                   {/*sensor de umidade*/}
                   <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Umidade')}>
                      <Block flex style={{width: 100, padding:20}}>
                        <Image source={require('../assets/imgs/umidade.png')} style={{width:78, height:80}} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Umidade')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Umidade</Text>
                        <Text size={12} style={{fontSize:12, fontWeight:'bold', color: 'blue'}}>Acessar Lista de Sensores</Text>
                      </Block>
                    </TouchableWithoutFeedback>
                  </Block>


                   {/*sensor de nível de água*/}
                   <Block card flex style={cardContainer2}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('NivelAgua')}>
                      <Block flex style={{width: 100, padding:20}}>
                        <Image source={require('../assets/imgs/flood.png')} style={{width:65, height:80}} />
                      </Block>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('NivelAgua')}>
                      <Block flex space="between" style={styles.cardDescription}>
                        <Text size={14} style={styles.cardTitle}>Sensores de Nível de Água</Text>
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
    paddingBottom: 2
  },
  cardDescription: {
    padding: theme.SIZES.BASE
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
