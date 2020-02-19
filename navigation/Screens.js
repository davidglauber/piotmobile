import React from "react";
import { Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from "react-navigation";

import { Block } from "galio-framework";
import firebase from '../screens/firebase/firebase';

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
import { TouchableHighlight } from "react-native-gesture-handler";


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
        header: <Header title="Sensores de Temperatura" />
      })
    }
  }
);

const RelatorioStack = createStackNavigator(
  {
    Relatorio: {
      screen: Relatorio,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Relatórios de Gastos" />
      })
    }
  }
);

const PresStack = createStackNavigator(
  {
    Presenca: {
      screen: Presenca,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Sensores de Presenca" />
      })
    }
  }
);

const RulesStack = createStackNavigator(
  {
    Rules: {
      screen: Rules,
      navigationOptions: ({ navigation }) => ({
        title: 'Tela de Regras',
        headerTintColor: '#527fe2',
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-back" sty size={27} color="#527fe2"/>
          </TouchableHighlight>
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
          <TouchableHighlight onPress={() => navigation.navigate('Rules')}>
            <Ionicons name="ios-arrow-back" size={27} color="#fff"/>
          </TouchableHighlight>
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
        header: <Header title="Sensores de Água" />
      })
    }
  }
);

const NivelStack = createStackNavigator(
  {
    NivelAgua: {
      screen: NivelAgua,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Sensores de Nível de Água" />
      })
    }
  }
);

const LocalStack = createStackNavigator(
  {
    Local: {
      screen: Local,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Local" />
      })
    }
  }
);


const UmidadeStack = createStackNavigator(
  {
    Umidade: {
      screen: Umidade,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Sensores de Umidade" />
      })
    }
  }
);


const LampStack = createStackNavigator(
  {
    Lampadas: {
      screen: Lampadas,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Lâmpadas" />
      })
    }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Tela Principal" />
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
      screen: NivelAgua,
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
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Account: {
      screen: Register,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Register" title="Account" />
        )
      })
    },
    Elements: {
      screen: ElementsStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Elements" title="Elements" />
        )
      })
    },
    Articles: {
      screen: ArticlesStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Articles" title="Articles" />
        )
      })
    }
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
