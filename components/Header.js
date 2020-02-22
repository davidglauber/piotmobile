import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, FlatList, Dimensions, View, Modal, Image } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import firebase from '../screens/firebase/firebase'; 
import Icon from './Icon';
import Input from './Input';
import { Ionicons } from '@expo/vector-icons';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';

const { height, width } = Dimensions.get('window');


const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {

  constructor() {
    super(); 
    this.state = {
      isVisible: false,
      notifications:[]
    }
  }


  async componentDidMount() {
    const notifications = this.state.notifications;
    let e = this;

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
  }






  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }

  logout() {
    let e = this;
    firebase.auth().signOut()
    e.props.navigation.navigate('Login')

    
  }


  openNotifications() {
    this.setState({isVisible: true})
  }




deleteNotification(e) {
    firebase.auth().onAuthStateChanged(function(user) {

      if(user) {
        firebase.database().ref(`/usuarios/${user.uid}/notificacoes/${e}`).remove()
      }
    
  })
}


  renderRight = () => {
    const { white, title, navigation } = this.props;
    const { routeName } = navigation.state;
    const isVisible = this.state.isVisible;
    const notifications = this.state.notifications;


    if (title === 'Title') {
      return [
        <BellButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (routeName) {
      case 'Home':
        return (
          <View style={{flexDirection:'row'}}>
            
            {/*Modal*/}
            <Modal
                transparent={true}
                animationType="slide"
                visible={this.state.isVisible}
                onRequestClose={() => this.setState({isVisible: false})}
            >
              <View style={{flex: 1, marginTop: height / 2, backgroundColor: '#6f97f2', borderRadius: 20, elevation:10}}>
                  <View style={{flexDirection:'column', alignContent:'center', alignItems:'center'}}>
                    <Image source={require('../assets/imgs/foto.png')} style={{width: 120, height:70}}></Image>
                      <View style={{flexDirection:'row'  , justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop:10}}>
                          <View style={{padding:5, borderRadius:5, backgroundColor:'white'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color:'black'}}>Sensores e Atuadores</Text>
                          </View>

                          <TouchableOpacity onPress={() => this.setState({isVisible: false})}>
                            <Ionicons 
                              name='md-exit'
                              size={29}
                              style={{color: 'white', marginLeft: 50}}
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

                                <View style={{flexDirection:'column', width: width - 20, marginTop:40, backgroundColor:'#eaeaea', borderRadius: 10, padding:10}}>
                                  <View style={{ flexDirection:'row'}}>
                                    <Text style={{color:'#878787'}}>{item.id}</Text>
                                    <TouchableOpacity onPress={() => this.deleteNotification(item.id)}>
                                                <Ionicons style={{color: 'green', marginLeft: 140}} name='md-checkbox' size={27}/>
                                    </TouchableOpacity>
                                  </View>
                                  <Text style={{fontWeight: 'bold'}}>{item.message}</Text>
                                </View>
                              
                          

                          } />
                        }
                        
                      </View>
                  </View>
              </View>
            </Modal>

              <TouchableOpacity style={{padding: 12, position: 'relative'}} onPress={() => this.logout()}>
                <Ionicons
                  size={26}
                  name="ios-exit"
                  style={{color:'blue'}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.openNotifications()} style={{padding: 12, position: 'relative'}}>
                <Ionicons
                  size={26}
                  name="md-notifications"
                  style={{color:'gray'}}
                />
              </TouchableOpacity>
          </View>
        );

      case 'Deals':
        return (
          <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
            <Ionicons
              size={26}
              name="ios-exit"
              style={{color:'blue'}}
            />
            <Block />
          </TouchableOpacity>
        );
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => navigation.navigate('Pro')}
        iconContent={<Icon size={16} color={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
      />
    );
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'Beauty'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Pro')}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles.tabTitle}>{optionRight || 'Fashion'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={back}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon 
              name={back ? 'nav-left' : "menu-8"} family="ArgonExtra" 
              size={14} onPress={this.handleLeftPress} 
              color={iconColor || argonTheme.COLORS.ICON}/>
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  modal: {
    backgroundColor: 'black',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});

export default withNavigation(Header);
