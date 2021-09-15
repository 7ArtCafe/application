import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'

import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import NavigationAuth from './components/pages/NavigationAuth';
import RootStackScreen from './components/pages/RootStackScreen';
import LoadingScreen from './components/pages/Loading';
import Booking from './components/pages/Booking';

export default function App() {
  return (
      <Router>
        <Scene key="Root">
          <Scene key="loading" component={LoadingScreen} initial={true} hideNavBar={true}></Scene>
          <Scene key="navigationAuth" component={NavigationAuth} hideNavBar={true}></Scene>
          <Scene key="signIn" component={SignIn} hideNavBar={true}></Scene>
          <Scene key="signUp" component={SignUp} hideNavBar={true}></Scene>
          <Scene key='rootStackScreen' component={RootStackScreen} hideNavBar={true}></Scene>
          <Scene key='booking' title="Réservation" component={Booking} back={true}></Scene>
        </Scene>
      </Router>
  );
}