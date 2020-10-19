import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import {
  useTheme,
  Layout,
  Text,
  CheckBox,
  TopNavigation,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import { translate, changeLanguage } from '../../translations'
import AsyncStorage from "@react-native-community/async-storage";
export default ({ navigation }) => {
  let [lang, setLang] = useState();
  // Set Language
  let setup_lang = async () => {
    const locale = await AsyncStorage.getItem("locale");
    if (!locale) {
      setLang("en");
      set_locale("en");
    } else {
      if (locale == "en") {
        setLang("en");
        set_locale("en");
      } else if (locale == "ar") {
        setLang("ar");
        set_locale("ar");
      }
    }
  };

  useEffect(() => {
    setup_lang();
  }, []);
  let [languages] = useState([
    { title: "English", lang: "en", isRtl: false },
    { title: "Arabic", lang: "ar", isRtl: true },
  ]);
  let [selectedIndex, setSelectedIndex] = useState(0);

  let press_lang = (data, index) => {
    setSelectedIndex(index);
    changeLanguage(data.lang, data.isRtl);
  };

  let set_locale = (locale) => {
    languages.forEach((trg, index) => {
      if (locale == trg.lang) {
        setSelectedIndex(index);
      }
    });
  };

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
     <TopNavigation accessoryLeft={LeftBtnAction} title={"Language"} />
   );
  return (
      <Layout style={{ flex: 1 }}>
        <Header />
        <View style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
          {languages.map((trg, index) => (
            <TouchableOpacity
              onPress={() => {
                press_lang(trg, index);
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
              }}
              key={index}
            >
              <CheckBox
                status={"success"}
                checked={selectedIndex == index ? true : false}
              ></CheckBox>
              <Text category="s1" style={{ marginHorizontal: 10 }}>
                {trg.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Layout>
  );
};
