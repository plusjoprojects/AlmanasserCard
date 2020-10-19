import React from 'react'
/** Components */
import {View,} from 'react-native'
import {useTheme,Text} from '@ui-kitten/components'
export default ({status,title}) => {
    let theme = useTheme()
    let _get_color = () => {
        switch (status) {
            case 'success':
                return {
                  color: "color-success-300",
                  nextColor: "color-success-500",
                };
            case 'danger':
                return {
                  color: "color-danger-300",
                  nextColor: "color-danger-500",
                };
            default:
                return {
                  color: "color-success-300",
                  nextColor: "color-success-500",
                };
        }
    }
    return (
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: theme[_get_color().color],
          borderLeftColor: theme[_get_color().nextColor],
          borderLeftWidth: 5,
          borderTopLeftRadius: 2,
          borderBottomLeftRadius: 2,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          marginBottom: 5,
        }}
      >
        <Text style={{ color: "white" }} category="s2">
          {title}
        </Text>
      </View>
    );
}