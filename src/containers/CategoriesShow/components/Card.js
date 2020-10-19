import React from 'react'
/** Components */
import {View,TouchableOpacity} from 'react-native'
import {useTheme,Text,Icon} from '@ui-kitten/components'
export default ({data,onPress,lang}) => {
    let theme = useTheme()
    return (
      <TouchableOpacity
        style={{
          margin: 10,
          padding: 15,
          borderRadius: 5,
          borderColor: theme["color-primary-transparent-400"],
          borderWidth: 1,
          backgroundColor: theme["color-primary-transparent-100"],
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems:'center'
        }}
        onPress={() => {
          onPress(data);
        }}
      >
        <Text style={{ color: theme["text-basic-color"], fontWeight: "bold" }}>
          {data.title} - {data.SubTitle}
        </Text>
        <Icon
          name={lang == 'en' ? 'arrow-ios-forward-outline':'arrow-ios-back-outline'} fill="black" style={{width:24,height:24}}
        />
      </TouchableOpacity>
    );
}