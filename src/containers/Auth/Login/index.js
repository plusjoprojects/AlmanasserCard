import React,{useState} from 'react'
/** Components */
import {View,Image,ImageBackground} from 'react-native'
import { Layout, Text, useTheme, Input,Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-community/async-storage";
import {AlertBox, Loader} from '../../../components'
import {apis} from '../../../services'
import { connect } from "react-redux";
import {setUser} from '../../../stores'
const Login = ({ navigation, setUserGlobal }) => {
  let [user, setUser] = useState({
    phone: "",
    password: "",
  });
  let [loader, setLoader] = useState(false);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);

  let login = () => {
    setLoader(true);
    setError(null);
    setSuccess(null);
    apis.auth.login(
      user,
      async (res) => {
        let token = res.token;
        let user = res.user;
        setUserGlobal(user);
        try {
          await AsyncStorage.setItem("token", token);
        } catch (error) {}
        setSuccess("Login Success");
        setLoader(false);
        setTimeout(() => {
          navigation.navigate("MainNavigation");
        }, 1000);
      },
      (err) => {
        setLoader(false);
        setError("There are error in the Phone/Password");
      }
    );
  };
  return (
    <ImageBackground
      source={require("../../../assets/Auth/background.jpg")}
      style={{ flex: 1 }}
    >
      <Layout
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        {loader && <Loader />}
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: "100%", height: 98 }}
          resizeMode="contain"
        />
        <View style={{ paddingTop: 75, width: "100%", paddingHorizontal: 30 }}>
          <Input
            placeholder="Mobile Number"
            value={user.phone}
            onChangeText={(nextValue) => setUser({ ...user, phone: nextValue })}
          />
          <View style={{ height: 10 }}></View>
          <Input
            placeholder="Password"
            value={user.password}
            onChangeText={(nextValue) =>
              setUser({ ...user, password: nextValue })
            }
            secureTextEntry={true}
          />
          {error && <AlertBox status="danger" title={error} />}
          {success && <AlertBox status="success" title={success} />}
          <View style={{ height: 50 }}></View>

          <Button
            onPress={() => {
              login();
            }}
            status="basic"
            style={{ borderRadius: 30 }}
          >
            SIGN IN
          </Button>
        </View>
        <View
          style={{ position: "absolute", bottom: 20, left: 0, width: "100%" }}
        >
          <Text category="s2" style={{ textAlign: "center", color: "white" }}>
            Don't have account ? Contact us
          </Text>
        </View>
      </Layout>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUserGlobal: (item) => dispatch(setUser(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);