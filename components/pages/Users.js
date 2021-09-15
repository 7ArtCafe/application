import React, { useState, useEffect } from 'react';
import tailwind from 'tailwind-rn';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput, Button, TouchableOpacity, Alert  } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'firebase'

import Login from './SignIn'
import Register from './SignUp'
import firebseInit from '../../firebase/firebase'
import { Actions } from 'react-native-router-flux'


new firebseInit()


const Tab = createMaterialTopTabNavigator();

export default function NavigationFoods() {
    
    const db = firebase.firestore()
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [phone, setPhone] = useState("")
    const [codePostal, setCP] = useState("")
    const [mail, setMail] = useState("")

    useEffect(() => {
        db.collection("Users")
            .doc(firebase.auth().currentUser.uid)
            .onSnapshot(doc => {
                const data = doc.data()
                setName(data.name)
                setFirstName(data.firstName)
                setPhone(data.number)
                setCP(data.codePostal)
            })
        })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            setMail(user.email)
            // console.log(user.email)
            // console.log(GetUser)
        }
    })

    function logOut() {
        firebase.auth()
            .signOut()
        Actions.replace('signIn');
    }

    // function GetUser() {
    //     const userInfo = db.collection("Users")
    //         .where("mail", "==", mail)
    //         .onSnapshot(doc => {
    //             console.log(doc)
    //         })
    //     return userInfo
    // }

    function GetDate() {
        const date = new Date()
        let time = {
            'd+': date.getDate(),
            'M+': date.getMonth() + 1,
            'm+': date.getFullYear(),

        };
        console.log(time['M+'])
    }

    return (
        <View style={[tailwind("pt-4"), styles.container]}>
            <Text style={tailwind("mt-8 pb-2")}></Text>
            {GetDate()}
            <View style={styles.boxSign}>
          
            {/* Name */}
            <Text style={tailwind("mt-8 pb-2")}>Nom</Text>
            <TextInput
                placeholder={name}
                placeholderTextColor="black"
                // onChangeText={(text) =>
                //     setIdentifiant(text)
                // }
                // value={identifiant}
                style={[tailwind('text-left'), styles.input]}
                />
                
            {/* First Name */}
            <Text style={tailwind("mt-8 pb-2")}>Prénom</Text>
            <TextInput
                placeholder={firstName}
                style={[tailwind('text-left'), styles.input]}
                // onChangeText={(mdp) =>
                //     setPassword(mdp)
                // }
                // value={password}
                placeholderTextColor="black"
                secureTextEntry
            />
            {/* Code postal */}
            <Text style={tailwind("mt-8 pb-2")}>Code postal</Text>
            <TextInput
                placeholder={codePostal}
                style={[tailwind('text-left'), styles.input]}
                // onChangeText={(mdp) =>
                //     setPassword(mdp)
                // }
                // value={password}
                placeholderTextColor="black"
                secureTextEntry
            />

            {/* number */}
            <Text style={tailwind("mt-8 pb-2")}>Téléphone</Text>
            <TextInput
                placeholder={phone}
                style={[tailwind('text-left'), styles.input]}
                // onChangeText={(mdp) =>
                //     setPassword(mdp)
                // }
                // value={password}
                placeholderTextColor="black"
                secureTextEntry
            />


            {/* Mail */}
            <Text style={tailwind("mt-8 pb-2")}>Mail</Text>
            <TextInput
                placeholder={mail}
                style={[tailwind('text-left'), styles.input]}
                // onChangeText={(mdp) =>
                //     setPassword(mdp)
                // }
                // value={password}
                placeholderTextColor="black"
                secureTextEntry
            />


            {/* Deconnection button */}
            <View style={tailwind('mt-8')}>
                <Button
                    onPress={() => logOut()}
                    title="Déconnection"
                />
            </View>
            {/* <TouchableOpacity
                style={tailwind("mt-10 ml-14 bg-black w-7/12 h-8 rounded-full")}
                // onPress={() => GetUser()}
            >
                <Text style={tailwind('text-white text-center text-lg')}>Modifié</Text>
            </TouchableOpacity> */}

            </View>    
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex:1
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