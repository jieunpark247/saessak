import React from 'react';
import { SafeAreaView,  ScrollView, StyleSheet,  View,  Image, ImageBackground,  Text,  Alert,  TouchableOpacity,  PermissionsAndroid,  Platform,} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
const BoardRcyInfo  = props => {
    console.log("props::::123:::")
    console.log(props.data)
    return (
        props.data.map((value, index) => {
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
    );
}


 const styles = StyleSheet.create({
    thirdBoard: {
        width: wp(89),
        height: hp(12),
        top:hp(-1),
        backgroundColor: 'rgba(230,230,230,0.6)',
        borderRadius: 15,
        marginLeft: wp(5),
        marginTop: hp(1)
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

 export default BoardRcyInfo;