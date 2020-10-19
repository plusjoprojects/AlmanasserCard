import React,{useState} from 'react'
/** Components */
import { View, TouchableOpacity,ScrollView} from 'react-native'
import { Layout, Text, TopNavigation,} from '@ui-kitten/components'
import {Card} from './components'
import {connect} from 'react-redux' 
import { setSelectedCategories} from '../../stores'
import { translate } from "../../translations";
const Fav = ({ categories, user, setSelectedCategories,navigation}) => {
    let [lang, setLang] = useState(user.lang.title); 
    let onPressCategory = (data) => {
        setSelectedCategories(data);
        navigation.navigate("CategoriesShow");
    };
    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation title={translate("fav.title", lang)} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {user.fav.map((trg, index) => (
            <Card key={index} data={trg} onPress={onPressCategory} />
          ))}
        </ScrollView>
      </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        categories:state.categories,
        user:state.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedCategories: item => dispatch(setSelectedCategories(item))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fav);