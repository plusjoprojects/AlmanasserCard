import React,{useState} from 'react'
/** Components */
/** Components */
import { View, SafeAreaView, ScrollView } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";
import * as Components from './Components'
import {translate} from '../../translations'
const Settings = ({user,navigation}) => {


    let [lang, setLang] = useState(user.lang.title);

    let sign_out = async () => {
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('Login')
        } catch (error) {

        }
    }
    let Auth = () => (
      <>
        <Components.ListItem
          title={user.user.name}
          onPress={() => {}}
          icon="person-outline"
        />
        <Components.ListItem
          title={user.user.phone}
          onPress={() => {}}
          icon="phone-outline"
        />
        <Components.ListItem
          title={user.user.wallet.amount + "JD"}
          onPress={() => {}}
          icon="award-outline"
        />
        <Components.ListItem
          onPress={() => {
            navigation.navigate("UpdateProfile");
          }}
          title={translate("settings.update_profile", lang)}
          icon="person-done-outline"
        />
        <Components.ListItem
          onPress={() => {
            sign_out();
          }}
          title={translate("settings.logout", lang)}
          icon="log-out-outline"
        />
      </>
    );
    return (
      <Layout style={{ flex: 1 }}>
        <Components.Header title={translate("settings.settings", lang)} />
        <ScrollView
          contentContainerStyle={{ padding: 30, paddingHorizontal: 15 }}
        >
          <Auth />
          <View style={{ marginTop: 30 }}>
            <Text category="h6" style={{ marginBottom: 20, textAlign: "left" }}>
              {translate("settings.general_settings", lang)}
            </Text>
            <Components.ListItem
              onPress={() => {
                navigation.navigate("Language");
              }}
              title={translate("settings.language", lang)}
              icon="globe-outline"
            />
          </View>
        </ScrollView>
      </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        Logout: () => dispatch(Logout()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);