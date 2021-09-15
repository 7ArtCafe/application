import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, TouchableHighlight,TextInput,Button, FlatList } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import tailwind from 'tailwind-rn';
import firebase from 'firebase'

import firebseInit from '../../firebase/firebase'

new firebseInit()

export default class Home extends React.Component{

  state = {
    SandwichSpeciaux:{
      name: [],
      description: [],
      price: []
    },
    images: [
      require('../images/int-7art.jpg'),
      require('../images/scene.png'),
      require('../images/burger-home.jpg')
    ]
  }

  constructor(props) {
    super(props)

    let lstName = []
    let lstDescription = []
    let lstPrice = []
    firebase.firestore()
            .collection("Menus")
            .doc("9jFDG5n62PFkckn9XOUg")
            .collection("Spéciaux")
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
                  SandwichSpeciaux: {
                        name: lstName,
                        description: lstDescription,
                        price: lstPrice
                    },
                })
              })
  }

  ListSandwichSpéciaux = () =>{
    return this.state.SandwichSpeciaux.name.map((speciaux, index) => {
      return (
          <View key={index} style={[tailwind('h-32 w-5/12 rounded-md ml-2 mr-2 flex-col bg-gray-400'),styles.boxShadow]}>

              {/* <View style={tailwind('w-1/12 ml-4 mt-12')}>
                  <Image style={tailwind('h-16 w-full')} source={require('../images/sandwich.png')} alt={'image'} />
              </View> */}

              <View style={tailwind('h-32')}>
                  {/* nom burger */}
                  <View style={tailwind('h-2/6 pt-1')}>
                      <Text style={tailwind('text-center font-bold text-xl')}>{speciaux}</Text>
                  </View>
                  {/* description ingrédient */}
                  <View style={tailwind('h-2/6 pt-1')}>
                      <Text style={tailwind('text-center')}>{this.state.SandwichSpeciaux.description[index]}</Text>
                  </View>
                  <View style={tailwind('h-2/6 pt-2 pr-4')}>
                      <Text style={tailwind('text-right')}>Prix : 7€</Text>
                  </View>
              </View>

          </View>
      )
    })
  }

  render(){
      return(
          <View style={styles.topbody}>
              <SliderBox
                images={this.state.images}
                autoplay
                circleLoop
                // dotColor="#D2663E"
                ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
                imageLoadingColor="#2196F3"
              />
              <View style={styles.marginbody}>
                
                <View>
                  <Text style={tailwind("text-2xl mt-14 font-bold")}>NOS SIGNATURES</Text>
                  <Text style={tailwind("mb-6")}>Venez essayer nos sandwiches signatures</Text>
                </View>

                <FlatList data={this.state.SandwichSpeciaux.name}></FlatList>
                <ScrollView 
                horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  // pagingEnabled={true}
                  style={tailwind("w-12/12")}
                >
                  {this.ListSandwichSpéciaux()}
                </ScrollView>

              </View>

          </View>
      )
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'Montserrat',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor : '#A6E4D0',
    },
    topbody:{
      marginTop: 25,
    },
    marginbody: {
      marginHorizontal: 15,
      marginBottom: 55
    },
    scrollview: {
      backgroundColor: "red"
    }
});
