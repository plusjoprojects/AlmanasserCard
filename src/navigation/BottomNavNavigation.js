import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";

import DrawerNavigation from './DrawerNavigation'
import { Ionicons, Feather } from "@expo/vector-icons";
import { useTheme } from "@ui-kitten/components";

// Screens
import OrderHistory from '../containers/OrderHistory'
import Fav from '../containers/Fav'
import Settings from '../containers/Settings'
const Tab = createBottomTabNavigator();

export default function BottomTapNavigation(props) {
  let theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "DrawerNavigation") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "OrderHistory") {
            iconName = focused ? "book-open" : "book";
          } else if (route.name === "Fav") {
            iconName = focused ? "heart" : "heart";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings";
          }

          // You can return any component that you like here!
          return (
            <View
              style={{
                borderBottomColor: color,
                borderBottomWidth: focused ? 2 : 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#42b4e6',
        inactiveTintColor: "gray",
        showLabel: false,
      }}
      initialRouteName={"DrawerNavigation"}
    >
      <Tab.Screen name="DrawerNavigation" component={DrawerNavigation} />
      <Tab.Screen name="OrderHistory" component={OrderHistory} />
      <Tab.Screen name="Fav" component={Fav} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
