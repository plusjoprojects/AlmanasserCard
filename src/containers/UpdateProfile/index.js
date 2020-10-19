import React from "react";
/** Components */
import { View, TouchableOpacity,ScrollView } from "react-native";
import {
  Layout,
  Text,
  useTheme,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Button,
  Input,
} from "@ui-kitten/components";
import AlertBox from '../../components/AlertBox'
import {connect} from 'react-redux'
import apis from "../../services/apis";
let UpdateProfile = ({ user,navigation }) => {
  let theme = useTheme();
  let _user = user.user;


  const LeftBtn = (props) => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon {...props} fill="black" name={"arrow-ios-back-outline"} />
    </TouchableOpacity>
  );
  const LeftBtnAction = () => <TopNavigationAction icon={LeftBtn} />;
  /** Header */
  let Header = () => (
    <TopNavigation accessoryLeft={LeftBtnAction} title={"Update Password "} />
  );

  let [data, setData] = React.useState({
    oldPassword:'',
    newPassword:''
  });
  let [error,setError] = React.useState(false)
  let save = () => {
    let id = _user.id
    let _data = {...data,id:id}
    apis.auth.update(_data,(res) => {
      alert('update success')
      navigation.goBack()
    },(err) => {
      setError(true)
    })
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={{ padding: 30 }}>
        <Text category="s1" style={{ color: theme["color-primary-300"] }}>
          Update password
        </Text>
        <Input
          placeholder={"Old Password"}
          value={data.oldPassword}
          onChangeText={(nextValue) =>
            setData({ ...data, oldPassword: nextValue })
          }
        />
        <View style={{ height: 10 }}></View>
        <Input
          placeholder={"NewPassword"}
          value={data.newPassword}
          secureTextEntry={true}
          onChangeText={(nextValue) =>
            setData({ ...data, newPassword: nextValue })
          }
        />
        <View style={{ height: 10 }}></View>
        {error && (
          <AlertBox status="danger" title="There Are error in the password" />
        )}
        <Button
          status={"success"}
          onPress={() => {
            save();
          }}
        >
          Save
        </Button>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);