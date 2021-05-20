 import React from 'react';
 import { StyleSheet,View, Text} from 'react-native';

  const RankItem = ({
    item
  }) => {
      return (
        <View style={styles.rect}>
            <View style={styles.rankBox}>
              <Text style={styles.rankText}>{item.rank}위</Text>
            </View>
            <Text style={styles.guText}>{item.guName}</Text>
            <Text style={styles.guCnt}>{item.guCnt}건</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    rect: {
      flex: 1,
      flexDirection: "row",
      height: 71,
      backgroundColor: "#EFF9EC",
      borderRadius: 15,
      marginVertical: 13,
      marginHorizontal: 7
    },
    rankBox: {
      width: 60,
      height: 60,
      margin: 5,
      backgroundColor: "#469840",
      borderRadius: 20
    },
    rankText: {
      fontFamily: "roboto-700",
      color: "#ffffff",
      fontSize: 18,
      marginTop: 16,
      marginLeft: 16
    },
    guText: {
      flex: 5,
      fontFamily: "roboto-regular",
      color: "#000000",
      fontSize: 20,
      marginLeft: 10,
      marginVertical: 20,
    },
    guCnt: {
      flex: 2,
      fontFamily: "roboto-regular",
      color: "#EF1D52",
      fontSize: 20,
      marginVertical: 20,
      marginRight: 10,
      textAlign:'right'
    },
  });


  export default RankItem;