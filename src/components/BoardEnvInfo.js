import React from 'react';
import { SafeAreaView,  ScrollView, StyleSheet,  View,  Image, ImageBackground,  Text,  Alert,  TouchableOpacity,  PermissionsAndroid,  Platform,} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
const BoardEnvInfo  = props => {

     return (
        <View style={styles.secondBoard}>
        <View style={styles.secondBoard_02}>
          <TouchableOpacity
            onPress={() => {
              props.selectTab('대기정보');
            }}
            style={
              props.tabInfo.tabName === '대기정보'
                ? styles.secondBoardTab_selected
                : styles.secondBoardTab
            }>
            <Text
              style={
                props.tabInfo.tabName === '대기정보'
                  ? styles.secondBoardTabTxt_selected
                  : styles.secondBoardTabTxt
              }>
              대기오염
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.selectTab('재활용');
            }}
            style={
              props.tabInfo.tabName === '재활용'
                ? styles.secondBoardTab_selected
                : styles.secondBoardTab
            }>
            <Text
              style={
                props.tabInfo.tabName === '재활용'
                  ? styles.secondBoardTabTxt_selected
                  : styles.secondBoardTabTxt
              }>
              페트병 재활용
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.selectTab('수질');
            }}
            style={
              props.tabInfo.tabName === '수질'
                ? styles.secondBoardTab_selected
                : styles.secondBoardTab
            }>
            <Text
              style={
                props.tabInfo.tabName === '수질'
                  ? styles.secondBoardTabTxt_selected
                  : styles.secondBoardTabTxt
              }>
              수질
            </Text>
          </TouchableOpacity>
        </View>

        {props.changeEnvTab()}
   
      </View>
   );
 }

 const styles = StyleSheet.create({
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

 });

 export default BoardEnvInfo;