import React,{useState,useEffect} from 'react'
/** Components */
import {View,ScrollView,TouchableOpacity,} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import {
  Layout,
  TopNavigation,
  Icon,
  Text,
  useTheme,
  TopNavigationAction,
} from "@ui-kitten/components";
import {Card} from './components'
import {apis} from '../../services'
import {
  setCategories,
  setSelectedCategories,
  setUser,
  setOrderHistory,
  setFav,
  SetLanguage,
} from "../../stores";
import { connect } from "react-redux";
import {translate} from '../../translations'

const Main = ({
  setCategoriesGlobal,
  setSelectedCategories,
  navigation,
  setUserGlobal,
  setOrderHistory,
  setFav,
  SetLanguage,
}) => {
  // Statics
  let theme = useTheme();
  let [categories, setCategories] = useState([]);
  let [otherCategories, setOtherCategories] = useState([]);
  let [lang, setLang] = useState("en"); // Language
  // Set Language
  let setup_lang = async () => {
    const locale = await AsyncStorage.getItem("locale");
    if (!locale) {
      setLang("en");
      SetLanguage({ title: "en", rtl: false });
    } else {
      if (locale == "en") {
        setLang("en");
        SetLanguage({ title: "en", rtl: false });
      } else if (locale == "ar") {
        setLang("ar");
        SetLanguage({ title: "ar", rtl: true });
      }
    }
  };

  let check_user = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      apis.auth.auth(
        token,
        (res) => {
          setUserGlobal(res.user);
          index_history(res.user.id);
        },
        (err) => {
          console.log(err.response);
        }
      );
    }

    let index_history = (id) => {
      apis.order.index(
        id,
        (res) => {
          setOrderHistory(res);
        },
        (err) => {
          console.log(err.response);
        }
      );
    };

    // Check Fav
    const fav_list = await AsyncStorage.getItem("fav");
    if (fav_list) {
      setFav(JSON.parse(fav_list));
    }
  };
  useEffect(() => {
    /** Fetch Axios Data */
    apis.main.index(
      (data) => {
        // Categories set
        setCategories(data.categories);
        setCategoriesGlobal(data.categories);
        setOtherCategories(data.other_categories)
      },
      (error) => {
        console.log(error);
      }
    );
    check_user();
    setup_lang();
  }, []);

  let onPressCategory = (data) => {
    setSelectedCategories(data);
    navigation.navigate("CategoriesShow");
  };

  /** Header */
  const LeftBtn = (props) => (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
    >
      <Icon {...props} fill="black" name={"menu-outline"} />
    </TouchableOpacity>
  );
  const LeftBtnAction = () => <TopNavigationAction icon={LeftBtn} />;

  /** Header Right Action */
  const RightBtn = (props) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Search");
      }}
    >
      <Icon {...props} fill="black" name={"search-outline"} />
    </TouchableOpacity>
  );
  const RightBtnAction = () => <TopNavigationAction icon={RightBtn} />;
  let Header = () => (
    <TopNavigation
      accessoryLeft={LeftBtnAction}
      accessoryRight={RightBtnAction}
      title={"Al-ManaseerCards"}
    />
  );
  /** End Header */

  /** Return And render */
  return (
    <Layout style={{ flex: 1 }}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text style={{ color: theme["color-text-hint"] }}>
            {translate("main.top_title", lang)}{" "}
          </Text>
        </View>
        {categories.map((trg, index) => (
          <Card key={index} data={trg} onPress={onPressCategory} />
        ))}
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text style={{ color: theme["color-text-hint"] }}>
            {translate("main.other_categories", lang)}{" "}
          </Text>
        </View>
        {otherCategories.map((trg, index) => (
          <Card key={index} data={trg} onPress={onPressCategory} />
        ))}
      </ScrollView>
    </Layout>
  );
};;

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCategoriesGlobal: (item) => dispatch(setCategories(item)),
    setSelectedCategories: (item) => dispatch(setSelectedCategories(item)),
    setUserGlobal: (item) => dispatch(setUser(item)),
    setOrderHistory: (item) => dispatch(setOrderHistory(item)),
    setFav: (item) => dispatch(setFav(item)),
    SetLanguage: (item) => dispatch(SetLanguage(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);