import React from 'react'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDj9z6PflnS1tRXyfL1fe6C_XEk9WkBLzQ",
    authDomain: "artcafeapplication.firebaseapp.com",
    projectId: "artcafeapplication",
    storageBucket: "artcafeapplication.appspot.com",
    messagingSenderId: "1084365201107",
    appId: "1:1084365201107:web:420907f4db36ef8e4b7e26",
    measurementId: "G-4E3M9EB41Z"
};

export default class Firebase extends React.Component{
    constructor(props){
        super(props)
        this.initialisation()
    }
    initialisation = () => {
        if(firebase.apps.length === 0){
            firebase.initializeApp(firebaseConfig)
        }
    }
}