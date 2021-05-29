import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image
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
  rect1: {
    width: 333,
    height: 163,
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