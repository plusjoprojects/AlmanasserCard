import React from "react";

/** Components */
import { Easing } from "react-native";

/** Navigation Components */
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import BottomNavNavigation from './BottomNavNavigation'
import CategoriesShow from '../containers/CategoriesShow'
import Checkout from '../containers/Checkout'
import Code from '../containers/Code'
import Search from '../containers/Search'
import UpdateProfile from '../containers/UpdateProfile'
import Language from '../containers/Language'
/** Stack Creator */
const Stack = createStackNavigator();

/** Config Navigation Animation */
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
export default function MainNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
      }}
      headerMode="float"
      animation="fade"
      initialRouteName={"BottomNavNavigation"}
    >
      <Stack.Screen
        name="BottomNavNavigation"
        component={BottomNavNavigation}
      />
      <Stack.Screen name="CategoriesShow" component={CategoriesShow} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Code" component={Code} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Language" component={Language} />
    </Stack.Navigator>
  );
}
