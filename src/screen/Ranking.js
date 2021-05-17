 import React, { Component } from 'react';
 import { StyleSheet, Alert, View, Text, FlatList, Toast } from 'react-native';
 import { WebView } from 'react-native-webview';
 import RankItem from '../components/RankItem'
 
 export class Ranking extends Component {
    constructor(){
        super();
 
        this.state={
            datas:[
                {key:0, guName:"강남구",guCnt:200},
                {key:1, guName:"서초구",guCnt:180},
                {key:2, guName:"마포구",guCnt:74},
                {key:3, guName:"영등포구",guCnt:50},
                {key:4, guName:"중랑구",guCnt:40},
                {key:5, guName:"강북구",guCnt:22}
            ]
        };
    }

    guClick = (gu) =>{
        console.log(gu+'!!!!!!!');
    };

     render() {
        const web = `
        <script>
          function send(){
            window.ReactNativeWebview('hello react-native!!');
          }
        </script>
        <button onclick="send()">Send</button>
        `;
         return (
             <View style={styles.container}>
                <WebView
                    style={styles.rankMapArea}
                    //source={{html: web}}
                    source={{uri: 'http://121.142.30.220:8080'}}
                    onMessage={(event)=> console.log(event.nativeEvent.data)}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                />
                <View style={styles.rankListArea}>
                    <Text style={styles.chartTitle}>지역구 순위</Text>
                    <FlatList 
                        data={this.state.datas}
                        renderItem={( obj )=>{return <RankItem keys={obj.index} item={obj.item} ></RankItem>}}>
                    </FlatList>
                </View>
             </View>
         );
 
     }
 
 }


 const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    rankMapArea: {
        flex: 1 
    },
    rankListArea: {
        flex: 1 
    },
    chartTitle: {
      fontFamily: "georgia-regular",
      color: "#121212",
      height: 27,
      width: 110,
      textAlign: "left",
      fontSize: 15,
      marginTop: 11,
      marginLeft: 16
    },
  });