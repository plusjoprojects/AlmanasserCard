import React from 'react'
/** Components */
import {View,} from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import { Text,Icon,Button } from "@ui-kitten/components";
import { connect } from "react-redux";
const ContentDrawer = (props) => {

  let sign_out = async () => {
    try {
      await AsyncStorage.removeItem("token");
      props.navigation.navigate("Login");
    } catch (error) {}
  };
    return (
      <DrawerContentScrollView
        contentContainerStyle={{ backgroundColor: "#42b4e6" }}
        {...props}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 40,
            backgroundColor: "#42b4e6",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "white",
            }}
          >
            Al-ManaseerCard
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#eee",
            borderWidth: 1,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            backgroundColor: "#099bdb",
          }}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{ color: "white", textTransform: "uppercase" }}
              category="s1"
            >
              {props.user.user.name}
            </Text>
          </View>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            {props.user.user.wallet && (
              <Text
                style={{ color: "white", textTransform: "uppercase" }}
                category="s1"
              >
                {props.user.user.wallet.amount}JD
              </Text>
            )}
            <Icon
              name="credit-card-outline"
              style={{ width: 20, height: 20 }}
              fill="white"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "#eee",
            borderWidth: 1,
            borderTopRightRadius: 5,
            borderTopLeftRadius: 5,
            backgroundColor: "#099bdb",
          }}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{ color: "white", textTransform: "uppercase" }}
              category="s1"
            >
              Sale Point Number
            </Text>
          </View>
          <View
            style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
          >
            {props.user.user && (
              <Text
                style={{ color: "white", textTransform: "uppercase" }}
                category="s1"
              >
                0000{props.user.user.id}
              </Text>
            )}
          </View>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    );
}

const mapStateToProps = (state) => {
  return {
      user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentDrawer);