import React from 'react'
/** Components */
import {View,TouchableOpacity} from 'react-native'
import {
    Layout, Text, useTheme, TopNavigation,Icon,TopNavigationAction} from '@ui-kitten/components'
export default ({navigation}) => {
    let theme = useTheme()

    const LeftBtn = (props) => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon {...props} fill="black" name={"arrow-ios-back-outline"} />
        </TouchableOpacity>
    );
    const LeftBtnAction = () => <TopNavigationAction icon={LeftBtn} />;


    /** Header */
    let Header = () => <TopNavigation accessoryLeft={LeftBtnAction} title={"About Us "} />;
    return (
        <Layout style={{ flex: 1 }}>
            <Header />
            <View style={{padding:30}}>
                <Text category="s1" style={{color:theme['text-hint-color']}}>Al-ManaseerCard</Text>
                <Text style={{paddingTop:30}}>
                    Al-ManaseerCard Sale Cards Online.
                </Text>
                <Text style={{paddingTop:10}}>
                    Buy Online Digital Card With Al-ManaseerCard App, You can get cards From Your Wallet Amount.
                </Text>
            </View>
        </Layout>
    )
}