 import React, { Component } from 'react';
 import { StyleSheet, View, Text, FlatList,Modal, TouchableOpacity, Image } from 'react-native';
 import { WebView } from 'react-native-webview';
 import RankItem from '../components/RankItem';
 import RankPopup from '../components/RankPopup';
 
 export class Ranking extends Component {
    constructor(){
        super();
 
        this.state={
            data: [],
            myGu: '',
            modalGu: '',
            modalVisible: false
        };
    }

    componentDidMount  = () =>{
        this.setState({myGu:this.props.route.params.data.myGu});
        const rankData = this.props.route.params.data.rank;
        const rank= {}
        rankData.map(item=>{
            rank[item.guName] = item.rank;
        })
        this.webview.postMessage(rank);
    }

    guClick = (gu) =>{
        console.log(gu);
        const rankData = this.props.route.params.data.rank;
        let guData= {}
        rankData.map(item=>{
            if(item.guName == gu){
                guData = item;
                return;
            }
        });
        this.setState({
            modalVisible: true,
            modalGu: guData,
        })
    };

    setModalVisible = () => {
        this.setState({
            modalVisible: false
        })
    };

     render() {
         return (
             <View style={styles.container}>
                <RankPopup visible={this.state.modalVisible} setModalVisible={this.setModalVisible} gu={this.state.modalGu}/>
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