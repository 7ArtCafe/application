import React from "react";
import tailwind from 'tailwind-rn';
import { StatusBar, View, Text } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Burgers from './FoodsBurgers'
import Sandwiches from './FoodsSandwiches'
import Pizzas from './FoodsPizza'

const Tab = createMaterialTopTabNavigator();

export default function NavigationFoods() {
    return (

            <Tab.Navigator 
                tabBarOptions={{
                    style:{
                        top: StatusBar.currentHeight,
                        backgroundColor: '#242526'
                    }
                }}>
                <Tab.Screen
                    name="Burgers"
                    component={Burgers}
                    options={{
                        tabBarLabel: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                              <Text style={{color: focused ? '#F59C1C' : '#fff', fontSize: 15}}>Burgers</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Sandwiches"
                    component={Sandwiches}
                    options={{
                        tabBarLabel: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                              <Text style={{color: focused ? '#F59C1C' : '#fff', fontSize: 15}}>Sandwiches</Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen
                    name="Pizzas"
                    component={Pizzas}
                    options={{
                        tabBarLabel: ({focused}) => (
                            <View style={{alignItems: 'center', justifyContent: 'center',}}>
                              <Text style={{color: focused ? '#F59C1C' : '#fff', fontSize: 15}}>Pizzas</Text>
                            </View>
                        )
                    }}
                />

            </Tab.Navigator>
    );
}