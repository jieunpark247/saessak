import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import guInfo from '../../guInfo.json';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const API_KEY_WATER = '7a4e706747716f7237394373666a43';
const API_KEY_WEATHER = '5272566657716f723734536d526c49';
const parseString = require('react-native-xml2js').parseString;
const API_URL = 'http://openapi.seoul.go.kr:8088'
export class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data : [] , 
      allRecycleList :[],
      weatherData : [],
      waterData : [],
      userInfo : {},
      tabInfo : {},
      rankArray: [],
      guCntData:{
        "종로구":0,"중구":0,"용산구":0,"성동구":0,"광진구":0,"동대문구":0,"중랑구":0,"성북구":0,"강북구":0,"도봉구":0,"노원구":0,"은평구":0,"서대문구":0,"마포구":0,
        "양천구":0,"강서구":0,"구로구":0,"금천구":0,"영등포구":0,"동작구":0,"관악구":0,"서초구":0,"강남구":0, "송파구":0, "강동구":0
      },
    }
  }
  componentDidMount = () => {
      console.log('======== componentDidMount =========');
      AsyncStorage.getItem('users', (err, result) => {
      var userInfo = JSON.parse(result);
      console.log("==========userInfo==========")
      console.log(userInfo)

      //나의  ㅇㅇ구 정보 불러오기
      const myGuWeatherInfo = guInfo.guCtgrWeather.filter(
        item => `${item.guName}` === userInfo.guName,
      ); 
      const myGuWaterInfo = guInfo.guCtgrWater.filter(
        item => `${item.guName}` === userInfo.guName,
      ); 
      // 구 코드 추가
      userInfo.guWeatherCode = myGuWeatherInfo[0] == undefined ?  '' : myGuWeatherInfo[0].guCode ; 
      userInfo.guWaterCode = myGuWaterInfo[0] == undefined ?  '' : myGuWaterInfo[0].guCode  ;

      this.setState({userInfo: userInfo});

      //날씨 API 추가 
      console.log("guCode : " + this.state.userInfo.guWaterCode + '  , ' + this.state.userInfo.guWeatherCode)
      if(this.state.userInfo.guWaterCode != '' || this.state.userInfo.guWeatherCode != '') {
        this.getWather(this.state.userInfo.guWaterCode) 
        this.getWeather(this.state.userInfo.guWeatherCode)
      }
      //데이터 가져오기 
      this.getDatbase(userInfo)
    });
  };

  getDatbase = (userInfo) => {
    const ref = database().ref();
    ref.on("value", rs =>{
        var recycleArray = [];
        if(rs.val() === null || rs.val().users[userInfo.guName] ==null ) return 
        var recycleList = rs.val().users[userInfo.guName][userInfo.userId]
        console.log("========================================>>")
        console.log(recycleList)
        for(var i in recycleList){
          recycleArray.push(recycleList[i]);
        }
        
        //지역구별 재활용 건수 저장
        const guList = rs.val().users;
        let guCntData = this.state.guCntData;
        let rankArray = [];
        let allRecycleList = {};
        for(let gu in guList){
          const userList = guList[gu];
          let guCnt = 0;
          for (let user in userList) {
            guCnt += Object.keys(userList[user]).length;
            allRecycleList[gu] += Object.values(userList[user]);
          }
          guCntData[gu] = guCnt;
        }
console.log("?????????????????????????")
        console.log(allRecycleList["강남구"])
        for (const [key, value] of Object.entries(guCntData)) {
          const guData = {guName:key, guCnt:value};
          rankArray.push(guData);
        }
        

        rankArray.sort(function(a, b) {
          return b.guCnt - a.guCnt;
        });
        
        //랭킹 계산
        let rank = 1;
        const len = rankArray.length;
        for(let i=0; i<len; i++){
          rankArray[i].rank = rank;
          if(i==len-1) break;
          if(rankArray[i].guCnt>rankArray[i+1].guCnt) rank++;
        }
        console.log('rankArray');
        console.log(rankArray);

        this.setState({data : recycleArray, rankArray:rankArray, allRecycleList:allRecycleList});
      });
  }
  getWeather = async guCode => {
    var url = `${API_URL}/${API_KEY_WEATHER}/xml/ListAirQualityByDistrictService/1/5/${guCode}/`;
    await fetch(url)
      .then(response => response.text())
      .then(data => {
        //  console.log(data);
        parseString(data, (err, result) => {
          const data = JSON.parse(
            JSON.stringify(result.ListAirQualityByDistrictService.row[0]),
          );
          this.setState({weatherData: data});
          this.selectTab('대기정보');
          console.log(this.state.weatherData);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  getWather = async guCode => {
    var url = `${API_URL}/${API_KEY_WATER}/xml/AreaQltwtrSttus/1/5/${guCode}/`;
    await fetch(url)
      .then(response => response.text())
      .then(data => {
        parseString(data, (err, result) => {
          const data = JSON.parse(
            JSON.stringify(result.AreaQltwtrSttus.row[0]),
          );
          this.setState({waterData: data});
          console.log(this.state.waterData);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  recycleLevel = cnt => {
    var imageSrc;
    if (cnt < 2) {
      imageSrc = require('../assets/images/saessak-img-01.png');
    } else if (cnt < 6) {
      imageSrc = require('../assets/images/saessak-img-02.png');
    } else if (cnt < 8) {
      imageSrc = require('../assets/images/saessak-img-03.png');
    } else if (cnt < 10) {
      imageSrc = require('../assets/images/saessak-img-04.png');
    } else if (cnt >= 10) {
      imageSrc = require('../assets/images/saessak-img-05.png');
    }
    return imageSrc;
  };

  scanBarcode = () => {
    var that = this;
    //To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Photo App Camera Permission',
              message: 'Photo App needs access to your camera ',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.props.navigation.navigate('BarcodeScanner');
          } else {
            alert('카메라 권한을 받지 못했습니다.');
          }
        } catch (err) {
          alert('카메라 권한 오류: ', err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    }
  };
  createBarcodeYes = () =>
    Alert.alert('선택해주세요', '바코드가 있습니까?', [
      {
        text: '아니오',
        onPress: () =>
          this.props.navigation.navigate('CameraRoll', {barcodeValue: ''}),
        style: 'cancel',
      },
      {text: '네', onPress: () => this.scanBarcode()},
    ]);
  weatherLevel = (num, limit) => {
    if (num <= limit.good) { require('../assets/images/saessak-img-01.png')
      return require('../assets/images/dust_good.png');
    } else if (num <= limit.normal) {
      return require('../assets/images/dust_normal.png');
    } else if (num <= limit.bad) {
      return require('../assets/images/dust_bad.png');
    } else {
      return require('../assets/images/dust_sobad.png');
    }
  };
  changeEnvTabDetail = (tabName,info) =>{
    if(tabName === '수질'){
      return(
        <View style={styles.envTitleRes}>
          <Text
              style={styles.res_02_water}>
              {info.tabTitleRes.res_01}
            </Text>
            <Text
              style={styles.res_02_water}>
              {info.tabTitleRes.res_02}
            </Text>
            <Text
              style={styles.res_02_water}>
              {info.tabTitleRes.res_03}
            </Text>
        </View>
      );

    }else if(tabName === '대기정보'){
      return(
        <View style={styles.envTitleRes}>
        <Image
        source={info.tabTitleRes.res_01}
        style={styles.dust_res_01}></Image>
        <Image
         source={info.tabTitleRes.res_02}
        style={styles.dust_res_01}></Image>
        <Image
         source={info.tabTitleRes.res_03}
        style={styles.dust_res_01}></Image>
        </View>
      );
    }else if(info.tabName === '재활용'){
      return(
        <View style={styles.envTitleRes}>
          <Text
            style={styles.res_01_recycle}>
            {info.tabTitleRes.res_02}
          </Text>
        </View>
      );
    }
  
  }
  ChangeEnvTab = () => {
    console.log("changeEnvTab")
    //수온(TE) 탁도(TB) PH3(PH) 32.5%
    const info = this.state.tabInfo;
    if (!info.tabTitle) return; //state 값이 null이면 리턴
    console.log(info.tabName)
  
    return (
      <View style={styles.secondWhiteBoard}>
        <Text style={styles.환경대기정보}>{info.tabTitle}</Text>
        <View style={styles.envTitleRow}>
          <Text style={styles.title_01}>{info.tabTitleDetail.datail_01}</Text>
          <Text
            style={ info.tabName === '재활용' ? styles.title_01_water : styles.title_01 }>
            {info.tabTitleDetail.detail_02}
          </Text>
          <Text style={styles.title_01}>{info.tabTitleDetail.detail_03}</Text>
        </View>
         {this.changeEnvTabDetail(info.tabName,info)}
      </View>
      
    );
  };

  selectTab = tabName => {
    var tabInfo;
    if (tabName === '대기정보') {
      tabInfo = {
        tabName: tabName,
        tabTitle: '환경대기정보',
        tabTitleDetail: {
          datail_01: '미세먼지',
          detail_02: '초미세먼지',
          detail_03: '오존',
        },
        tabTitleRes: {
          res_01: this.weatherLevel(this.state.weatherData.PM10, {
            good: 30,
            normal: 80,
            bad: 150,
          }),
          res_02: this.weatherLevel(this.state.weatherData.OZONE, {
            good: 30,
            normal: 80,
            bad: 150,
          }),
          res_03: this.weatherLevel(this.state.weatherData.OZONE, {
            good: 30,
            normal: 80,
            bad: 150,
          }),
        },
      };
    } else if (tabName === '재활용') {
      tabInfo = {
        tabName: tabName,
        tabTitle: '재활용 비율 정보',
        tabTitleDetail: {
          datail_01: ' ',
          detail_02: '32.5%',
          detail_03: ' ',
        },
        tabTitleRes: {
          res_01: '',
          res_02: '(국회  제출 데이터)',
          res_03: '',
        },
      };
    } else if (tabName === '수질') {
      tabInfo = {
        tabName: tabName,
        tabTitle: '수질 오염 정보',
        tabTitleDetail: {
          datail_01: '수온',
          detail_02: '탁도',
          detail_03: 'PH3',
        },
        tabTitleRes: {
          res_01: this.state.waterData.TE,
          res_02: this.state.waterData.TB,
          res_03: this.state.waterData.PH,
        },
      };
    }

    this.setState({tabInfo: tabInfo});
  };

    moveGuPage = () => {
      this.props.navigation.navigate('Ranking',{data:{rank:this.state.rankArray,myGu:this.state.userInfo.guName,allRecycleList:this.state.allRecycleList}})
    }
    setNoListData = () =>{
      if(this.state.data.length > 0) return
      return(
        <View style={styles.noData} >
            <Text style = {styles.noDataTxt}> 데이터를 입력해주세요(시작하기 클릭) </Text>
          </View>
      );
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
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.listBox}>
            <View>
              <ImageBackground
                source={require('../assets/images/saessak_head.png')}
                resizeMode="contain"
                style={styles.image}
                imageStyle={styles.image_imageStyle}>
                <View style={styles.imageSettingRow}>
                  <Image
                    source={require('../assets/images/image-setting.png')}
                    resizeMode="contain"
                    style={styles.imageSetting}></Image>
                  <Image
                    source={require('../assets/images/saessak-logo-03.png')}
                    resizeMode="contain"
                    style={styles.saessakLogo}></Image>
                </View>
              </ImageBackground>

              <View style={styles.firstBoard}>
                <View style={styles.whiteBoard}>
                  <View style={styles.whiteBoardView}>
                    <Image
                      source={this.recycleLevel(this.state.data.length)}
                      resizeMode="contain"
                      style={styles.levelImg}></Image>
                    <Text style={styles.myLevel}>나의 점수</Text>
                    <Image
                      source={require('../assets/images/cityCircle.png')}
                      resizeMode="contain"
                      style={styles.areaImg}></Image>
                  </View>
                </View>
              </View>

              <View style={styles.image9StackStack}>
                <View style={styles.image9Stack}>
                  <ImageBackground
                    source={require('../assets/images/recycle-count.png')}
                    resizeMode="contain"
                    style={styles.image9}
                    imageStyle={styles.image9_imageStyle}>
                    <Text style={styles.n건}>
                      {this.state.data.length + '건'}
                    </Text>
                  </ImageBackground>

                  <TouchableOpacity
                    onPress={this.createBarcodeYes}
                    style={styles.button}>
                    <Text style={styles.startArea}>시작하기</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={this.moveGuPage}
                  style={styles.myGuStack}>
                  <Text style={styles.myGu}>{this.state.userInfo.guName}</Text>
                  <Text style={styles.guGrade}>{rank+'위'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.secondBoard}>
              <View style={styles.secondBoard_02}>
                <TouchableOpacity
                  onPress={() => {
                    this.selectTab('대기정보');
                  }}
                  style={
                    this.state.tabInfo.tabName === '대기정보'
                      ? styles.secondBoardTab_selected
                      : styles.secondBoardTab
                  }>
                  <Text
                    style={
                      this.state.tabInfo.tabName === '대기정보'
                        ? styles.secondBoardTabTxt_selected
                        : styles.secondBoardTabTxt
                    }>
                    대기오염
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.selectTab('재활용');
                  }}
                  style={
                    this.state.tabInfo.tabName === '재활용'
                      ? styles.secondBoardTab_selected
                      : styles.secondBoardTab
                  }>
                  <Text
                    style={
                      this.state.tabInfo.tabName === '재활용'
                        ? styles.secondBoardTabTxt_selected
                        : styles.secondBoardTabTxt
                    }>
                    페트병 재활용
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.selectTab('수질');
                  }}
                  style={
                    this.state.tabInfo.tabName === '수질'
                      ? styles.secondBoardTab_selected
                      : styles.secondBoardTab
                  }>
                  <Text
                    style={
                      this.state.tabInfo.tabName === '수질'
                        ? styles.secondBoardTabTxt_selected
                        : styles.secondBoardTabTxt
                    }>
                    수질
                  </Text>
                </TouchableOpacity>
              </View>
   
              {this.ChangeEnvTab()}
         
            </View>
          </View>
          {this.setNoListData()}
          {
          this.state.data.map((value, index) => {
            return (
              <View style={styles.thirdBoard} key={index}>
                <View style={styles.listItem}>
                  <View style={styles.barcodeColumn}>
                    <Text style={styles.barcodeText}>
                      {value.barcodeValue === ''
                        ? '재활용'
                        : value.barcodeValue}
                    </Text>
                    <View style={styles.recycleImgRow}>
                      <Image
                        source={
                          value.barcodeValue === ''
                            ? require('../assets/images/recycle-img-02.png')
                            : require('../assets/images/recycle-img-01.png')
                        }
                        resizeMode="contain"
                        style={styles.recycleImg}></Image>
                      <Text style={styles.recycleCount}>1건</Text>
                    </View>
                  </View>
                  <Image
                    source={require('../assets/images/clock-img.png')}
                    resizeMode="contain"
                    style={styles.dateImg}></Image>
                  <Text style={styles.dateText}>{value.todayDate}</Text>
                  <Image
                    source={{uri: value.profile_picture}}
                    resizeMode="contain"
                    style={styles.image16}></Image>
                </View>
              </View>
            );
          })
        }
        </ScrollView>
        
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  image: {
    width: wp(100),
    height: hp(25),
    position: 'absolute',
    left: -1,
    flexDirection: 'row',
  },
  image_imageStyle: {},
  imageSetting: {
    height: hp(5),
    width: wp(5),
    marginTop: hp(-2),
    marginLeft: wp(1),
  },
  saessakLogo: {
    height: hp(7),
    width: wp(7),
    marginLeft: wp(82),
    marginTop: hp(-1),
  },
  imageSettingRow: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: wp(3),
    marginTop: hp(18),
  },
  firstBoard: {
    top: hp(22),
    left: wp(5),
    width: wp(88),
    height: hp(22),
    position: 'absolute',
    backgroundColor: 'rgba(230,230,230,0.6)',
    borderRadius: 15,
  },
  whiteBoard: {
    width: wp(79),
    height: hp(17),
    backgroundColor: "'rgba(255,255,255,0.6)'",
    borderRadius: 15,
    flexDirection: 'row',
    marginTop: hp(2),
    marginLeft: wp(5),
  },
  levelImg: {
    width: wp(25),
    height: hp(15),
  },
  myLevel: {
    fontFamily: 'roboto-700',
    color: 'rgba(34,39,31,1)',
    height: hp(6),
    width: wp(25),
    fontSize: 22,
    marginTop: hp(2),
  },
  areaImg: {
    width: wp(18),
    height: hp(9),
    marginLeft: wp(3.5),
    marginTop: wp(1),
  },
  whiteBoardView: {
    height: wp(33),
    flexDirection: 'row',
    flex: 1,
    marginRight: wp(3),
    marginTop: wp(1),
  },
  image9_imageStyle: {},
  n건: {
    fontFamily: 'calibri-bold',
    color: '#121212',
    height: hp(3),
    width: wp(10),
    fontSize: 15,
    textAlign: 'center',
    marginTop: hp(3.5),
    marginLeft: wp(3.5),
  },
  startArea: {
    fontFamily: 'calibri-bold',
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
  },
  button: {
    top: hp(36),
    left: wp(40),
    width: wp(40),
    height: hp(6),
    alignItems: 'center',
    backgroundColor: '#7cc594',
    padding: 10,
    position: 'absolute',
    borderRadius: 40,
  },
  image9: {
    top: hp(28),
    left: wp(35),
    width: wp(20),
    height: hp(10),
    position: 'absolute',
  },
  myGu: {
    top: hp(2),
    fontFamily: 'roboto-700',
    color: 'rgba(37,119,62,1)',
    height: hp(3),
    fontSize: 15,
    textAlign: 'center',
  },
  guGrade: {
    top: hp(1.5),
    fontFamily: 'roboto-700',
    color: '#121212',
    height: hp(3),
    fontSize: 15,
    textAlign: 'center',
  },
  myGuStack: {
    top: hp(25),
    left: wp(63.5),
    width: wp(18),
    height: hp(9),
    borderRadius: 50,
    position: 'absolute',
  },
  secondBoard: {
    top: hp(45),
    left: wp(5),
    width: wp(89),
    height: hp(22),
    position: 'absolute',
    backgroundColor: 'rgba(239,249,236,1)',
    borderRadius: 15,
  },
  secondBoardTab: {
    width: wp(26),
    height: hp(3.5),
    left: wp(1),
    backgroundColor: 'rgba(241,249,237,0.6)',
    borderRadius: 5,
  },
  secondBoardTab_selected: {
    width: wp(26),
    height: hp(3.5),
    left: wp(1),
   backgroundColor: 'rgba(108,197,124,1)',
    borderRadius: 5,
  },
  secondBoardTabTxt: {
    fontFamily: 'roboto-regular',
    color: 'rgba(6,6,6,1)',
    textAlign: 'center',
    fontSize: 12,
    marginTop: hp(0.5),
  },
  secondBoardTabTxt_selected: {
    fontFamily: 'roboto-regular',
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    fontSize: 12,
    marginTop: hp(0.5),
  },
  secondBoard_02: {
    height: hp(3),
    flexDirection: 'row',
    marginTop: hp(2),
    marginLeft: wp(3),
    marginRight: wp(5),
  },
  secondWhiteBoard: {
    width: wp(79),
    height:  hp(15),
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    marginTop: hp(1),
    marginLeft: wp(5),
  },
  환경대기정보: {
    fontFamily: 'roboto-700',
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    fontSize: 15,
    marginTop: hp(1),
  },
  envTitleRow: {
    height: hp(3),
    flexDirection: 'row',
    marginTop: hp(1),
    marginLeft: wp(5.5),
    marginRight: hp(3),
  },
  title_01: {
    width: wp(17),
    height: hp(3),
    fontFamily: 'roboto-700',
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(5),
  },
  title_01_water: {
    width: wp(20),
    height: hp(4),
    fontFamily: 'roboto-700',
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    marginTop: hp(1),
    marginLeft: wp(2),
  },
  envTitleRes: {
    height: hp(3),
    flexDirection: 'row',
    marginTop: hp(1),
    marginLeft: wp(3),
    marginRight: wp(2),
  },
  dust_res_01: {
    width: wp(10),
    height: wp(9),
    marginLeft: wp(11.5),
  },
  res_01: { 
    width: wp(9),
    height: hp(3),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(12.5),

  },
  res_01_recycle: { 
    width: wp(40),
    height: hp(3),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(16),

  },
  res_01_red: {
    width: wp(9),
    height: hp(3),
    fontFamily: 'roboto-regular',
    color: 'red',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(12.5),
  },
  res_02_water: {
    width: wp(9),
    height: hp(3),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(12.5),
  },
  listBox: {
    height: hp(68),
    marginTop: hp(-5),
  },
  noData:{
    width: wp(89),
    height: hp(36),
    marginLeft: wp(5),
    borderRadius: 15,
    backgroundColor: 'rgba(230,230,230,0.6)',
  },
  thirdBoard: {
    width: wp(89),
    height: hp(12),
    top:hp(-1),
    backgroundColor: 'rgba(230,230,230,0.6)',
    borderRadius: 15,
    marginLeft: wp(5),
    marginTop: hp(1)
  },
  noDataTxt :{
    marginTop: wp(30),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize : 20
  },
  barcodeText: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    textAlign: 'left',
    fontSize: 15,
    width: wp(40),
  },
  barcodeColumn: {
    width: wp(20),
    marginLeft: wp(1),
    marginTop: hp(1),
  },
  recycleImg: {
    width: wp(10),
    height: hp(5),
    alignSelf: 'flex-end',
  },
  recycleImgRow: {
    height: hp(5),
    flexDirection: 'row',
    marginTop: hp(1.5),
    marginRight: wp(3),
  },
  recycleCount: {
    fontFamily: 'roboto-regular',
    color: 'rgba(249,6,6,1)',
    textAlign: 'center',
    fontSize: 15,
    marginTop: hp(1),
  },
  dateImg: {
    height: hp(9),
    width: wp(5),
    alignSelf: 'flex-end',
    marginLeft: wp(2),
  },
  dateText: {
    fontFamily: 'roboto-regular',
    color: 'rgba(0,0,0,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(2),
    marginTop: hp(6)
  },
  image16: {
    height: hp(10),
    width: wp(15),
    marginLeft: wp(20),
  },
  listItem: {
    height: hp(12),
    flexDirection: 'row',
    marginTop: hp(1),
    marginLeft: wp(2)
  },
});
//export default Board;
