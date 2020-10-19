import React from 'react'
/** Components */
import {View,Image,Dimensions,TouchableOpacity} from 'react-native'
import {useTheme,Text} from '@ui-kitten/components'
import {env} from '../../../constants'
export default ({data,onPress}) => {
    let height = Dimensions.get('screen').height
    let card_height = height / 3.5;
    let theme = useTheme()
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(data);
        }}
        style={{
          margin: 10,
          borderColor: theme["color-primary-transparent-100"],
          borderWidth: 0.5,
          borderRadius: 10,
        }}
      >
        <Image
          source={{ uri: env.server + "storage/" + data.image }}
          style={{ width: "100%", height: card_height, borderRadius: 10 }}
          resizeMode="stretch"
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "rgba(0,100,255,0.5)",
              paddingVertical: 5,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius:10,
              paddingHorizontal: 3,
            }}
          >
            <Text
              style={{
                color: theme["text-alternate-color"],
                textAlign: "center",
              }}
              category="s1"
            >
              {data.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}