import React, { Component } from 'react';
import {Button, StyleSheet, View, Image, ImageBackground, Text, Alert, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import { RNCamera, } from 'react-native-camera';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-community/async-storage'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
 //default는 App.js에서만 사용해야 하는 듯 
 export class CameraRoll extends Component {
    constructor(props) {
      console.log(props)
      super(props);
      this.state = { 
        userInfo : []
      }
    }
    componentDidMount(){
      AsyncStorage.getItem('users', (err, result) => {
        const userInfo = JSON.parse(result)
       // console.log(result)
        this.setState({userInfo : userInfo});
      });
    }
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
      console.log(ext)
      reference.putFile(imageUri)
      .then((response) => {
          //DB에 쓰기 
          storage().ref().child('saessak').list().then(result => {  
            result.items.forEach(pics => {
               let fullPath = pics.fullPath;
                   console.log(fullPath.indexOf(ext))
                  if(fullPath.indexOf(ext) > -1){
                      storage().ref().child(pics.fullPath).getDownloadURL().then((url) => {
                          console.log("url불러옴 " + url)
                          var date = new Date()
                          const data = {
                            userId: this.state.userInfo.userId,
                            imageUri:url,
                            barcodeValue:barcodeValue,
                            today : date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate(),
                            guName : this.state.userInfo.guName
                          }
                          this.writeDB(data)
                      })
                  }

            });
        })
        





      })
      .catch((error) => {
          console.log('error')
          console.log(error)
      });

    };
    writeDB = (data) => {
      console.log("this is writeDB function"  + data.userId)
      const userId = data.userId
      console.log(data.barcodeValue);
      database().ref( `users/${data.guName}/${userId}/${uuid.v4()}`).set({
        profile_picture : data.imageUri,
        barcodeValue: data.barcodeValue,
        todayDate : data.today,
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
        style={{width: wp(100), height: hp(85)}} // 카메라 화면 크기
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
      top: hp(86.5),
      left: wp(40),
      position: "absolute",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  },
  takePicture:{
    width : wp(25),
    height : wp(25),
    borderRadius : 50,
    borderWidth: 10,
    borderColor: "lightgrey",
    backgroundColor :"red"
  }
 });