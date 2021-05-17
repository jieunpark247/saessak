import React, { Component } from "react";
import {SafeAreaView, ScrollView, StyleSheet, View, Image, ImageBackground, Text, Alert, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import database from '@react-native-firebase/database';
//import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage'

export class Board extends Component { 
  constructor(props){
    super(props);
    this.state = { 
      data : [] , 
      userInfo : {}
    }
  }
  componentDidMount(){
    console.log("========mount =========")
         //async 세팅 
    AsyncStorage.setItem('users',JSON.stringify({'userId': '7a4e706747716f7237394373666a43', 'area': '도봉구'}), () => {
      console.log('유저정보 저장 완료')
      AsyncStorage.getItem('users', (err, result) => {
      const userInfo = JSON.parse(result)
      this.setState({userInfo : userInfo});
    
      const ref = database().ref();
      ref.on("value", rs =>{
          var recycleArray = []
          var recycleList = rs.val() === null ? null : rs.val().users[this.state.userInfo.userId]
          for(var i in recycleList){
            recycleArray.push(recycleList[i]);
          }
          this.setState({data : recycleArray});
        });

      });
    });
    
  }
  scanBarcode = () => {
     var that = this;
    //To Start Scanning
    if (Platform.OS === 'android') {
        async function requestCameraPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA, {
                      title: "Cool Photo App Camera Permission",
                      message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                      buttonNeutral: "Ask Me Later",
                      buttonNegative: "Cancel",
                      buttonPositive: "OK"
                  }
                );        
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If CAMERA Permission is granted
                    console.log("user camera")
                    //TODO BarcodeScanner.js를 호출하세요 
                    //this가 아니라 that을 사용해야 함 
                   that.props.navigation.navigate('BarcodeScanner')
                  // that.props.navigation.navigate('CameraRoll', { onGetBarcode: that.onGetBarcode })
                } else {
                    alert("카메라 권한을 받지 못했습니다.");
                }
            } catch (err) {
                alert("카메라 권한 오류: ", err);
                console.warn(err);
            }
        }
        //Calling the camera permission function
        requestCameraPermission();
    } 
  }
  recycleLevel= (cnt) => {
    var imageSrc
    if(cnt < 2){
      imageSrc = require("../assets/images/saessak-img-01.png")
    }else if(cnt < 6){
      imageSrc = require("../assets/images/saessak-img-02.png")
    }else if(cnt < 8){
      imageSrc = require("../assets/images/saessak-img-03.png")
    }else if(cnt < 10){
      imageSrc = require("../assets/images/saessak-img-04.png")
    }else if(cnt >= 10){
      imageSrc = require("../assets/images/saessak-img-05.png")
    }
    return imageSrc
  }

  createBarcodeYes = () =>
    Alert.alert(
      "선택해주세요",
      "바코드가 있습니까?",
      [
        {
          text: "아니오",
          onPress: () =>  this.props.navigation.navigate('CameraRoll', { barcodeValue: '' }),
          style: "cancel"
        },
        { text: "네", onPress: () => this.scanBarcode() }
      ]
    );

  render() {
    return (
      <SafeAreaView  style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View style={styles.listBox}>
          <View style={styles.imageStack}>
            <ImageBackground
              source={require("../assets/images/background-up.png")}
              resizeMode="contain"
              style={styles.image}
              imageStyle={styles.image_imageStyle}
            >
              <View style={styles.imageSettingRow}>
                <Image
                  source={require("../assets/images/image-setting.png")}
                  resizeMode="contain"
                  style={styles.imageSetting}
                ></Image>
                <Image
                  source={require("../assets/images/saessak-logo-02.png")}
                  resizeMode="contain"
                  style={styles.saessakLogo}
                ></Image>
              </View>
            </ImageBackground>
            <View style={styles.firstBoard}>
              <View style={styles.whiteBoard}>
                <View style={styles.whiteBoardView}>
                  <Image
                    source={this.recycleLevel(this.state.data.length)}
                    resizeMode="contain"
                    style={styles.levelImg}
                  ></Image>
                  <Text style={styles.myLevel}>나의 점수</Text>
                  <Image
                    source={require("../assets/images/cityCircle.png")}
                    resizeMode="contain"
                    style={styles.areaImg}
                  ></Image>
                </View>
              </View>
            </View>
              <View style={styles.image9StackStack}>
                <View style={styles.image9Stack}>
                  <ImageBackground
                    source={require("../assets/images/recycle-count.png")}
                    resizeMode="contain"
                    style={styles.image9}
                    imageStyle={styles.image9_imageStyle}
                  >
                    <Text style={styles.n건}>{this.state.data.length + "건"}</Text>
                  </ImageBackground>


                   <TouchableOpacity onPress={this.createBarcodeYes} style={styles.button}>
                    <Text style={styles.startArea}>
                        시작하기
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.서초구5Stack}>
                  <Text style={styles.서초구5}>{this.state.userInfo.area}</Text>
                  <Text style={styles.서초구4}>2위</Text>
                </View>
              </View>
          </View>

          <View style={styles.secondBoard}>
            <View style={styles.secondBoard2}>
              <View style={styles.airPollution}>
                <Text style={styles.airPollutionTxt}>대기오염</Text>
              </View>
              <View style={styles.recyclingRate}>
                <Text style={styles.recyclingRateTxt}>재활용 비율</Text>
              </View>
              <View style={styles.waterQuality}>
                <Text style={styles.waterQualityTxt}>수질</Text>
              </View>
            </View>
            <View style={styles.secondWhiteBoard}>
              <Text style={styles.환경대기정보}>환경 대기 정보</Text>
              <View style={styles.매우나쁨Row}>
                <Text style={styles.매우나쁨}>매우나쁨</Text>
                <Text style={styles.나쁨2}>나쁨</Text>
                <Text style={styles.보통}>보통</Text>
                <Text style={styles.나쁨3}>나쁨</Text>
              </View>
              <View style={styles.보통3Row}>
                <Text style={styles.보통3}>보통</Text>
                <Text style={styles.보통4}>보통</Text>
                <Text style={styles.보통2}>보통</Text>
                <Text style={styles.보통5}>보통</Text>
              </View>
            </View>
          </View>
        </View>

        {
          this.state.data.map((value,index) => {
            return(
            <View style={styles.thirdBoard} key={index}>
              <View style={styles.listItem}>
                <View style={styles.barcodeColumn}>
                  <Text style={styles.barcodeText}>{value.barcodeValue === '' ? "재활용" : value.barcodeValue}</Text>
                  <View style={styles.recycleImgRow}>
                    <Image
                      source= {value.barcodeValue === '' ? require("../assets/images/recycle-img-02.png") : require("../assets/images/recycle-img-01.png")}
                      resizeMode="contain"
                      style={styles.recycleImg}
                    ></Image>
                    <Text style={styles.recycleCount}>1건</Text>
                  </View>
                </View>
                <Image
                  source={require("../assets/images/clock-img.png")}
                  resizeMode="contain"
                  style={styles.dateImg}
                ></Image>
                <Text style={styles.dateText}>{value.todayDate}</Text>
                <Image
                  source={{uri : value.profile_picture}}
                  resizeMode="contain"
                  style={styles.image16}
                ></Image>
              </View>
            </View> 
            )
         })
        }
        </ScrollView>
      </SafeAreaView >
    );
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollView: {
      backgroundColor: 'white'
    },
    image: {
      top: 0,
      width: 450,
      height: 200,
      position: "absolute",
      left: -1,
      flexDirection: "row"
    },
    image_imageStyle: {},
    imageSetting: {
      height: 30,
      width: 30,
      marginTop: -8,
      marginLeft: -2
    },
    saessakLogo: {
      height: 40,
      width: 40,
      marginLeft: 320,
      marginTop: -8
    },
    imageSettingRow: {
      height: 40,
      flexDirection: "row",
      flex: 1,
      marginRight: 14,
      marginLeft: 12,
      marginTop: 150
    },
    firstBoard: {
      top: 182,
      left: 21,
      width: 365,
      height: 180,
      position: "absolute",
      backgroundColor: "rgba(230,230,230,0.6)",
      borderRadius: 15
    },
    whiteBoard: {
      width: 320,
      height: 140,
      backgroundColor: "rgba(255,255,255,0.6)",
      borderRadius: 15,
      flexDirection: "row",
      marginTop: 17,
      marginLeft: 20
    },
    levelImg: {
      width: 105,
      height: 116
    },
    myLevel: {
      fontFamily: "roboto-700",
      color: "rgba(34,39,31,1)",
      height: 32,
      width: 101,
      fontSize: 22,
      marginTop: 15
    },
    areaImg: {
      width: 75,
      height: 75,
      marginLeft: 13,
      marginTop: 2
    },
    whiteBoardView: {
      height: 116,
      flexDirection: "row",
      flex: 1,
      marginRight: 11,
      marginTop: 4
    },
    image9_imageStyle: {},
    n건: {
      fontFamily: "calibri-bold",
      color: "#121212",
      height: 22,
      width: 34,
      fontSize: 15,
      textAlign: "center",
      marginTop: 32,
      marginLeft: 19
    },
    startArea: {
      fontFamily: "calibri-bold",
      fontSize: 20,
      color: "rgba(255,255,255,1)",
      textAlign: "center"
    },
    button: {
      top: 290,
      left: 170,
      width: 160,
      height: 50,
      alignItems: "center",
      backgroundColor: "#7cc594",
      padding: 10,
      position: "absolute",
      borderRadius : 40
    },
    image9: {
      top: 220,
      left: 145,
      width: 85,
      height: 85,
      position: "absolute"
    },
    image9Stack: {
      top: 0,
      left: 0,
      width: 140,
      height: 108,
      position: "absolute"
    },
    서초구5: {
      top: 220,
      left: 145,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "rgba(37,119,62,1)",
      height: 23,
      width: 52,
      fontSize: 15
    },
    서초구4: {
      top: 235,
      left: 151,
      position: "absolute",
      fontFamily: "roboto-700",
      color: "#121212",
      height: 23,
      width: 34,
      fontSize: 15,
      textAlign: "center"
    },
    서초구5Stack: {
      top: 0,
      left: 119,
      width: 52,
      height: 38,
      position: "absolute"
    },
    image9StackStack: {
      width: 171,
      height: 108,
      marginTop: 5,
      marginLeft: 14
    },
    imageStack: {
      top: 0,
      left: 0,
      width: 380,
      height: 437,
      position: "absolute"
    },
    secondBoard: {
      top: 370,
      left: 21,
      width: 365,
      height: 180,
      position: "absolute",
      backgroundColor: "rgba(239,249,236,1)",
      borderRadius: 15
    },
    airPollution: {
      width: 120,
      height: 25,
      backgroundColor: "rgba(108,197,124,1)",
      borderRadius: 5
    },
    airPollutionTxt: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      textAlign: "center",
      fontSize: 12,
      marginTop: 4
    },
    recyclingRate: {
      width: 100,
      height: 25,
      backgroundColor: "rgba(241,249,237,0.6)",
      borderRadius: 5
    },
    recyclingRateTxt: {
      fontFamily: "roboto-regular",
      color: "rgba(6,6,6,1)",
      textAlign: "center",
      fontSize: 12,
      marginTop: 4,
      marginLeft: 0
    },
    waterQuality: {
      width: 100,
      height: 25,
      backgroundColor: "rgba(241,249,237,0.6)",
      borderRadius: 5
    },
    waterQualityTxt: {
      fontFamily: "roboto-regular",
      color: "rgba(6,6,6,1)",
      textAlign: "center",
      fontSize: 12,
      marginTop: 4,
      marginLeft: 0
    },
    secondBoard2: {
      height: 25,
      flexDirection: "row",
      marginTop: 15,
      marginLeft: 12,
      marginRight: 22
    },
    secondWhiteBoard: {
      width: 330,
      height: 110,
      backgroundColor: "rgba(255,255,255,0.6)",
      borderRadius: 15,
      marginTop: 10,
      marginLeft: 15
    },
    환경대기정보: {
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginTop: 8
    },
    매우나쁨: {
      fontFamily: "roboto-700",
      color: "rgba(249,6,6,1)",
      textAlign: "center",
      fontSize: 15
    },
    나쁨2: {
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 34
    },
    보통: {
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 39
    },
    나쁨3: {
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 40
    },
    매우나쁨Row: {
      height: 20,
      flexDirection: "row",
      marginTop: 12,
      marginLeft: 17,
      marginRight: 36
    },
    보통3: {
      fontFamily: "roboto-regular",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 15
    },
    보통4: {
      fontFamily: "roboto-regular",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 49
    },
    보통2: {
      fontFamily: "roboto-regular",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 39
    },
    보통5: {
      fontFamily: "roboto-regular",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 40
    },
    보통3Row: {
      height: 20,
      flexDirection: "row",
      marginTop: 5,
      marginLeft: 32,
      marginRight: 36
    },
    listBox: {
      width: 380,
      height: 545,
      marginTop: -52,
      marginLeft: 1
    },
    thirdBoard: {
      width: 365,
      height: 90,
      backgroundColor: "rgba(230,230,230,0.6)",
      borderRadius: 15,
      marginTop: 12,
      marginLeft: 21
    },
    barcodeText: {
      fontFamily: "roboto-regular",
      color: "rgba(0,0,0,1)",
      textAlign: "left",
      fontSize: 15,
      marginLeft: 7
    },
    barcodeColumn: {
      width: 130,
      marginTop: 1
    },
    recycleImg: {
      width: 40,
      height: 40,
      alignSelf: "flex-end"
    },
    recycleCount: {
      fontFamily: "roboto-regular",
      color: "rgba(249,6,6,1)",
      textAlign: "center",
      fontSize: 15,
      marginTop: 10
    },
    recycleImgRow: {
      height: 40,
      flexDirection: "row",
      marginTop: 10,
      marginRight: 35
    },
    dateImg: {
      height: 20,
      width: 20,
      alignSelf: "flex-end",
      marginLeft: 12,
      marginBottom: 5
    },
    dateText: {
      fontFamily: "roboto-regular",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 7,
      marginTop: 46,
      marginBottom: 9
    },
    image16: {
      height: 65,
      width: 65,
      marginLeft: 35
    },
    listItem: {
      height: 73,
      flexDirection: "row",
      marginTop: 13,
      marginLeft: 5,
      marginRight: 15
    }
  });
//export default Board;
