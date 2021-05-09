import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";

function Board(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageStackStack}>
        <View style={styles.imageStack}>
          <ImageBackground
            source={require("../assets/images/ComponentTMP_0-image11.png")}
            resizeMode="contain"
            style={styles.image}
            imageStyle={styles.image_imageStyle}
          >
            <View style={styles.image11Row}>
              <Image
                source={require("../assets/images/image_PbMs..png")}
                resizeMode="contain"
                style={styles.image11}
              ></Image>
              <Image
                source={require("../assets/images/image_Kbj8..png")}
                resizeMode="contain"
                style={styles.image10}
              ></Image>
            </View>
          </ImageBackground>
          <View style={styles.rect}>
            <View style={styles.rect3}>
              <View style={styles.image2Row}>
                <Image
                  source={require("../assets/images/ComponentTMP_0-image6.png")}
                  resizeMode="contain"
                  style={styles.image2}
                ></Image>
                <Text style={styles.나의점수}>나의 점수</Text>
                <Image
                  source={require("../assets/images/circle.png")}
                  resizeMode="contain"
                  style={styles.image5}
                ></Image>
              </View>
            </View>
          </View>
          <ImageBackground
            source={require("../assets/images/ComponentTMP_0-image91.png")}
            resizeMode="contain"
            style={styles.image6}
            imageStyle={styles.image6_imageStyle}
          >
            <View style={styles.image9StackStack}>
              <View style={styles.image9Stack}>
                <ImageBackground
                  source={require("../assets/images/ComponentTMP_0-image81.png")}
                  resizeMode="contain"
                  style={styles.image9}
                  imageStyle={styles.image9_imageStyle}
                >
                  <Text style={styles.n건}>N건</Text>
                </ImageBackground>
                <Text style={styles.시작하기}>시작하기</Text>
              </View>
              <View style={styles.서초구5Stack}>
                <Text style={styles.서초구5}>서초구</Text>
                <Text style={styles.서초구4}>2위</Text>
              </View>
            </View>
            <View style={styles.rect8}>
              <Text style={styles.재활용비율}>재활용비율</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.rect1}>
          <View style={styles.rect6Row}>
            <View style={styles.rect6}>
              <Text style={styles.대기오염}>대기오염</Text>
            </View>
            <View style={styles.rect9}>
              <Text style={styles.수질}>수질</Text>
            </View>
          </View>
          <View style={styles.rect5}>
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
      <View style={styles.rect2}>
        <View style={styles.대기오염4ColumnRow}>
          <View style={styles.대기오염4Column}>
            <Text style={styles.대기오염4}>123123123</Text>
            <View style={styles.대기오염4Filler}></View>
            <Image
              source={require("../assets/images/ComponentTMP_0-image51.png")}
              resizeMode="contain"
              style={styles.image7}
            ></Image>
          </View>
          <Image
            source={require("../assets/images/image_PrJY..png")}
            resizeMode="contain"
            style={styles.image12}
          ></Image>
          <Text style={styles.대기오염3}>2021-05-09</Text>
          <Image
            source={require("../assets/images/image_sAPr..png")}
            resizeMode="contain"
            style={styles.image13}
          ></Image>
        </View>
      </View>
      <View style={styles.rect4}>
        <View style={styles.대기오염5ColumnRow}>
          <View style={styles.대기오염5Column}>
            <Text style={styles.대기오염5}>123123123</Text>
            <View style={styles.image8Row}>
              <Image
                source={require("../assets/images/ComponentTMP_0-image41.png")}
                resizeMode="contain"
                style={styles.image8}
              ></Image>
              <Text style={styles.대기오염2}>1건</Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/image_PrJY..png")}
            resizeMode="contain"
            style={styles.image15}
          ></Image>
          <Text style={styles.대기오염6}>2021-05-09</Text>
          <Image
            source={require("../assets/images/image_sAPr..png")}
            resizeMode="contain"
            style={styles.image14}
          ></Image>
        </View>
      </View>
      <View style={styles.rect10}>
        <View style={styles.대기오염7ColumnRow}>
          <View style={styles.대기오염7Column}>
            <Text style={styles.대기오염7}>123123123</Text>
            <View style={styles.image18Row}>
              <Image
                source={require("../assets/images/ComponentTMP_0-image51.png")}
                resizeMode="contain"
                style={styles.image18}
              ></Image>
              <Text style={styles.대기오염9}>1건</Text>
            </View>
          </View>
          <Image
            source={require("../assets/images/image_PrJY..png")}
            resizeMode="contain"
            style={styles.image17}
          ></Image>
          <Text style={styles.대기오염8}>2021-05-09</Text>
          <Image
            source={require("../assets/images/image_sAPr..png")}
            resizeMode="contain"
            style={styles.image16}
          ></Image>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    top: 0,
    width: 380,
    height: 285,
    position: "absolute",
    left: -1,
    flexDirection: "row"
  },
  image_imageStyle: {},
  image11: {
    height: 28,
    width: 28,
    marginTop: 5
  },
  image10: {
    height: 40,
    width: 40,
    marginLeft: 286,
    marginTop: -1
  },
  image11Row: {
    height: 40,
    flexDirection: "row",
    flex: 1,
    marginRight: 14,
    marginLeft: 12,
    marginTop: 166
  },
  rect: {
    top: 205,
    left: 20,
    width: 333,
    height: 163,
    position: "absolute",
    backgroundColor: "rgba(230,230,230,0.6)",
    borderRadius: 15
  },
  rect3: {
    width: 292,
    height: 130,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 21
  },
  image2: {
    width: 105,
    height: 116
  },
  나의점수: {
    fontFamily: "roboto-700",
    color: "rgba(34,39,31,1)",
    height: 32,
    width: 101,
    fontSize: 22,
    marginTop: 15
  },
  image5: {
    width: 69,
    height: 69,
    marginLeft: 6,
    marginTop: 6
  },
  image2Row: {
    height: 116,
    flexDirection: "row",
    flex: 1,
    marginRight: 11
  },
  image6: {
    top: 237,
    left: 132,
    width: 200,
    height: 200,
    position: "absolute"
  },
  image6_imageStyle: {},
  image9: {
    top: 0,
    left: 0,
    width: 85,
    height: 85,
    position: "absolute"
  },
  image9_imageStyle: {},
  n건: {
    fontFamily: "calibri-bold",
    color: "#121212",
    height: 23,
    width: 34,
    fontSize: 15,
    textAlign: "center",
    marginTop: 32,
    marginLeft: 19
  },
  시작하기: {
    top: 82,
    left: 31,
    position: "absolute",
    fontFamily: "calibri-bold",
    color: "rgba(255,255,255,1)",
    height: 26,
    width: 109,
    fontSize: 20,
    textAlign: "center"
  },
  image9Stack: {
    top: 0,
    left: 0,
    width: 140,
    height: 108,
    position: "absolute"
  },
  서초구5: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "rgba(37,119,62,1)",
    height: 23,
    width: 52,
    fontSize: 15
  },
  서초구4: {
    top: 15,
    left: 6,
    position: "absolute",
    fontFamily: "roboto-700",
    color: "#121212",
    height: 23,
    width: 34,
    fontSize: 15,
    textAlign: "center"
  },
  서초구5Stack: {
    top: 5,
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
  rect8: {
    width: 100,
    height: 25,
    backgroundColor: "rgba(241,249,237,0.6)",
    borderRadius: 5,
    marginTop: 49,
    marginLeft: 5
  },
  재활용비율: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 25
  },
  imageStack: {
    top: 0,
    left: 0,
    width: 380,
    height: 437,
    position: "absolute"
  },
  rect1: {
    top: 387,
    left: 26,
    width: 333,
    height: 158,
    position: "absolute",
    backgroundColor: "rgba(239,249,236,1)",
    borderRadius: 15
  },
  rect6: {
    width: 100,
    height: 25,
    backgroundColor: "rgba(108,197,124,1)",
    borderRadius: 5
  },
  대기오염: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 26
  },
  rect9: {
    width: 100,
    height: 25,
    backgroundColor: "rgba(241,249,237,0.6)",
    borderRadius: 5,
    marginLeft: 99
  },
  수질: {
    fontFamily: "roboto-regular",
    color: "rgba(6,6,6,1)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 37
  },
  rect6Row: {
    height: 25,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 12,
    marginRight: 22
  },
  rect5: {
    width: 316,
    height: 102,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 3
  },
  환경대기정보: {
    fontFamily: "roboto-700",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    marginLeft: 90
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
    marginTop: 8,
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
  imageStackStack: {
    width: 380,
    height: 545,
    marginTop: -52,
    marginLeft: 1
  },
  rect2: {
    width: 335,
    height: 80,
    backgroundColor: "rgba(230,230,230,0.6)",
    borderRadius: 15,
    marginTop: 15,
    marginLeft: 21
  },
  대기오염4: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 3
  },
  대기오염4Filler: {
    flex: 1
  },
  image7: {
    width: 40,
    height: 40
  },
  대기오염4Column: {
    width: 79,
    marginTop: 4
  },
  image12: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    marginLeft: 12,
    marginBottom: 8
  },
  대기오염3: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 7,
    marginTop: 45,
    marginBottom: 9
  },
  image13: {
    height: 65,
    width: 65,
    marginLeft: 52
  },
  대기오염4ColumnRow: {
    height: 72,
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8,
    marginRight: 16
  },
  rect4: {
    width: 335,
    height: 80,
    backgroundColor: "rgba(239,249,236,1)",
    borderRadius: 15,
    marginTop: 13,
    marginLeft: 21
  },
  대기오염5: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 1
  },
  image8: {
    width: 29,
    height: 29
  },
  대기오염2: {
    fontFamily: "roboto-regular",
    color: "rgba(249,6,6,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 6,
    marginTop: 7
  },
  image8Row: {
    height: 29,
    flexDirection: "row",
    marginTop: 13,
    marginRight: 18
  },
  대기오염5Column: {
    width: 77,
    marginTop: 4,
    marginBottom: 1
  },
  image15: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    marginLeft: 12,
    marginBottom: 6
  },
  대기오염6: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 7,
    marginTop: 40,
    marginBottom: 7
  },
  image14: {
    height: 65,
    width: 65,
    marginLeft: 52
  },
  대기오염5ColumnRow: {
    height: 65,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 10,
    marginRight: 16
  },
  rect10: {
    width: 335,
    height: 80,
    backgroundColor: "rgba(230,230,230,0.6)",
    borderRadius: 15,
    marginTop: 12,
    marginLeft: 21
  },
  대기오염7: {
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 3
  },
  image18: {
    width: 40,
    height: 40,
    alignSelf: "flex-end"
  },
  대기오염9: {
    fontFamily: "roboto-regular",
    color: "rgba(249,6,6,1)",
    textAlign: "center",
    fontSize: 15,
    marginTop: 10
  },
  image18Row: {
    height: 40,
    flexDirection: "row",
    marginTop: 10,
    marginRight: 16
  },
  대기오염7Column: {
    width: 79,
    marginTop: 5
  },
  image17: {
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    marginLeft: 12,
    marginBottom: 8
  },
  대기오염8: {
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
    marginLeft: 52
  },
  대기오염7ColumnRow: {
    height: 73,
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 9,
    marginRight: 15
  }
});

export default Board;
