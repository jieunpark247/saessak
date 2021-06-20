import React from 'react';
import { SafeAreaView,  ScrollView, StyleSheet,  View,  Image, ImageBackground,  Text,  Alert,  TouchableOpacity,  PermissionsAndroid,  Platform,} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
const BoardMyInfo  = props => {
    const rankArray = props.rankArray;
    let rank = '-';
    rankArray.map(item=>{
      if(item.guName == props.userInfo.guName){
        rank=item.rank;
      }
    })
     return (
        <View>
            <View style={styles.firstBoard}>
            <View style={styles.whiteBoard}>
                <View style={styles.whiteBoardView}>
                <Image
                    source={props.recycleLevel(props.data.length)}
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
                    {props.data.length + '건'}
                </Text>
                </ImageBackground>

                <TouchableOpacity
                onPress={props.createBarcodeYes}
                style={styles.button}>
                <Text style={styles.startArea}>시작하기</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={props.moveGuPage}
                style={styles.myGuStack}>
                <Text style={styles.myGu}>{props.userInfo.guName}</Text>
                <Text style={styles.guGrade}>{rank+'위'}</Text>
            </TouchableOpacity>
            </View>
        </View>
   );
 }

 const styles = StyleSheet.create({
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
 });

 export default BoardMyInfo;