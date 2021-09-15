import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight,TextInput,Button  } from 'react-native';
import tailwind from 'tailwind-rn';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Sandwiches from './FoodsSandwiches'
import NavigationFoods from "./NavigationFoods";

const Foods = () => {

    return(
        <NavigationFoods/>
    )
}

export default Foods

const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'Montserrat',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor : '#A6E4D0',
    },
    topbody:{
      marginTop: 75,
    },
    containerProduit:{
        backgroundColor: 'red'
    }
});
