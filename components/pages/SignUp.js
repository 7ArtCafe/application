import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, TextInput, Button, TouchableOpacity, Alert  } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'


import firebseInit from '../../firebase/firebase'

new firebseInit()


export default function SignUn() {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true)
    // Usestate Initialisation
    const [user, setUser] = useState([])
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [phone, setPhone] = useState("")
    const [codePostal, setCP] = useState("")
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
    //   console.log(user)
      if (initializing) setInitializing(false);
    }

    function CreateUser(identifiant, passeword) {
        firebase.auth()
            .createUserWithEmailAndPassword(identifiant, passeword)
            .then(() => {
                console.log('User account created & signed in!');
                CreateUserInformation(firebase.auth().currentUser.uid)
                Actions.replace('rootStackScreen')
            })
            .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }

            console.error(error);
            });
    }

    function CreateUserInformation(id) {
        const date = new Date()
        let month = date.getMonth() + 1
        if (month < 10) month = "0" + month
        firebase.firestore()
        .collection("Users")
        .doc(id)
        .set({
            name: name,
            firstName: firstName,
            mail: identifiant,
            codePostal: codePostal,
            number: phone,
            //format date-inscription = JJ/MM/YYYY
            "date-inscription": `${date.getDate()}/${month}/${date.getFullYear()}`
            
        }, { merge: true });
    }

    function GetUser() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User email: ', user.email);
            }
          });
    }
  
    if (initializing) return null;
  
    return (
        <View style={[tailwind("pt-20"), styles.container]}>
            <View style={styles.boxSign}>

                {/* FirstName and Name */}
                <Text style={tailwind('pb-1')}>Nom</Text>
                <TextInput
                    onChangeText={(textName) =>
                        setName(textName)
                    }
                    value={name}
                    placeholder="tapez votre Nom"
                    placeholderTextColor="white"
                    style={[tailwind('text-left'), styles.input]}
                />

                <Text style={tailwind('pb-1')}>Prénom</Text>
                <TextInput
                    onChangeText={(textFirstName) =>
                        setFirstName(textFirstName)
                    }
                    value={firstName}
                    placeholder="tapez votre prénom"
                    placeholderTextColor="white"
                    style={[tailwind('text-left'), styles.input]}
                />

                <Text style={tailwind('pb-1')}>Téléphone</Text>
                <TextInput
                    onChangeText={(textNumber) =>
                        setPhone(textNumber)
                    }
                    value={phone}
                    placeholder="tapez votre prénom"
                    placeholderTextColor="white"
                    style={[tailwind('text-left'), styles.input]}
                />

                <Text style={tailwind('pb-1')}>Code postal</Text>
                <TextInput
                    onChangeText={(textCp) =>
                        setCP(textCp)
                    }
                    value={codePostal}
                    placeholder="tapez votre prénom"
                    placeholderTextColor="white"
                    style={[tailwind('text-left'), styles.input]}
                />
                
                {/* Login */}
                <Text style={tailwind('pb-2 mt-8')}>E-mail</Text>
                <TextInput
                    onChangeText={(textMail) =>
                        setIdentifiant(textMail)
                    }
                    value={identifiant}
                    placeholder="tapez votre adresse mail"
                    placeholderTextColor="white"
                    style={[tailwind('text-left'), styles.input]}
                    />
                    
                {/* Password */}
                <Text style={tailwind("mt-4 pb-2")}>Mot de passe</Text>
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
                    onPress={() => CreateUser(identifiant, password)}
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