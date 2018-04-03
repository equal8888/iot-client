import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Warning,
  Alert,
  Vibration
} from 'react-native';

var base64 = require('base-64');
var encodedData = base64.encode();

//----------------- Render Style -----------------


export default class App extends React.Component {
    render() {
       return (

         <View style={styles.buttonstyle01}>
           <Text style={styles.txtstyle01}>
             IOT Control Panel
           </Text>
             <Button
               onPress={onButtonPress01}
               title="The Peace!"
               color="#175fd3"
               accessibilityLabel="ok1"
             />
             <Button
               onPress={onButtonPress02}
               title="The Finger!"
               color="#175fd3"
               accessibilityLabel="Ok2"
             />
             <Button
               onPress={onButtonPress03}
               title="Close Hand"
               color="#175fd3"
               accessibilityLabel="Ok3"
             />
             <Button
               onPress={onButtonPress04}
               title="Open Hand"
               color="#175fd3"
               accessibilityLabel="Ok4"
             />
             <Button
               onPress={onButtonPress05}
               title="Thumb Up"
               color="#175fd3"
               accessibilityLabel="Ok5"
             />
           <Text style={styles.txtstyle02}>
             Power Options
           </Text>
             <Button
               onPress={onButtonPress07}
               title="Idle/Rest"
               color="#e5db40"
               accessibilityLabel="Ok7"
             />
             <Button
               onPress={onButtonPress08}
               title="Poweroff"
               color="#e54040"
               accessibilityLabel="Ok8"
             />
         </View>

       );
     }
   }

   //----------------- fetch -----------------

   function ButtonFunc(urlvariable) {
   Vibration.vibrate([10,20]);

   var FETCH_TIMEOUT = 3000;
   new Promise(function(resolve, reject) {
       var timeout = setTimeout(function() {
           reject(new Error('Request timed out'));
       }, FETCH_TIMEOUT);
   fetch('http://iot-device:8888/start/'+urlvariable+'/', {
     method: 'GET' ,
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': 'Basic '+base64.encode('admin1:secret2')
     }
          })
       .then(function(response) {
           clearTimeout(timeout);
           if (response && response.status == 200) return response.json();
           else reject(new Error('Response error'));
       })
       .then(function(responseObject) {
           console.log(responseObject);
           resolve();
       })
       .catch(function(err) {
   //  reject(err);
       console.log(err);
       });
   })
   .then(function() {
       // request succeed.
   })
   .catch(function(err) {
       // err handling: response error, request timeout or runtime error.
   Alert.alert(
     'Help',
     '- Make sure that your phone is on the same network and iot device is powered on',
     [
           {text: 'OK', onPress: () =>
            console.log(err)
           },
     ],
     { cancelable: false }
   )
   }

   );
   };

   //----------------- button functions -----------------

   const onButtonPress01 = () => {
     ButtonFunc(3)
    }

   const onButtonPress02 = () => {
     ButtonFunc(0)
    }

   const onButtonPress03 = () => {
     ButtonFunc(1)
    }

   const onButtonPress04 = () => {
     ButtonFunc(6)
    }

   const onButtonPress05 = () => {
     ButtonFunc(4)
    }

   const onButtonPress07 = () => {
     ButtonFunc(2)
    }

   const onButtonPress08 = () => {
     ButtonFunc(7)
   }

//----------------- Render Style -----------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonstyle01: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
    backgroundColor: '#F5FCFF',
  },
  txtstyle01: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
  },
  txtstyle02: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  }
});
