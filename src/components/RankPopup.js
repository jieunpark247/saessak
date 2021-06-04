import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
const RankPopup = props => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
        <View style={styles.container}>
      <View style={styles.rect1}>
        <View style={styles.rect2}>
          <View style={styles.image2StackRow}>
            <View style={styles.image2Stack}>
              <Image
                source={require("../assets/images/cityCircle.png")}
                resizeMode="contain"
                style={styles.image2}
              ></Image>
              <Text style={styles.서초구1}>{props.gu.rank}위</Text>
            </View>
            <View style={styles.서초구4StackStack}>
              <View style={styles.서초구4Stack}>
                <Text style={styles.서초구4}>{props.gu.guName}</Text>
                <Image
                  source={require("../assets/images/recycle-img-02.png")}
                  resizeMode="contain"
                  style={styles.image4}
                ></Image>
                <TouchableOpacity  style={styles.image5} onPress={()=>{props.setModalVisible()}}>
                    <Image
                        source={require("../assets/images/closeBtn.png")}
                        resizeMode="contain"
                        style={styles.image6}
                    />
                  </TouchableOpacity>
              </View>
              <Text style={styles.대기오염1}>{props.gu.guCnt}건</Text>
            </View>
          </View>
        </View>
          <ScrollView style={styles.scrollView}>
            {
            props.guRecycleList.map((value,index) => {
              return (
                  <View style={styles.listItem} key={index}>
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
                      source={{uri: value.profile_picture}}
                      resizeMode="contain"
                      style={styles.image16}></Image> 
                  </View>
                );
              })
            }
      </ScrollView>

      </View>
    </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  scrollView: {
    width: 292,
    height: 270,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 21
  },
  rect1: {
    width: 333,
    height: 480,
    backgroundColor: "rgba(230,230,230,1)",
    borderRadius: 15,
  },
  rect2: {
    width: 292,
    height: 130,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 21
  },
  listItem:{
    width: 280,
    height: 70,
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: 'rgba(230,230,230,0.6)',
    flexDirection: 'row',
  },
  
barcodeColumn :{
  width: 270,
  height: 40,
  marginTop: 5,
  marginLeft: 5,
},
barcodeText:{
  width: 270,
  height: 20,
  marginTop: 5,
  marginLeft: 5,

},
recycleImgRow:{
  width: 90,
  height: 30,
  marginTop: 5,
  marginLeft: 5,
  flexDirection: 'row',
},
recycleImg:{
  width: 30,
  height: 30,
  alignSelf: 'flex-end',
},
recycleCount:{
  marginTop: 5,
  marginLeft: 5,
},

image16:{
  marginTop: 10,
  marginLeft: -50,
  width: 50,
  height: 50,
},
  image2: {
    top: 0,
    left: 0,
    width: 69,
    height: 69,
    position: "absolute"
  },
  서초구1: {
    top: 16,
    left: 4,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 57,
    width: 61,
    fontSize: 25,
    textAlign: "center"
  },
  image2Stack: {
    width: 69,
    height: 73,
    marginTop: 30
  },
  서초구4: {
    top: 24,
    left: 4,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(37,119,62,1)",
    height: 52,
    width: 155,
    fontSize: 30
  },
  image4: {
    top: 75,
    left: 0,
    width: 48,
    height: 38,
    position: "absolute"
  },
  image5: {
    position: "absolute",
    top: 0,
    left: 127,
    height: 40,
    width: 40,
  },
  image6: {
      flex:1,
    height: 40,
    width: 40,
  },
  서초구4Stack: {
    top: 0,
    left: 0,
    width: 167,
    height: 113,
    position: "absolute"
  },
  대기오염1: {
    top: 77,
    left: 67,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(249,6,6,1)",
    textAlign: "center",
    fontSize: 20
  },
  서초구4StackStack: {
    width: 167,
    height: 113,
    marginLeft: 31
  },
  image2StackRow: {
    height: 113,
    flexDirection: "row",
    flex: 1,
    marginLeft: 25
  }
});

export default RankPopup;