import React, { Component } from 'react';
import {Button, StyleSheet, View, Image, ImageBackground, Text, Alert, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { RNCamera, } from 'react-native-camera';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid'

 //default는 App.js에서만 사용해야 하는 듯 
 export class CameraRoll extends Component {
    constructor(props) {
      console.log(props)
      super(props);
    };

     takePhoto = async () => {
       if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.uploadImage(data.uri)
        
      }
    };
    uploadImage = async(imageUri) => {
      const barcodeValue = this.props.route.params.barcodeValue;
      console.log("imageuri : " , imageUri)
      console.log("barcodeValue : " , barcodeValue)
      const ext = imageUri.split('Camera').pop();
      const reference = storage().ref(`saessak${ext}`);
      reference.putFile(imageUri)
      .then((response) => {
        console.log('success save picture in firebase')
        //console.log(response)
            //DB에 쓰기 
        var date = new Date()
        const data = {
          imageUri:imageUri,
          barcodeValue:barcodeValue,
          today : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
        }
        this.writeDB(data)
      })
      .catch((error) => {
          console.log('error')
          console.log(error)
      });

    };
    writeDB = (data) => {
      console.log("this is writeDB function")
      const userId = '7a4e706747716f7237394373666a43'
      console.log(data.barcodeValue);
      database().ref( `users/${userId}/${uuid.v4()}`).set({
        profile_picture : data.imageUri,
        barcodeValue: data.barcodeValue,
        todayDate : data.today
      })
      .then((response) => {
        console.log('success write database')
        //alert("Code Number : " +  data.barcodeValue  + " 를 저장 완료했습니다.")
        this.props.navigation.navigate('Board')
      })
      .catch((error) => {
          console.log('error')
          console.log(error)
      });
    
    }
 
   render() {;
     return (
      <>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{width: 450, height: 700}} // 카메라 화면 크기
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      {/* 사진찍기 버튼 생성 */}
          <TouchableOpacity onPress={this.takePhoto} style={styles.takePic}>
          <View style={styles.takePicture}>
          </View>
          </TouchableOpacity>
      </>
     );
   }
 }

 const styles = StyleSheet.create({
  takePic: {
      top: 710,
      left: 155,
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  takePicture:{
    width : 100,
    height : 100,
    borderRadius : 50,
    borderWidth: 10,
    borderColor: "lightgrey",
    backgroundColor :"red"
  }
 });