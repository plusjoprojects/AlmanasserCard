import { Icon, Text,useTheme, } from '@ui-kitten/components';
import React from 'react'
import { View,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
let ListItem = ({ icon, title, divider = false, leftIcon = true, size = 18, onPress,}) => {
    let theme = useTheme()
    return (
      <TouchableOpacity onPress={() => {onPress()}} style={{ flexDirection: "row", padding: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 2 }}>
          {icon && (
            <Icon
              name={icon}
              fill={theme["text-hint-color"]}
              style={{ width: 24, height: 24 }}
            />
          )}
          <Text
            style={{
              fontSize: size,
              color: theme["text-hint-color"],
              marginHorizontal: 15,
            }}
          >
            {title}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {leftIcon && (
            <Icon
              name={"chevron-right-outline"}
              fill={theme["text-hint-color"]}
              style={{ width: 24, height: 24 }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);