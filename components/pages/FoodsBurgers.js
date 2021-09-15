import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableHighlight,TextInput,Button  } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import firebseInit from '../../firebase/firebase'

new firebseInit()

export default class BurgersScreen extends React.Component{

    state = {
        Burgers: {
            name: [],
            description: [],
            price: []
        },
        loading: true
    }

    constructor(props){
        super(props)
        let lstName = []
        let lstDescription = []
        let lstPrice = []
        firebase.firestore()
                .collection("Menus")
                .doc("9jFDG5n62PFkckn9XOUg")
                .collection("Burgers")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        lstName.push(doc.data().name)
                        lstDescription.push(doc.data().description)
                        lstPrice.push(doc.data().price)
                    });
                })
                .then(() => {
                    this.setState({
                        Burgers: {
                            name: lstName,
                            description: lstDescription,
                            price: lstPrice
                        },
                    })
                  })
    }

    getBurgers() {
        return this.state.Burgers.name.map((burgerName, index) => {

            return(
                <View style={[tailwind('h-32 w-full flex-row'),styles.boxShadow]}>
                    <View style={tailwind('w-2/12 ml-4 mt-16')}>
                        <Image style={tailwind('h-12 w-full')} source={require('../images/burger7Art.png')} alt={'image'} />
                    </View>
                    <View style={tailwind('h-32 w-9/12')}>
                        {/* nom burger */}
                        <View style={tailwind('h-2/6 pt-1')}>
                            <Text style={tailwind('text-center font-bold text-xl')}>{burgerName}</Text>
                        </View>
                        {/* description ingrédient */}
                        <View style={tailwind('h-2/6 pt-1')}>
                            <Text style={tailwind('text-center')}>{this.state.Burgers.description[index]}</Text>
                        </View>
                        <View style={tailwind('h-2/6 pt-2 pr-4')}>
                            <Text style={tailwind('text-right')}>Prix : {this.state.Burgers.price[index]}</Text>
                        </View>
                    </View>
                </View>
            )
        })
    }
    

    render(){ 
        return(

            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <Image style={tailwind('h-48 w-full rounded')} source={require('../images/burger-home.jpg')} alt={'image'} />

                    {this.getBurgers()}

                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight+5,
    },
    boxShadow:{
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: "white",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.68,

        elevation: 3,
    },
    scrollView: {
        marginHorizontal: 15,
        marginBottom: 90

    }
});

