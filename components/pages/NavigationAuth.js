import React from "react";
import tailwind from 'tailwind-rn';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Tab = createMaterialTopTabNavigator();

export default function NavigationAuth() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                tabBarOptions={{
                    style:{
                        top: StatusBar.currentHeight,
                        backgroundColor: 'white'
                    }
                }}>
                <Tab.Screen
                    name="SignIn"
                    component={SignIn}
                    tabBarShowLabel={false}
                    
                />
                <Tab.Screen
                    name="SignUp"
                    component={SignUp}
                    tabBarShowLabel={false}
                    
                />

            </Tab.Navigator>
        </NavigationContainer>
    );
}