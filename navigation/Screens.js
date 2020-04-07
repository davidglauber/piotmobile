import React from "react";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";
import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Umidade from '../screens/umidade/umidade';
import NivelAgua from '../screens/nivelagua/nivelagua';
import Relatorio from '../screens/relatorios';
import Presenca from '../screens/presenca/presenca';
import presenceRule from '../screens/rules/presenceRule';
import Agua from '../screens/agua/agua';
import Lampadas from '../screens/lampadas/lampadas';
import Temperatura from '../screens/temperatura/temperatura';
import Local from '../screens/local';
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Rules from '../screens/rules/rules';
import Articles from "../screens/Articles";
import Login from "../screens/login";

// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


const ElementsStack = createStackNavigator({
  Elements: {
    screen: Elements,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Elements" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
});

const ArticlesStack = createStackNavigator({
  Articles: {
    screen: Articles,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Articles" navigation={navigation} />
    })
  }
},{
  cardStyle: {
    backgroundColor: "#F8F9FE"
  },
});

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: "#FFFFFF" },
  }
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true
      })
    }
  }
);

const TempStack = createStackNavigator(
  {
    Temperatura: {
      screen: Temperatura,
      navigationOptions: ({ navigation }) => ({
        title: 'Sensores de Temperatura',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" sty size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const RelatorioStack = createStackNavigator(
  {
    Relatorio: {
      screen: Relatorio,
      navigationOptions: ({ navigation }) => ({
        title: 'Relatório de Consumo',
        headerTintColor: '#fff',
        headerLeft: (
          <TouchableOpacity style={{padding:5}} onPress={() => navigation.openDrawer()}>
            <Ionicons name="ios-apps" sty size={27} color="#fff"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#527fe2',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const PresStack = createStackNavigator(
  {
    Presenca: {
      screen: Presenca,
      navigationOptions: ({ navigation }) => ({
        title: 'Sensores de Presença',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" sty size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const RulesStack = createStackNavigator(
  {
    Rules: {
      screen: Rules,
      navigationOptions: ({ navigation }) => ({
        title: 'Adicionar Local',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" sty size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const presenceRuleStack = createStackNavigator(
  {
    presenceRule: {
      screen: presenceRule,
      navigationOptions: ({ navigation }) => ({
        title: 'Sensor de Presença',
        headerTintColor: '#fff',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('Rules')}>
            <Ionicons name="ios-arrow-back" size={27} color="#fff"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#527fe2',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const AguaStack = createStackNavigator(
  {
    Agua: {
      screen: Agua,
      navigationOptions: ({ navigation }) => ({
        title: 'Sensores de Água',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}} onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" sty size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const NivelStack = createStackNavigator(
  {
    NivelAgua: {
      screen: NivelAgua,
      navigationOptions: ({ navigation }) => ({
        title: 'Nível de Água',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);

const LocalStack = createStackNavigator(
  {
    Local: {
      screen: Local,
      navigationOptions: ({ navigation }) => ({
        title: 'Local',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);


const UmidadeStack = createStackNavigator(
  {
    Umidade: {
      screen: Umidade,
      navigationOptions: ({ navigation }) => ({
        title: 'Sensores de Umidade',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);


const LampStack = createStackNavigator(
  {
    Lampadas: {
      screen: Lampadas,
      navigationOptions: ({ navigation }) => ({
        title: 'Lâmpadas',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:30
        }
      })
    }
  }
);


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: 'Tela Principal',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableOpacity style={{padding:5}}  onPress={() => navigation.openDrawer()}>
            <Ionicons name="ios-apps" size={27} color="#527fe2"/>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{padding: 12, position: 'relative'}}>
                <Ionicons
                  size={26}
                  name="ios-exit"
                  style={{color:'#527fe2'}}
                />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: '#fff',
          elevation:0,
        },
        headerLeftContainerStyle: {
          marginLeft:10,
          marginRight:100
        },
        headerRightContainerStyle: {
          marginRight:10
        }
      })
    },
    Pro: {
      screen: Pro,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header left={<Block />} white transparent title="" navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
  }
);
// divideru se baga ca si cum ar fi un ecrna dar nu-i nimic duh
const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: Onboarding,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Presenca: {
      screen: PresStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Rules: {
      screen: RulesStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    presenceRule: {
      screen: presenceRuleStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    NivelAgua: {
      screen: NivelStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Agua: {
      screen: AguaStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Umidade: {
      screen: UmidadeStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Temperatura: {
      screen: TempStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Local: {
      screen: Local,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Lampadas: {
      screen: LampStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Home: {
      screen: HomeStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Home" title="Home" />
        )
      })
    },
    Relatorio: {
      screen: RelatorioStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Relatórios" title="Relatórios" />
        )
      })
    },
    Login: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Account: {
      screen: Register,
      navigationOptions: {
        drawerLabel: () => {}
      }

    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: {
        drawerLabel: () => {}
      }
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
