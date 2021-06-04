 import React, { Component } from 'react';
 import { StyleSheet, View, Text, FlatList,Modal, TouchableOpacity, Image } from 'react-native';
 import { WebView } from 'react-native-webview';
 import RankItem from '../components/RankItem';
 import RankPopup from '../components/RankPopup';
 import AsyncStorage from '@react-native-community/async-storage';
 import database from '@react-native-firebase/database';
 import storage from '@react-native-firebase/storage';
 export class Ranking extends Component {
    constructor(){
        super();
 
        this.state={
            data: [],
            myGu: '',
            modalGu: '',
            modalVisible: false,
            guRecycleList : []
        };
    }

    componentDidMount  = () =>{
        this.setState({myGu:this.props.route.params.data.myGu});
        const rankData = this.props.route.params.data.rank;
        this.setState({recycleList: this.props.route.params.data.allRecycleList}) 
        const rank= {}
        rankData.map(item=>{
            rank[item.guName] = item.rank;
        })
        this.webview.postMessage(rank);

    }

    guClick = (gu) =>{
        const rankData = this.props.route.params.data.rank;
        const recycleList = this.props.route.params.data.allRecycleList;
        let guData= {}
        let guRecycleList = [];
        rankData.map(item=>{
            if(item.guName == gu){
                if(recycleList[gu] != null)
                    guRecycleList = recycleList[gu];
                guData = item;
                return;
            }
        });
        this.setImgSrc(guRecycleList,guData);

    };
    setImgSrc = async(guRecycleList,guData) => {
  
        try{
            console.log("완료 ")
            await storage().ref().child('saessak').list().then(result => {  
                result.items.forEach(pics => {
                   let fullPath = pics.fullPath;

                   for(rc in guRecycleList){
                        let imgURL = guRecycleList[rc].profile_picture.split('Camera/');
                        if(fullPath.indexOf(imgURL[1]) > -1){
                            storage().ref().child(pics.fullPath).getDownloadURL().then((url) => {
                                console.log("url불러옴 ")
                                console.log(url)
                                guRecycleList[rc].profile_picture = url;
                                console.log(guRecycleList[rc])
                            })
                        }
                    }
                });
            })
        }catch(error){
            console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        }

console.log("끝>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        this.setState({
            modalVisible: true,
            modalGu: guData,
            guRecycleList :guRecycleList
        })

    }
    setModalVisible = () => {
        this.setState({
            modalVisible: false
        })
    };

     render() {
         return (
             <View style={styles.container}>
                <RankPopup visible={this.state.modalVisible} setModalVisible={this.setModalVisible} gu={this.state.modalGu} guRecycleList = {this.state.guRecycleList}/>
                <WebView
                    style={styles.rankMapArea}
                    source={{uri: 'https://sassak-29409.web.app/'}}
                    onMessage={event => {
                        this.guClick(event.nativeEvent.data);
                    }}
                    ref={(ref) => (this.webview = ref)}
                />
                <View style={styles.rankListArea}>
                    <Text style={styles.chartTitle}>지역구 순위</Text>
                    <FlatList 
                        data={this.props.route.params.data.rank}
                        keyExtractor={(item, index) => index}
                        renderItem={( obj )=>{return <RankItem item={obj.item} myGu={this.state.myGu} ></RankItem>}}>
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