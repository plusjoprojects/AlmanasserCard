/**
 * Root:
 * #The main bootstrap for the app
 */

import React from "react";

/** Components */
import { Ionicons } from "@expo/vector-icons";
import { SplashScreen } from "expo";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
/**
 * Fonts
 * Import Font from expo
 * import fonts
 */
import * as Font from "expo-font";

/** Ui-Kitten Display */
import * as eva from "@eva-design/eva"; //Design System
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"; // UI Application Provider
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Icons Pack

/** Navigation */
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

/** Screens */
import MainNavigation from "./navigation/MainNavigation";
import Login from './containers/Auth/Login'
/** translate navigation   */
import { setI18nConfig, SetFirstTime } from "./translations";
/** Create Stack */
const Stack = createStackNavigator();

/** Stores */
import { Provider } from "react-redux";
import store from "./stores/store";

/** Animation */
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 300,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const closeConfig = {
  animation: "timing",
  config: {
    duration: 100,
    easing: Easing.linear,
  },
};



/** Render() */
export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [screen,setScreen] = React.useState('Login')
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
        
        /* Load Locale and translation from storage  */
        const locale = await AsyncStorage.getItem("locale");
        // Check If the first time is load
        if (!locale) {
          // Set it to english if the first time
          SetFirstTime("en", false);
        } else {
          if (locale == "en") {
            SetFirstTime("en", false);
          } else if (locale == "ar") {
            setI18nConfig("ar", true);
          }
        }


        /** Token */
        let token = await AsyncStorage.getItem('token');
        if(!token) { 
          setScreen("Login");
        }else {
          setScreen("MainNavigation");
        }

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store} style={styles.container}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          {Platform.OS === "ios" && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                gestureDirection: "horizontal",
                cardStyleInterpolator:
                  CardStyleInterpolators.forFadeFromBottomAndroid,
                transitionSpec: {
                  open: config,
                  close: closeConfig,
                },
              }}
              initialRouteName={screen}
              headerMode="float"
              animation="fade"
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="MainNavigation" component={MainNavigation} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
