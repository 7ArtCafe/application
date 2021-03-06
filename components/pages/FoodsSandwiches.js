import React, {useEffect, useState} from "react";
import axios from "axios";
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableHighlight, TextInput, Button

 } from 'react-native';
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import firebseInit from '../../firebase/firebase'

new firebseInit()

export default class Sandwiches extends React.Component{

    state = {
        Sandwiches: {
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
                .collection("Sandwiches")
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
                        Sandwiches: {
                            name: lstName,
                            description: lstDescription,
                            price: lstPrice
                        },
                    })
                  })
    }

    ListSandwiches = () =>{
        return this.state.Sandwiches.name.map((sandwich, index) => {
            return (
                <View key={index} style={[tailwind('h-32 w-full flex-row'),styles.boxShadow]}>
                    <View style={tailwind('w-2/12 ml-4 mt-12')}>
                        <Image style={tailwind('h-16 w-full')} source={require('../images/sandwich.png')} alt={'image'} />
                    </View>
                    <View style={tailwind('h-32 w-9/12')}>
                        {/* nom burger */}
                        <View style={tailwind('h-2/6 pt-1')}>
                            <Text style={tailwind('text-center font-bold text-xl')}>{sandwich}</Text>
                        </View>
                        {/* description ingr??dient */}
                        <View style={tailwind('h-2/6 pt-1')}>
                            <Text style={tailwind('text-center')}>{this.state.Sandwiches.description[index]}</Text>
                        </View>
                        <View style={tailwind('h-2/6 pt-2 pr-4')}>
                            <Text style={tailwind('text-right')}>Prix : 7???</Text>
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

                    <Image style={tailwind('h-48 w-full rounded')} source={require('../images/sandwiches-home.jpg')} alt={'image'} />
                    {this.ListSandwiches()}

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
