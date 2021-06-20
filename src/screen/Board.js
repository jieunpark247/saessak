import React, {Component} from 'react';
import { SafeAreaView,  ScrollView, StyleSheet,  View,  Image, ImageBackground,  Text,  Alert,  TouchableOpacity,  PermissionsAndroid,  Platform,} from 'react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import guInfo from '../../guInfo.json';
import BoardMyInfo from '../components/BoardMyInfo';
import BoardEnvInfo from '../components/BoardEnvInfo';
import BoardRcyInfo from '../components/BoardRcyInfo';
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
      allRecycleList :{
        "종로구":[],"중구":[],"용산구":[],"성동구":[],"광진구":[],"동대문구":[],"중랑구":[],"성북구":[],"강북구":[],"도봉구":[],"노원구":[],"은평구":[],"서대문구":[],"마포구":[],
        "양천구":[],"강서구":[],"구로구":[],"금천구":[],"영등포구":[],"동작구":[],"관악구":[],"서초구":[],"강남구":[], "송파구":[], "강동구":[]
      },
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
      let userInfo = JSON.parse(result);
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
     
      this.setState({userInfo: userInfo}); // 내 개인 정보 저장

      //날씨 API 추가 
      console.log(`myGuCode :  ${this.state.userInfo.guWaterCode} , ${this.state.userInfo.guWeatherCode}`)
      if(this.state.userInfo.guWaterCode != '' || this.state.userInfo.guWeatherCode != '') {
        this.getWather(this.state.userInfo.guWaterCode) 
        this.getWeather(this.state.userInfo.guWeatherCode)
      }
      //데이터 가져오기 (firebase)
      this.getDatbase(userInfo)
    });
  };

  getDatbase = (userInfo) => {
    const ref = database().ref();
    ref.on("value", rs =>{
        let recycleArray = [];
        if(rs.val() === null || rs.val().users[userInfo.guName] == null ) return
        let recycleList = rs.val().users[userInfo.guName][userInfo.userId]
        console.log("============================recycleList============================")
        console.log(recycleList)
        console.log("============================recycleList============================")
        for(let i in recycleList){
          recycleArray.push(recycleList[i]);
        }
        
        //지역구별 재활용 건수 저장(랭킹맵에서 사용해야한다> 지역구별 모든 데이터 보여줌)
        const guList = rs.val().users;
        let guCntData = this.state.guCntData;
        let rankArray = [];
        let  allRecycleList = {
          "종로구":[],"중구":[],"용산구":[],"성동구":[],"광진구":[],"동대문구":[],"중랑구":[],"성북구":[],"강북구":[],"도봉구":[],"노원구":[],"은평구":[],"서대문구":[],"마포구":[],
          "양천구":[],"강서구":[],"구로구":[],"금천구":[],"영등포구":[],"동작구":[],"관악구":[],"서초구":[],"강남구":[], "송파구":[], "강동구":[]
        }
        for(let gu in guList){
          const userList = guList[gu];
          let guCnt = 0;
          for (let user in userList) {
            guCnt += Object.keys(userList[user]).length;
            let rcInfo = Object.values(userList[user]);
            for(let rc in rcInfo){
              allRecycleList[gu].push(rcInfo[rc]);
            }
          }
          guCntData[gu] = guCnt;
        }

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
  /**
   * 날씨 정보 받아오기
   */
  getWeather = async guCode => {
    let url = `${API_URL}/${API_KEY_WEATHER}/xml/ListAirQualityByDistrictService/1/5/${guCode}/`;
    await fetch(url)
      .then(response => response.text())
      .then(data => {
        parseString(data, (err, result) => {
          const data = JSON.parse(
            JSON.stringify(result.ListAirQualityByDistrictService.row[0]),
          );
          this.setState({weatherData: data});
          this.selectTab('대기정보');
          console.log('대기 정보 --------------')
          console.log(this.state.weatherData);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  /**
   * 수질정보 받아오기
   */
  getWather = async guCode => {
    let url = `${API_URL}/${API_KEY_WATER}/xml/AreaQltwtrSttus/1/5/${guCode}/`;
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
  /**
   * 재활용 건수에 따른 새싹 성장 
   */
  recycleLevel = cnt => {
    if (cnt < 2) {
      return require('../assets/images/saessak-img-01.png');
    } else if (cnt < 6) {
      return require('../assets/images/saessak-img-02.png');
    } else if (cnt < 8) {
      return require('../assets/images/saessak-img-03.png');
    } else if (cnt < 10) {
      return require('../assets/images/saessak-img-04.png');
    } else if (cnt >= 10) {
      return require('../assets/images/saessak-img-05.png');
    }
    return null;
  };

  scanBarcode = () => {
    let that = this;
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
  /**
   * 바코드 정보가 있으면 스캔
   * 바코드 정보가 없으면 카메라 롤
   */
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

  /**
   * 미세먼지, 먼지 농도에 따른 이미지 변화
   * @param {}} num 
   * @param {*} limit 
   * @returns 
   */
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

  /**
   * 환경 정보 탭 디테일 정보
   */
  changeEnvTabDetail = (tabName,info) => {
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

  /**
   * 탭 이동 
   * @returns 
   */
  changeEnvTab = () => {
    //수온(TE) 탁도(TB) PH3(PH) 32.5%
    const info = this.state.tabInfo;
    if (!info.tabTitle) return; //state 값이 null이면 리턴
    return (
      <View style={styles.secondWhiteBoard}>
        <Text style={styles.envInfo}>{info.tabTitle}</Text>
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
    let tabInfo;
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
    /**
     * 데이터가 없을 시
     * @returns 
     */
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
                style={styles.image}>
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
              
            <BoardMyInfo 
              createBarcodeYes={this.createBarcodeYes} 
              moveGuPage={this.moveGuPage}
              recycleLevel={this.recycleLevel}
              data={this.state.data}
              userInfo={this.state.userInfo}
              rankArray = {this.state.rankArray}
            /> 
          </View>     
          <BoardEnvInfo tabInfo={this.state.tabInfo} selectTab={this.selectTab} changeEnvTab={this.changeEnvTab} /> 
        </View>
        {this.setNoListData()}
        <BoardRcyInfo data={this.state.data} /> 
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
  listBox: {
    height: hp(68),
    marginTop: hp(-5),
  },
  image: {
    width: wp(100),
    height: hp(25),
    position: 'absolute',
    left: -1,
    flexDirection: 'row',
  },
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
  secondWhiteBoard: {
    width: wp(79),
    height:  hp(15),
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 15,
    marginTop: hp(1),
    marginLeft: wp(5),
  },
  envInfo: {
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

  res_02_water: {
    width: wp(9),
    height: hp(3),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: wp(12.5),
  },
  noData:{
    width: wp(89),
    height: hp(36),
    marginLeft: wp(5),
    borderRadius: 15,
    backgroundColor: 'rgba(230,230,230,0.6)',
  },
  noDataTxt :{
    marginTop: wp(30),
    fontFamily: 'roboto-regular',
    color: 'rgba(158,158,158,1)',
    textAlign: 'center',
    fontSize : 20
  },
});
