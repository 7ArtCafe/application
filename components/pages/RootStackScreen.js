import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight,TextInput,Button  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from './home'
import FoodScreen from './foods'
import Users from './Users'
import Entertainement from './Entertainment'


const Tab = createBottomTabNavigator();

export default function RootStackScreen() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style:{
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 60,
            backgroundColor: '#242526'
          }
          
        }}
      >
        <Tab.Screen 
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                <Image
                  source={require('../images/home.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#EC602C' : '#839EA7'
                  }}
                />
                <Text style={{color: focused ? '#EC602C' : '#839EA7', fontSize: 12}}>Accueil</Text>
              </View>
            )
          }}
        />

        <Tab.Screen 
          name="Foods"
          component={FoodScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                <Image
                  source={require('../images/carte.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#EC602C' : '#839EA7'
                  }}
                />
                <Text style={{color: focused ? '#EC602C' : '#839EA7', fontSize: 12}}>Carte</Text>
              </View>
            )
          }}
        />
        
        <Tab.Screen 
          name="Divertissement"
          component={Entertainement}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                <Image
                  source={require('../images/entertainement.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#EC602C' : '#839EA7'
                  }}
                />
                <Text style={{color: focused ? '#EC602C' : '#839EA7', fontSize: 12}}>Shows</Text>
              </View>
            )
          }}
        />

        <Tab.Screen 
          name="Users"
          component={Users}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 3}}>
                <Image
                  source={require('../images/user.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#EC602C' : '#839EA7'
                  }}
                />
                <Text style={{color: focused ? '#EC602C' : '#839EA7', fontSize: 12}}>Utilisateur</Text>
              </View>
            )
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}