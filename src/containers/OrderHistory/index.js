import React,{useState} from 'react'
/** Components */
import {View,ScrollView,TouchableOpacity} from 'react-native'
import {
    Layout,
    Text,
    TopNavigation,
    useTheme
} from '@ui-kitten/components'
import {connect} from 'react-redux'
import {translate} from '../../translations'
import {setSelectedCategories,setSelectedSubCategories,setCode} from '../../stores'
let OrderHistory =  ({user,setCode,setSelectedCategories,setSelectedSubCategories,navigation}) => {
    let theme = useTheme()
    let [lang,setLang] = useState(user.lang.title) 


    let OrderCard = ({ data }) => {

      if(data.code !== null) {
        return (
          <TouchableOpacity
            onPress={() => {
              setCode(data.code.code);
              setSelectedCategories(data.categories);
              setSelectedSubCategories(data.sub_categories);
              navigation.navigate("Code");
            }}
            style={{
              marginHorizontal: 5,
              marginVertical: 10,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderColor: "#aaa",
              borderWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: theme["color-primary-transparent-100"],
                padding: 10,
              }}
            >
              <Text>{translate("order_history.data", lang)}</Text>
              <Text>{data.created_at.substring(0, 10)}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text>{translate("order_history.code", lang)}</Text>
              <Text>{data.code.code}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text>{translate("order_history.categories", lang)}</Text>
              <Text>{data.categories.title}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text>{translate("order_history.type", lang)}</Text>
              <Text>
                {data.sub_categories.title} - {data.sub_categories.SubTitle}
              </Text>
            </View>

            {data.last_categories_id !== 0 && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>{translate("order_history.type", lang)}</Text>
                <Text>
                  {data.last_categories.title} - {data.last_categories.SubTitle}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      }else {
        return null;
      }
      
};

    return (
      <Layout style={{ flex: 1 }}>
        <TopNavigation title={translate("order_history.order_history", lang)} />
        {user.order_history.length == 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme["color-text-hint"] }}>
              {translate("order_history.no_codes", lang)}
            </Text>
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          {user.order_history.map((trg, index) => (
            <OrderCard data={trg} key={index} />
          ))}
        </ScrollView>
      </Layout>
    );
}

const mapStateToProps = (state) => {
    return {
        user:state.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setCode: item => dispatch(setCode(item)),
        setSelectedCategories: item => dispatch(setSelectedCategories(item)),
        setSelectedSubCategories: item => dispatch(setSelectedSubCategories(item)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);