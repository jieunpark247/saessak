 import React, { Component } from 'react';
 import { StyleSheet, Alert, View, Text, FlatList, Toast } from 'react-native';
 import { WebView } from 'react-native-webview';
 import RankItem from '../components/RankItem';
 
 export class Ranking extends Component {
    constructor(){
        super();
 
        this.state={
            guData:{
                "종로구":0,"중구":0,"용산구":0,"성동구":0,"광진구":0,"동대문구":0,"중랑구":0,"성북구":0,"강북구":0,"도봉구":0,"노원구":0,"은평구":0,"서대문구":0,"마포구":0,
                "양천구":0,"강서구":0,"구로구":0,"금천구":0,"영등포구":0,"동작구":0,"관악구":0,"서초구":0,"강남구":0, "송파구":0, "강동구":0
            },
            data: []
        };
    }

    componentDidMount  = () =>{
        const rankData = this.props.route.params.data;
        const rank= {}//this.state.guData;
        rankData.map(item=>{
            rank[item.guName] = item.rank;
        })
        this.webview.postMessage(rank);
        console.log(rank);
    }

    guClick = (gu) =>{
        console.log(gu+'!!!!!!!');
        alert(gu);
    };

     render() {
         return (
             <View style={styles.container}>
                <WebView
                    style={styles.rankMapArea}
                    //source={{uri: 'http://121.142.30.220:8080'}}
                    source={{uri: 'https://sassak-29409.web.app/'}}
                    onMessage={event => {
                        this.guClick(event.nativeEvent.data);
                    }}
                    ref={(ref) => (this.webview = ref)}
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