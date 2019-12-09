import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions, 
  KeyboardAvoidingView
} from "react-native";
import { Block, Button, Text, theme, Checkbox  } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import {Icon, Input} from "../components";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import firebase from './firebase/firebase';
import { TouchableOpacity } from "react-native-gesture-handler";


class Onboarding extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      senha: '',
      confirmarSenha:'',
      email:''
    }
  }

  async componentDidMount() {
    let e = this;

    await firebase.auth().onAuthStateChanged(function(user) {
    
        if(user == null) {
          e.props.navigation.navigate('Onboarding')
        } 
        if (user !== null) {
          e.props.navigation.navigate('Home')
        }

    })
  }

  cadastro() {
        
      if( this.state.senha == this.state.confirmarSenha ){ 

          firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.senha);
          
          alert('Conta cadastrada!')

                this.props.navigation.navigate('Login')

      } else {
        alert('As senhas não coincidem')
      }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Image style={{width: 80, height:"auto", borderRadius:70}} source={require('./foto.png')}/>                 
                  <Text style={styles.socialTextButtons}>PioT</Text>
                </Block>
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Cadastre-se abaixo
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        value={this.state.email}
                        onChangeText = {(email) => this.setState({email})}
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        onChangeText = {(senha) => this.setState({senha})}
                        value={this.state.senha}
                        placeholder="Senha"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>

                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        onChangeText = {(confirmarSenha) => this.setState({confirmarSenha})}
                        value={this.state.confirmarSenha}
                        placeholder="Confirmar Senha"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                  
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{
                      color: argonTheme.COLORS.PRIMARY,
                      fontWeight: "800",
                      fontSize: 15
                      }}>Já tem uma conta? Entre agora!</Text>

                  </TouchableOpacity>
                    
                    <Block middle>
                      <Button onPress={() => this.cadastro()} color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Criar conta
                        </Text>
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 20
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 105
  }
});

export default Onboarding;
