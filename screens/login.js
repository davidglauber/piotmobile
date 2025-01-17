import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions, 
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { Block, Button, Text, theme, Checkbox  } from "galio-framework";

const { height, width } = Dimensions.get("screen");
import {Icon, Input} from "../components";
import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import firebase from './firebase/firebase';


class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      senha: '',
      confirmarSenha:'',
      email:''
    }
  }


  //Verifica se o usuário é null, se não, ele acessa o app logando pelo firebase
  login() {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
          return null
        }

      })
          try {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha);
              this.props.navigation.navigate('Home')

            } catch (error) {
                alert("Erro no Login")
            }
      
  }

  render() {
    return (
      <Block flex middle>
          <StatusBar backgroundColor="white" barStyle="white-content" />
          <StatusBar hidden={false} />
        <ImageBackground
          source={Images.Onboarding}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Block row style={{ marginTop: theme.SIZES.BASE }}>
                  <Image style={{width: 80, height:"auto", borderRadius:70}} source={require('../assets/imgs/foto.png')}/>                 
                  <Text style={styles.socialTextButtons}>PioT</Text>
                </Block>

              </Block>
              
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={12}>
                    Faça seu login abaixo!
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

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Onboarding')}>
                        <Text style={{
                          color: argonTheme.COLORS.PRIMARY,
                          fontWeight: "800",
                          fontSize: 15
                          }}>Não tem uma conta? Cadastre-se agora!</Text>
                    </TouchableOpacity>

                    <Block middle>
                      <Button onPress={() => this.login()} color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Logar
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

export default Login;
