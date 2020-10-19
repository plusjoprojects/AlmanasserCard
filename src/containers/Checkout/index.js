import React, { useState, useEffect } from "react";
/** Components */
import { View, ScrollView,Image,Dimensions,TouchableOpacity } from "react-native";
import {
  Layout,
  TopNavigation,
  Icon,
  Text,
  useTheme,
  Button,
  TopNavigationAction
} from "@ui-kitten/components";
import {env} from '../../constants'
import {apis} from '../../services'
import {AlertBox} from '../../components'
import {setCode} from '../../stores'
import { connect } from "react-redux";
import {translate} from '../../translations'
const Checkout = ({ categories, setSelectedSubCategories,navigation,user,setCode }) => {
  // Statics
  let theme = useTheme();
  let height = Dimensions.get('window').height
  let [lang, setLang] = useState(user.lang.title);
  let [qty,setQty] = useState(1)
  let [error,setError] = useState(null)

  let store = () => {
    setError(false)

    let amount = 0;
    let has_last = false
    let last_categories_id = 0
    if (categories.selected_last_categories == null) {
      amount = categories.selected_sub_category.amount
      has_last = false
      last_categories_id = 0
    } else {
      amount = categories.selected_last_categories.amount;
      has_last = true;
      last_categories_id = categories.selected_last_categories.id
    }
    //Payload 
    let payload = {
      categories_id: categories.selected_category.id,
      sub_categories_id: categories.selected_sub_category.id,
      user_id:user.user.id,
      amount:amount,
      has_last:has_last,
      last_categories_id
    }
    apis.order.store(payload,(res) => {
      // Switch the Methods
      let status = res.status;
      switch (status) {
        case 0:
          setError(translate('checkout.no_code',lang))
          break;
        case 1:
          //Success
          /**
           * First Set the Code
           */
          setCode(res.code)
          navigation.navigate('Code');
          break;
        case 2:
          setError(translate("checkout.no_amount", lang));
          break;
        default:
          break;
      }

    },err => {
      console.log(err.response)
    })

  }

  const LeftBtn = (props) => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon
        {...props}
        fill="black"
        name={
          lang == "en" ? "arrow-ios-back-outline" : "arrow-ios-forward-outline"
        }
      />
    </TouchableOpacity>
  );
  const LeftBtnAction = () => <TopNavigationAction icon={LeftBtn} />;
  /** Header */
  let Header = () => (
    <TopNavigation
      accessoryLeft={LeftBtnAction}
      style={{ backgroundColor: 'transparent' }}
      title={translate("checkout.checkout", lang)}
    />
  );
  /** End Header */

  /** Return And render */
  return (
    <Layout style={{ flex: 1 }}>
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri: env.server + "storage/" + categories.selected_category.image,
          }}
          style={{ width: "100%", height: height / 3 }}
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 103,
          }}
        >
          <Header />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ position: "relative", flex: 1 }}
      >
        <View
          style={{
            width: "100%",
            padding: 10,
            borderBottomColor: theme["text-hint-color"],
            borderBottomWidth: 1,
          }}
        >
          <Text category="s1" style={{ textAlign: "center" }}>
            {categories.selected_sub_category.title}{" "}
            {categories.selected_sub_category.SubTitle}
          </Text>
        </View>
        <View style={{ padding: 15 }}>
          <Text category="s2">
            {categories.selected_sub_category.description}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            paddingTop: 30,
            marginTop: 30,
            backgroundColor: theme["color-primary-transparent-100"],
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <Text style={{ textAlign: "center" }} category="h5">
            {translate("checkout.buy", lang)}
          </Text>
          <View
            style={{
              paddingTop: 40,
              paddingHorizontal: 15,
              flexDirection: "row",
            }}
          >
            <Text>{translate("checkout.brand", lang)} </Text>
            <Text category="s1">
              {categories.selected_sub_category.title}{" "}
              {categories.selected_sub_category.SubTitle}
            </Text>
          </View>
          {categories.selected_sub_category.multi == 1 && (
            <View
              style={{
                paddingTop: 5,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("code.type", lang)} </Text>
              <Text category="s1">
                {categories.selected_last_categories.title}{" "}
                {categories.selected_last_categories.SubTitle}
              </Text>
            </View>
          )}
          {categories.selected_last_categories == null ? (
            <View
              style={{
                paddingTop: 5,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("checkout.price", lang)} </Text>
              <Text category="s1">
                {categories.selected_sub_category.amount}JD
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingTop: 5,
                paddingHorizontal: 15,
                flexDirection: "row",
              }}
            >
              <Text>{translate("checkout.price", lang)} </Text>
              <Text category="s1">
                {categories.selected_last_categories.amount}JD
              </Text>
            </View>
          )}
          <View
            style={{
              paddingTop: 5,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>{translate("checkout.qty", lang)} </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View style={{ paddingHorizontal: 7 }}>
                <Text category="s1" style={{ fontSize: 18 }}>
                  {qty}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 30 }}></View>
          {error && <AlertBox status="danger" title={error} />}
          <Button
            onPress={() => {
              store();
            }}
            style={{ backgroundColor: "black" }}
            status="basic"
          >
            {(evaProps) => (
              <Text {...evaProps} style={{ color: "white" }}>
                {translate("checkout.confirm", lang)}
              </Text>
            )}
          </Button>
        </View>
      </ScrollView>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    user:state.user
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   setCode:item => dispatch(setCode(item))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
