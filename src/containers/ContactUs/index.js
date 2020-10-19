import React from 'react'
/** Components */
import {View,TouchableOpacity} from 'react-native'
import {
    Layout, Text, useTheme, TopNavigation,Icon,TopNavigationAction,Button,Input} from '@ui-kitten/components'
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
    let Header = () => <TopNavigation accessoryLeft={LeftBtnAction} title={"Contact Us "} />;

    let [data,setData] = React.useState({
        name:'',
        phone:'',
        email:'',
        message:''
    }) 

    return (
        <Layout style={{ flex: 1 }}>
            <Header />
            <View style={{padding:30}}>
                <Text category="s1" style={{color:theme['text-hint-color']}}>Al-ManaseerCard</Text>
                <Text style={{paddingTop:30}}>
                    Al-ManaseerCard Sale Cards Online.
                </Text>
                <View style={{ height: 15 }}></View>
                <Input
                    placeholder='Name'
                    value={data.name}
                    onChangeText={nextValue => setData({...data,name:nextValue})}
                />
                <Input
                    placeholder='Phone'
                    value={data.phone}
                    onChangeText={nextValue => setData({ ...data, phone: nextValue })}
                />
                <Input
                    placeholder='E-mail'
                    value={data.email}
                    onChangeText={nextValue => setData({ ...data, email: nextValue })}
                />
                <Input
                    placeholder='Message'
                    value={data.message}
                    onChangeText={nextValue => setData({ ...data, message: nextValue })}
                />
                <View style={{height:15}}></View>
                <Button status="primary">Send Message</Button>
            </View>
        </Layout>
    )
}

