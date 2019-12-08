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
import Agua from '../screens/agua/agua';
import Lampadas from '../screens/lampadas/lampadas';
import Temperatura from '../screens/temperatura/temperatura';
import Local from '../screens/local';
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
import Login from "../screens/login";

// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

// header for screens
import Header from "../components/Header";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = "Search";

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps &&
        screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

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
  transitionConfig
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
  transitionConfig
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
    transitionConfig
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
    transitionConfig
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
