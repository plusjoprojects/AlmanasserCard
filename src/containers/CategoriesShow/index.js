import React, { useState, useEffect } from "react";
/** Components */
import { View, ScrollView,TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
  Layout,
  TopNavigation,
  Icon,
  Text,
  useTheme,
  TopNavigationAction
} from "@ui-kitten/components";
import {Card} from './components'
import { apis } from "../../services";
import { setCategories,setSelectedSubCategories,setLastCategories } from "../../stores";
import { connect } from "react-redux";
import {translate} from '../../translations'
const CategoriesShow = ({
  categories,
  setSelectedSubCategories,
  navigation,
  user,
  setLastCategories,
}) => {
  let [lang, setLang] = useState(user.lang.title);
  let [type, setType] = useState(0);
  let [lastCategories, setLastCategoriesx] = useState([]);
  // Statics
  let theme = useTheme();
  let fav_list = user.fav;
  let [fav, setFav] = useState(false);

  /** on Press Sub Categories */
  let onPressSubCategories = (data) => {
    // The Selected have to options
    // Options1 : Normal without multi choise
    // Options2 : With Select Other Options

    if (data.multi == 0) {
      setSelectedSubCategories(data);
      setLastCategories(null)
      navigation.navigate("Checkout");
    } else {
      setType(1);
      setSelectedSubCategories(data);
      setLastCategoriesx(data.last_categories);
    }
  };

  let onPressLastCategories = (data) => {
    setLastCategories(data)
    navigation.navigate("Checkout");

  };

  let check_heart = () => {
    // Check if the heart is on
    fav_list.forEach((trg, index) => {
      if (trg.id == categories.selected_category.id) {
        setFav(true);
      }
    });
  };

  let press_heart = async () => {
    // Let Heart
    if (!fav) {
      let fav_storage = await AsyncStorage.getItem("fav");
      if (!fav_storage) {
        let x = [];
        x.push(categories.selected_category);
        await AsyncStorage.setItem("fav", JSON.stringify(x));
      } else {
        let x = JSON.parse(fav_storage);
        x.push(categories.selected_category);
        await AsyncStorage.setItem("fav", JSON.stringify(x));
      }
      setFav(true);
    } else {
      let x = [];
      fav_list.forEach((trg, index) => {
        if (trg.id == categories.selected_category.id) {
        } else {
          x.push(trg);
        }
      });
      await AsyncStorage.setItem("fav", JSON.stringify(x));
      setFav(false);
    }
  };

  useEffect(() => {
    check_heart();
  }, []);

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

  const RightBtn = (props) => (
    <TouchableOpacity
      onPress={() => {
        press_heart();
      }}
    >
      <Icon {...props} fill="pink" name={fav ? "heart" : "heart-outline"} />
    </TouchableOpacity>
  );
  const RightBtnAction = () => <TopNavigationAction icon={RightBtn} />;

  /** Header */
  let Header = () => (
    <TopNavigation
      accessoryLeft={LeftBtnAction}
      accessoryRight={RightBtnAction}
      title={translate("main.categories", lang)}
    />
  );
  /** End Header */

  /** Return And render */
  return (
    <Layout style={{ flex: 1 }}>
      <Header />
      {type == 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
            <Text style={{ color: theme["color-text-hint"] }}>
              {translate("main.select_type", lang)}
            </Text>
          </View>
          {categories.selected_category.sub_categories.map((trg, index) => (
            <Card
              lang={lang}
              key={index}
              data={trg}
              onPress={onPressSubCategories}
            />
          ))}
        </ScrollView>
      )}

      {type == 1 && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
            <Text style={{ color: theme["color-text-hint"] }}>
              {translate("main.select_type", lang)}
            </Text>
          </View>
          {lastCategories.map((trg, index) => (
            <Card
              lang={lang}
              key={index}
              data={trg}
              onPress={onPressLastCategories}
            />
          ))}
        </ScrollView>
      )}
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
    setCategoriesGlobal: (item) => dispatch(setCategories(item)),
    setSelectedSubCategories: (item) =>
      dispatch(setSelectedSubCategories(item)),
    setLastCategories: (item) => dispatch(setLastCategories(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesShow);
