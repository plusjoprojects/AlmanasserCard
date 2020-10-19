import * as React from "react";

import {
  Button,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import ContentDrawer from "../components/ContentDrawer";
import Main from "../containers/Main";
import Aboutus from '../containers/Aboutus'
import ContactUs from '../containers/ContactUs'
import Reports from '../containers/Reports'
import {translate} from '../translations'
import {connect} from 'react-redux'
const Drawer = createDrawerNavigator();

const DrawerNavigation = ({user}) => {
  let [lang, setLang] = React.useState(user.lang.title);
  return (
    <Drawer.Navigator
      initialRouteName={translate("drawer.main", lang)}
      drawerContent={(props) => <ContentDrawer {...props} />}
    >
      <Drawer.Screen name={translate("drawer.main", lang)} component={Main} />
      <Drawer.Screen
        name={translate("drawer.reports", lang)}
        component={Reports}
      />
      <Drawer.Screen
        name={translate("drawer.about_us", lang)}
        component={Aboutus}
      />
      <Drawer.Screen
        name={translate("drawer.contact_us", lang)}
        component={ContactUs}
      />
    </Drawer.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {

  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigation);