import React, { useState, useEffect } from "react";
/** Components */
import { View, ScrollView, TouchableOpacity, Clipboard } from "react-native";
import {
  Layout,
  TopNavigation,
  Icon,
  Text,
  useTheme,
  Button
} from "@ui-kitten/components";
import { setCategories, setSelectedSubCategories } from "../../stores";
import {translate} from '../../translations'
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
const CategoriesShow = ({
  categories,
  navigation,
  user
}) => {
  // Statics
  let theme = useTheme();
  let [lang, setLang] = useState(user.lang.title);

  let copy = () => {
    Clipboard.setString(categories.code);
  }
  /** Return And render */
  return (
    <Layout style={{ flex: 1 }}>
      <LinearGradient
        colors={["#A6C1FF", "#D9E4FF", "#D9E4FF"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: 10 }}>
          <View
            style={{
              borderColor: theme["color-primary-transparent-200"],
              borderWidth: 1,
              padding: 20,
              paddingVertical: 30,
              borderRadius: 5,
              backgroundColor: theme["color-primary-transparent-100"],
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: theme["color-success-200"],
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              {translate("code.you_get", lang)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                copy();
              }}
              style={{
                marginTop: 15,
                marginHorizontal: 5,
                paddingVertical: 15,
                backgroundColor: theme["color-success-500"],
                borderRadius: 5,
              }}
            >
              <Text
                category="h4"
                style={{ color: "white", textAlign: "center" }}
              >
                {categories.code}
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: "center" }} category="s2">
              {translate("code.press_to_copy", lang)}
            </Text>
            <View
              style={{
                paddingTop: 30,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("code.brand", lang)} </Text>
              <Text category="s1">{categories.selected_category.title}</Text>
            </View>
            <View
              style={{
                paddingTop: 5,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("code.type", lang)} </Text>
              <Text category="s1">
                {categories.selected_sub_category.title} -{" "}
                {categories.selected_sub_category.SubTitle}
              </Text>
            </View>
            <View
              style={{
                paddingTop: 5,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("code.qty", lang)} </Text>
              <Text category="s1">1</Text>
            </View>
            <View style={{ paddingTop: 15 }}>
              <Text style={{ textAlign: "center" }}>
                {translate("code.thank_message", lang)}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Icon
                name="printer-outline"
                fill={theme["color-primary-300"]}
                style={{ width: 64, height: 64 }}
              />
              <Text style={{ color: theme["text-hint-color"] }} category="s1">
                {translate("code.print", lang)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "100%", paddingHorizontal: 10, paddingTop: 20 }}>
          <Button>{translate("code.share", lang)}</Button>
          <View style={{ height: 5 }}></View>
          <Button
            status="basic"
            onPress={() => {
              navigation.navigate("BottomNavNavigation");
            }}
          >
            {translate("code.back_to_home", lang)}
          </Button>
        </View>
      </LinearGradient>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    categories:state.categories,
    user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesShow);
