import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TouchableHighlight,TextInput,Button  } from 'react-native';
import { Actions } from 'react-native-router-flux'
import tailwind from 'tailwind-rn';
import PackageJson from '../../package.json'

const switchSignIn = () =>{
    Actions.replace('navigationAuth')
}

const LoadingScreen = () => {

    useEffect(() => {
        setTimeout(switchSignIn, 1000)
    })

    return(
        <View style={styles.container}>
            <View style={styles.logoCenter}>
                <Image style={tailwind('h-32 w-32')} source={require('../images/logo.png')} alt={'image'}/>
                <Text style={tailwind('mt-32 text-white')}>{PackageJson.version}</Text>
            </View>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor : '#5E3F15',
        paddingTop: StatusBar.currentHeight+300
    },
    topbody:{
      marginTop: 25,
    },
    logoCenter: {
      paddingLeft: 120,
    },
    scrollview: {
      backgroundColor: "red"
    }
});