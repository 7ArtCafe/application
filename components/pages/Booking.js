import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity,TextInput,Button  } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import firebseInit from '../../firebase/firebase'

new firebseInit()

export default class Booking extends React.Component{
    
    state = {
        Show: {
            artists: [],
            nbPlaceRestante: 0,
            date: new Date(),
            prix: 0,
        },
        User: {
            name: "",
            firstName: "",
            phoneNumber: 0,
            mail: "",
            nbPers: 1
        },
        Artists: {
            artisteName: [],
            socialNetwork: [],
        }
    }
  
    constructor(props){
        super(props)
        let dateSeconde
        let lstArtists = []
        //const year permet de récuperer les deux dernier chiffre de l'année

        firebase.firestore()
                .collection("Entertainment")
                .doc("Shows")
                .collection("SundayShows")
                .doc(this.props.data)
                .onSnapshot(doc => {
                    dateSeconde = new Date(doc.data().date.seconds*1000)
                    this.setState({
                        Show: {
                            artists: doc.data().artists,
                            nbPlaceRestante: doc.data().nbPlace,
                            date: dateSeconde,
                            prix: doc.data().prix
                        }
                    })
                })
        firebase.firestore()
                .collection("Users")
                .doc(firebase.auth().currentUser.uid)
                .onSnapshot(doc => {
                    this.setState({
                        User: {
                            name: doc.data().name,
                            firstName: doc.data().firstName,
                            phoneNumber: doc.data().number,
                            mail: doc.data().mail,
                            nbPers: 1
                        }
                    })
                })
        this.state.Show.artists.map((artist) => {
            firebase.firestore()
                    .collection("Artistes")
                    .doc(artist)
                    .onSnapshot(doc => {
                        lstArtists.push(doc.data().artisteName)
                    })
                    this.setState({
                        Artists: {
                            artisteName: lstArtists
                        }
                    })
        })
        


        // console.log("start 1 :", this.state.Shows.date)
    }

    getDate = () => {
        let day = this.state.Show.date.toLocaleDateString()
        // console.log(this.state.Show.date)
        
        return (
            <View>
                <Text style={tailwind('text-center pt-4 font-bold text-4xl')}>{day}</Text>
            </View>
        )
    }

    getArtists = () => {
        this.state.Artists.artisteName.map((name) => {
            console.log("a")
        })
    }

    render(){
        return(
            <View>
                <View style={[tailwind(""), styles.container]}>                        
                        <View style={tailwind('bg-gray-200 h-24')}>
                            {this.getDate()}
                            {this.getArtists()}
                        </View>

                        <View style={tailwind('')}>
                            <Text style={tailwind("text-2xl mt-8 font-bold")}>LES ARTISTES PRESENT:</Text>
                            <View style={tailwind('pt-8 flex-row')}>
                                <View style={tailwind('bg-gray-700 rounded-xl w-5/12 h-8 ')}>
                                    <Text style={tailwind('text-white text-center text-lg')}>Fodjé Sisoko</Text>
                                </View>
                                <View style={tailwind('bg-gray-700 rounded-xl w-5/12 h-8 ml-14 ')}>
                                    <Text style={tailwind('text-white text-center text-lg')}>Nordine Ganso</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tailwind('')}>
                            {/* <Text>{this.state.Show.prix}</Text> */}
                        </View>
                        {/* <Text style={tailwind('text-center text-xl mt-8')}>159 Bis Rue Jean Jaures, 94800 Villejuif</Text> */}
                        <View style={tailwind('mt-48')}>
                            <TouchableOpacity
                                style={tailwind("mt-64 ml-16 bg-yellow-600 w-7/12 h-10 rounded-full")}
                            >
                                <Text style={tailwind('text-white text-center text-2xl')}>Réserver</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: StatusBar.currentHeight+5,
        backgroundColor : '#5E3F15',
        marginHorizontal: 20
    },
    boxSign: {
        marginHorizontal: 35,
        padding: 15,
        paddingTop: 20,
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