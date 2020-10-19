import React from 'react'
/** Components */
import {View} from 'react-native'
import {Spinner,useTheme,Text} from '@ui-kitten/components'
export default ({title}) => {
    let theme = useTheme()
    return (
        <View style={{position:'absolute',zIndex:109,backgroundColor:'rgba(0,0,0,0.04)',left:0,top:0,width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
            <Spinner status={'success'}></Spinner>
            {title &&
                <Text style={{ color: theme['text-success-color'], paddingTop: 3 }}>{title}</Text>
            }
        </View>
    )
}