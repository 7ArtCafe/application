import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight,TextInput,Button  } from 'react-native';
// import { useParams } from 'react-router';
import tailwind from 'tailwind-rn';
// import axios from "axios";

const Footer = () =>  {
    let lstManga = []
    let contenu = ""
    contenu = (
      <View  key={contenu} style={{marginLeft:"auto",marginRight:"auto",width:"100%",backgroundColor:"#79B791",position:"absolute",bottom:"0%",paddingTop:"3%"}} >
      <View style={{flexDirection:"row", marginLeft:"auto",marginRight:"auto",paddingTop:"0%",paddingBottom:"3%"}}>
      {/* <Image style={tailwind('w-1/5 h-14 mr-8')} source={require('../Images/HikomoriBlackLogo.png')} /> */}
 
        
      <TouchableHighlight onPress={() =>
            //permet daller à la page Details Manga
            navigate('Home')
            
         }>
           <View style={tailwind(' pr-5  ')}>
               {/* <Image style={tailwind('w-8 h-8 mx-1')} source={require('../Images/login.png')} alt={'image'}/> */}
               <Text style={tailwind('mx-1')}>Home</Text>
           </View>
       </TouchableHighlight>
    

       <TouchableHighlight onPress={() =>
            //permet daller à la page Details Manga
            navigate('Foods')
            
         }>
          <View style={tailwind(' pl-5  pr-5')}>
          {/* <Image style={tailwind('w-8 h-8 mx-1')} source={require('../Images/epingle.png')} alt={'image'}/> */}
          <Text style={tailwind('mx-1')}>Foods</Text>
          </View>
       </TouchableHighlight>

       <TouchableHighlight onPress={() =>
            //permet daller à la page Details Manga
            navigate('CodeScanner')
            
         }>
       <View style={tailwind('pl-5  pr-5')}>
       {/* <Image style={tailwind('w-8 h-8 mx-1')} source={require('../Images/qr-code.png')} alt={'image'}/> */}
       <Text style={tailwind('mx-1')}>Scan</Text>
       </View>
       </TouchableHighlight>
 
     </View>
   </View>
    )

   lstManga.push(contenu)
    return lstManga
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
  });

  export default Footer;