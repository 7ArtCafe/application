import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TouchableOpacity, TouchableHighlight,TextInput,Button  } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import tailwind from 'tailwind-rn';
import firebase from 'firebase'
import firebseInit from '../../firebase/firebase'
import { Actions } from 'react-native-router-flux';

new firebseInit()

export default class Entertainment extends React.Component{

    state = {
      Shows: {
        id: [],
        date: []
      },
      CurrentDate: new Date(),
      images: [
        // require('../images/int-7art.jpg'),
        require('../images/scene.png'),
        require('../images/burger-home3.jpg')
      ]
    }

    constructor(props){
        super(props)
        let lstDate = []
        let lstID = []
        //const year permet de récuperer les deux dernier chiffre de l'année

        firebase.firestore()
            .collection("Entertainment")
            .doc("Shows")
            .collection("SundayShows")
            .where("date", ">=", this.state.CurrentDate)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                lstDate.push(new Date(doc.data().date.seconds*1000))
                lstID.push(doc.id)
              });
            })
            .then(() => {
              this.setState({
                Shows: {
                  id: lstID,
                  date: lstDate
                }
              })
            })
          // console.log("start 1 :", this.state.Shows.date)
        }

    getDateShows = () => {
      // console.log("start 3 :", this.state.Shows.date[0])
      return this.state.Shows.date.map((date, index) => {
        let day = date.getDate()
        if (day < 10){
          day = "0" + day
        }
        console.log("id : ", this.state.Shows.id[index])
        
        return (
            <View key={this.state.Shows.id[index]} style={[tailwind('h-32 mr-1 ml-1 w-24'),styles.boxShadow]}>
                <TouchableOpacity style={tailwind('bg-gray-400')} onPress={() => Actions.push("booking", this.state.Shows.id[index])}>
                    {/* Jour du show */}
                    <View style={tailwind('h-4/6 pt-1')}>
                        <Text style={tailwind('text-center pt-4 font-bold text-4xl')}>{day}</Text>
                    </View>
                    {/* Prix du show */}
                    <View style={tailwind('h-2/6 bg-white pt-2')}>
                        <Text style={tailwind('text-center font-bold')}>Septembre</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
      })  
    }

    render(){
        return(
          <View style={styles.container}>
            <View >
                <SliderBox
                  images={this.state.images}
                  autoplay
                  circleLoop
                  // dotColor="#D2663E"
                  ImageComponentStyle={{borderRadius: 15, width: '90%', marginTop: 5, marginHorizontal: 20}}
                  imageLoadingColor="#2196F3"
                  />
            </View>
              <ScrollView style={styles.dates}>
                <View>
                  <Text style={tailwind("text-2xl mt-8 font-bold")}>LES SHOWS A VENIR</Text>
                </View>
                <View style={tailwind('flex-row wrap')}>
                  {this.getDateShows()}
                </View>
              </ScrollView>
          </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight+5
    },
    dates:{
      marginHorizontal: 20
      // alignItems:'center',
      // justifyContent:'center',
    },
    marginbody: {
      marginBottom: 55
    },
    scrollview: {
      backgroundColor: "red"
    },
    boxShadow:{
      borderRadius: 5,
      marginTop: 50,
      backgroundColor: "white",

      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6.68,

      elevation: 3,
  }
});