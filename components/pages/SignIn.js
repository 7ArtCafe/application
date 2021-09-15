import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput, Button, TouchableOpacity, Alert  } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'


import firebseInit from '../../firebase/firebase'

new firebseInit()

export default function SignIn() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true)
    // const navigation = useNavigation()
    const [user, setUser] = useState([])
    const [identifiant, setIdentifiant] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
  
    useEffect(() => {
      const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    function connection(identifiant, password){
        firebase.auth()
            .signInWithEmailAndPassword(identifiant, password)
            .then(() =>{
              Actions.replace('rootStackScreen')
            })
            .catch(error => {

              if (error.code === 'auth/user-not-found') {
                setErrorMessage("Cette adresse e-mail n'est pas valide")
              }

              if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email') {
                setErrorMessage("Le mot de passe ou l'adresse mail est incorrect")
              }
          
              // console.error(error.code);
            });
    }
  
    if (initializing) return null;
  
    return (
      <View style={[tailwind("pt-52"), styles.container]}>
        <View style={styles.boxSign}>
          
          {/* Login */}
          <Text style={tailwind('pb-2')}>E-mail</Text>
          <TextInput
              onChangeText={(text) =>
                  setIdentifiant(text)
              }
              value={identifiant}
              placeholder="tapez votre adresse mail"
              placeholderTextColor="white"
              style={[tailwind('text-left'), styles.input]}
              />
              
          {/* Password */}
          <Text style={tailwind("mt-8 pb-2")}>Mot de passe</Text>
          <TextInput
              placeholder="mot de passe"
              style={[tailwind('text-left'), styles.input]}
              onChangeText={(mdp) =>
                  setPassword(mdp)
              }
              value={password}
              placeholderTextColor="white"
              secureTextEntry
          />
          <Text style={tailwind('text-xs italic text-right text-blue-600')}>Mot de passe oublié</Text>

          <Text style={tailwind('mt-6 text-center text-red-400')}>{errorMessage}</Text>

          {/* Connection button */}
          <TouchableOpacity
            style={tailwind("mt-10 ml-14 bg-black w-7/12 h-8 rounded-full")}
            onPress={() => connection(identifiant, password)}
          >
            <Text style={tailwind('text-white text-center text-lg')}>Se connecter</Text>
          </TouchableOpacity>

        </View>    
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor : '#5E3F15',
  },
  boxSign: {
    marginHorizontal: 35,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 5
  },
  input: {
    backgroundColor: "rgba(94, 63, 21, 0.3)",
    height: 40,
    paddingLeft: 10,
    borderRadius: 10
  }
});