import React, { Component } from "react";
import {SafeAreaView, ScrollView, StyleSheet, View, Image, ImageBackground, Text, Alert, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage'
import guInfo from '../../guInfo.json'
const API_KEY_WATER = "7a4e706747716f7237394373666a43"
const API_KEY_WEATHER = "5272566657716f723734536d526c49"
const parseString = require('react-native-xml2js').parseString;

export class Board extends Component { 
  constructor(props){
    super(props);
    this.state = { 
      data : [] , 
      weatherData : [],
      waterData : [],
      userInfo : {},
      tabInfo : {},
      rankArray: []
    }
  }
  componentDidMount = () => {
    console.log("======== componentDidMount =========")
    //날씨 수질 공공 api
    AsyncStorage.setItem('users',JSON.stringify({'userId': '7a4e706747716f7237394373666a43', 'guName': '강남구'}), () => {
      console.log('유저정보 저장 완료')
      AsyncStorage.getItem('users', (err, result) => {
      var userInfo = JSON.parse(result)
      const myGuInfo = guInfo.guCategory.filter(item => `${item.guName}` === userInfo.guName); //나의 ㅇㅇ구 정보 불러오기 
      userInfo.guCode = myGuInfo[0].guCode // 구 코드 추가
      this.setState({userInfo : userInfo});

      //날씨 API 추가 
      console.log(this.state.userInfo.guCode)
      this.getWather(this.state.userInfo.guCode) 
      this.getWeather(this.state.userInfo.guCode)
   
      const ref = database().ref();
      ref.on("value", rs =>{
          var recycleArray = [];
          var recycleList = rs.val() === null ? null : rs.val().users[userInfo.guName][userInfo.userId]
          for(var i in recycleList){
            recycleArray.push(recycleList[i]);
          }

          const guList = rs.val().users;
          let rankArray = [];
          for(let gu in guList){
            const userList = guList[gu];
            let guCnt = 0;
            for (let user in userList) {
                guCnt += Object.keys(userList[user]).length;
            }
            const guData = {guName:gu, guCnt:guCnt};
            rankArray.push(guData);
          }
          
          rankArray.sort(function(a, b) {
            return b.guCnt - a.guCnt;
          });
              
          let rank = 1;
          const len = rankArray.length;
          for(let i=0; i<len; i++){
            rankArray[i].rank = rank;
            if(i==len-1) break;
            if(rankArray[i].guCnt>rankArray[i+1].guCnt) rank++;
          }
          console.log('rankArray');
          console.log(rankArray);

          this.setState({data : recycleArray, rankArray:rankArray});
        });

      });
    });
    
  }
 
  getWeather = async(guCode) => {
    var url = `http://openapi.seoul.go.kr:8088/${API_KEY_WEATHER}/xml/ListAirQualityByDistrictService/1/5/${guCode}/`
    console.log(url) 
    await fetch(url)
      .then(response => response.text())
      .then(data => {
      //  console.log(data);
        parseString(data, (err,result) =>{
          const data = JSON.parse(JSON.stringify(result.ListAirQualityByDistrictService.row[0]));
          this.setState({weatherData : data});
          this.selectTab("대기정보")
          console.log(this.state.weatherData)
        });
      })
      .catch(error => {
        console.log(error)
      });
  }
  getWather = async (guCode) => {
    var url =  `http://openapi.seoul.go.kr:8088/${API_KEY_WATER}/xml/AreaQltwtrSttus/1/5/${guCode}/`
    console.log(url)
    await fetch(url)
    .then(response => response.text())
    .then(data => {
          parseString(data, (err,result) =>{
          const data = JSON.parse(JSON.stringify(result.AreaQltwtrSttus.row[0]));
          this.setState({waterData : data});
          console.log(this.state.waterData)
      });
    })
    .catch(error => {
      console.log(error)
    });
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
  
  scanBarcode = () => {
    var that = this;
   //To Start Scanning
   if (Platform.OS === 'android') {
       async function requestCameraPermission() {
           try {
               const granted = await PermissionsAndroid.request(
                   PermissionsAndroid.PERMISSIONS.CAMERA, {
                     title: "Photo App Camera Permission",
                     message: "Photo App needs access to your camera ",
                     buttonNeutral: "Ask Me Later",
                     buttonNegative: "Cancel",
                     buttonPositive: "OK"
                 }
               );        
               if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  that.props.navigation.navigate('BarcodeScanner')
               } else {
                   alert("카메라 권한을 받지 못했습니다.");
               }
           } catch (err) {
               alert("카메라 권한 오류: ", err);
               console.warn(err);
           }
       }
       requestCameraPermission();
   } 
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
    weatherLevel = (num, limit) => {
      if(num <= limit.good){
        return "좋음"
      }else if(num <= limit.normal){
        return "보통"
      }else if(num <= limit.bad){
        return "나쁨"
      }else{
        return "매우나쁨"
      }
    }
    ChangeEnvTab = () => {
      //수온(TE) 탁도(TB) PH3(PH) 32.5%
      const info = this.state.tabInfo
      if(!info.tabTitle) return; //state 값이 null이면 리턴

        return (
          <View style={styles.secondWhiteBoard}>
            <Text style={styles.환경대기정보}>{info.tabTitle}</Text>
            <View style={styles.envTitleRow}>          
              <Text style={styles.title_01}>{info.tabTitleDetail.datail_01}</Text>
              <Text style={info.tabName === "재활용" ? styles.title_01_water : styles.title_01}>{info.tabTitleDetail.detail_02}</Text>
              <Text style={styles.title_01}>{info.tabTitleDetail.detail_03}</Text>
          </View>
          <View style={styles.envTitleRes}>
            <Text style={info.tabTitleRes.res_01 === "매우나쁨" ? styles.res_01_red: styles.res_01}>{info.tabTitleRes.res_01}</Text>
            <Text style={info.tabTitleRes.res_02 === "매우나쁨" ? styles.res_01_red: styles.res_01}>{info.tabTitleRes.res_02}</Text>
            <Text style={info.tabTitleRes.res_03 === "매우나쁨" ? styles.res_01_red: styles.res_01}>{info.tabTitleRes.res_03}</Text>
          </View>
        </View>
        )
      
    }

    selectTab = (tabName) =>{
      var tabInfo
      if(tabName === "대기정보"){
      tabInfo = {
        tabName : tabName,
        tabTitle : '환경대기정보',
        tabTitleDetail : {
            datail_01 : '미세먼지', detail_02 : '초미세먼지', detail_03 : '오존'
        },
        tabTitleRes : {
          res_01 : this.weatherLevel(this.state.weatherData.PM10, {good: 30 , normal : 80, bad: 150}), 
          res_02 : this.weatherLevel(this.state.weatherData.OZONE, {good: 30 , normal : 80, bad: 150}),
          res_03 : this.weatherLevel(this.state.weatherData.OZONE, {good: 30 , normal : 80, bad: 150})
        }
      }
    }else if(tabName ==="재활용"){
      tabInfo = {
        tabName : tabName,
        tabTitle : '재활용 비율 정보',
        tabTitleDetail : {
            datail_01 : ' ', detail_02 : '32.5%', detail_03 : ' '
        },
        tabTitleRes : {
          res_01 : '',
          res_02 : '',
          res_03 : ''
        }
      }
    }else if(tabName === "수질"){
      tabInfo = {
        tabName : tabName,
        tabTitle : '수질 오염 정보',
        tabTitleDetail : {
            datail_01 : '수온', detail_02 : '탁도', detail_03 : 'PH3'
        },
        tabTitleRes : {
          res_01 : this.state.waterData.TE,
          res_02 : this.state.waterData.TB, 
          res_03 : this.state.waterData.PH
        }
      }
    }

      this.setState({tabInfo : tabInfo })
    }

    moveGuPage = () => {
      this.props.navigation.navigate('Ranking',{data:this.state.rankArray})
    }

  render() {
    const rankArray = this.state.rankArray;
    let rank = '-';
    rankArray.map(item=>{
      if(item.guName == this.state.userInfo.guName){
        rank=item.rank;
      }
    })
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
                  source={require("../assets/images/saessak-logo-03.png")}
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
               
                <TouchableOpacity onPress={this.moveGuPage} style={styles.myGuStack}>
                  <Text style={styles.myGu}>{this.state.userInfo.guName}</Text>
                  <Text style={styles.guGrade}>{rank+'위'}</Text>
                </TouchableOpacity>
              </View>

          </View>

          <View style={styles.secondBoard}>
            <View style={styles.secondBoard_02}>
            <TouchableOpacity onPress={() => {this.selectTab("대기정보")}} style={this.state.tabInfo.tabName === "대기정보" ?  styles.secondBoardTab_selected : styles.secondBoardTab}>
                    <Text style={this.state.tabInfo.tabName === "대기정보" ? styles.secondBoardTabTxt_selected : styles.secondBoardTabTxt}>대기오염</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.selectTab("재활용")}} style={this.state.tabInfo.tabName === "재활용" ?  styles.secondBoardTab_selected : styles.secondBoardTab}>
                    <Text style={this.state.tabInfo.tabName === "재활용" ? styles.secondBoardTabTxt_selected : styles.secondBoardTabTxt}>재활용 비율</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.selectTab("수질")}} style={this.state.tabInfo.tabName === "수질" ?  styles.secondBoardTab_selected : styles.secondBoardTab}>
                    <Text style={this.state.tabInfo.tabName === "수질" ? styles.secondBoardTabTxt_selected : styles.secondBoardTabTxt}>수질</Text>
            </TouchableOpacity>
            </View>
            {this.ChangeEnvTab()}
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
      height: 25,
      width: 25,
      marginTop: -7,
      marginLeft: -2
    },
    saessakLogo: {
      height: 35,
      width: 35,
      marginLeft: 330,
      marginTop: -5
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
    myGu: {
      top: 15,
      left: 0,
      fontFamily: "roboto-700",
      color: "rgba(37,119,62,1)",
      height: 20,
      fontSize: 15,
      textAlign: "center"
    },
    guGrade: {
      top: 15,
      left: 0,
      fontFamily: "roboto-700",
      color: "#121212",
      height: 20,
      fontSize: 15,
      textAlign: "center"
    },
    myGuStack: {
     // backgroundColor: "red",
      top: 201,
      left: 248,
      width: 72,
      height: 72,
      borderRadius: 50,
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
    secondBoardTab : {
      width: 108,
      height: 30,
      left: 5,
      backgroundColor: "rgba(241,249,237,0.6)",
      borderRadius: 5
    },
    secondBoardTab_selected : {
      width: 108,
      height: 30,
      left: 5,
      backgroundColor: "rgba(108,197,124,1)",
      borderRadius: 5
    },
    secondBoardTabTxt: {
      fontFamily: "roboto-regular",
      color: "rgba(6,6,6,1)",
      textAlign: "center",
      fontSize: 12,
      marginTop: 4,
    },
    secondBoardTabTxt_selected: {
      fontFamily: "roboto-regular",
      color: "rgba(255,255,255,1)",
      textAlign: "center",
      fontSize: 12,
      marginTop: 4
    },
    secondBoard_02: {
      height: 25,
      flexDirection: "row",
      marginTop: 15,
      marginLeft: 12,
      marginRight: 22
    },
    secondWhiteBoard: {
      width: 330,
      height: 115,
      backgroundColor: "rgba(255,255,255,0.6)",
      borderRadius: 15,
      marginTop: 5,
      marginLeft: 15
    },
    환경대기정보: {
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginTop: 12
    },
    envTitleRow: {
      height: 20,
      flexDirection: "row",
      marginTop: 10,
      marginLeft: 20,
      marginRight : 20
    },
    title_01: {
      width: 70,
      height: 20,
      fontFamily: "roboto-700",
      color: "rgba(0,0,0,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 20
    },
    title_01_water: {
      width: 100,
      height: 40,
      fontFamily: "roboto-700",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 20,
      marginTop: 3,
      marginLeft: 5
    },
    envTitleRes: {
      height: 20,
      flexDirection: "row",
      marginTop: 6,
      marginLeft: 20,
      marginRight : 20
    },
    res_01: {
      width: 70,
      height: 20,
      fontFamily: "roboto-regular",
      color: "rgba(158,158,158,1)",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 20
    },
    res_01_red :{
      width: 70,
      height: 20,
      fontFamily: "roboto-regular",
      color: "red",
      textAlign: "center",
      fontSize: 15,
      marginLeft: 20
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
