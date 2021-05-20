 import React, { Component } from 'react';
 import { StyleSheet, Alert, View, Text, FlatList, Toast } from 'react-native';
 import { WebView } from 'react-native-webview';
 import RankItem from '../components/RankItem';
 
 export class Ranking extends Component {
    constructor(){
        super();
 
        this.state={
            guData:[
                "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
            ],
            data: []
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
                        data={this.props.route.params.data}
                        keyExtractor={(item, index) => index}
                        renderItem={( obj )=>{return <RankItem item={obj.item} ></RankItem>}}>
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