import React from 'react'
/** Components */
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Layout, Text, TopNavigation,Input,Icon,useTheme,TopNavigationAction } from '@ui-kitten/components'
import { connect } from 'react-redux'
import {apis} from '../../services'
import {translate} from '../../translations'
import { Card } from './components'
import {setSelectedCategories} from '../../stores'
const Search = ({ navigation, setSelectedCategories, user }) => {
  let [searchInput, setSearchInput] = React.useState("");
  let [categories, setCategories] = React.useState([]);
  let [lang, setLang] = React.useState(user.lang.title);
  let theme = useTheme();
  let [once, setOnce] = React.useState(false);
  let onChangeText = (Text) => {
    setSearchInput(Text);
    setOnce(true);
    // Search Methods
    apis.search.index(
      Text,
      (res) => {
        setCategories(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
  };
  const renderIcon = (props) => <Icon {...props} name={"search"} />;

  let onPressCategory = (data) => {
    setSelectedCategories(data);
    navigation.navigate("CategoriesShow");
  };

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
      style={{ backgroundColor: "transparent" }}
      title={translate('search.title',lang)}
    />
  );
  /** End Header */
  return (
    <Layout style={{ flex: 1 }}>
      <Header />
      <View style={{ paddingHorizontal: 15 }}>
        <Input
          value={searchInput}
          placeholder={translate("search.search_for_cards", lang)}
          accessoryRight={renderIcon}
          onChangeText={(nextValue) => onChangeText(nextValue)}
        />
      </View>
      {!once && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Text
            category="s1"
            style={{ color: theme["text-hint-color"], textAlign: "center" }}
          >
            {translate("search.search_for_result", lang)}
          </Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((trg, index) => (
          <Card key={index} data={trg} onPress={onPressCategory} />
        ))}
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
        setSelectedCategories: item => dispatch(setSelectedCategories(item))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);