import React from 'react'
/** Components */
import {View,Image} from 'react-native'
import {Text,useTheme} from '@ui-kitten/components'
export default ({title}) => {
    let theme = useTheme()
    return (
        <View style={{position:'relative'}}>
            <View style={{width:'100%',height:160}}>

            </View>
            <View style={{ position: 'absolute', left: 0, top: 0, height: 160, width: '100%', backgroundColor:'#42b4e6'}}>
                <Text style={{position:'absolute',left:0,bottom:10,width:'100%',textAlign:'center',color:'white'}} category="h2">{title}</Text>
            </View>
        </View>
    )
}