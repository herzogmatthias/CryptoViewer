import axios from "axios";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  FlatList,
  ActivityIndicator,
  StatusBar,
  AppRegistry,
  Image,
  ScrollView,
  RefreshControl
} from "react-native";
import { SmoothLine, StockLine } from 'react-native-pathjs-charts'
import moment from 'moment';
import { Button } from "react-native-elements";

export default class CryptoDetails extends Component {
  constructor() {
    super();
    this.state = {
      change1h: 0,
      change24h: 0,
      images: [
        require("./img/Green-Up-Arrow.png"),
        require("./img/red-down-arrow-md.png"),
      ],
      imgToUse1h: 0,
      imgToUse24h: 0,
      pricedata: [[{x : 1, y : 2}]],
      data: [],
      scrollEnabled : true,
      intervalid: 0,
      refreshing: false,
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.CurrencyDetails.name,
    headerStyle: {
      backgroundColor: "#3F51B5",
    },
    headerTitleStyle: { color: "white" },
    headerBackTitleStyle: { color: "white" },
    headerTintColor: "white",
  });
  componentWillMount() {
    this.getExactData();
    let price = 0;
    price =
      this.props.navigation.state.params.CurrencyDetails.price_usd *
      this.props.navigation.state.params.CurrencyDetails.percent_change_1h /
      100;
    this.setState({ change1h: price });
    if (price > 0) this.setState({ imgToUse1h: 0 });
    else this.setState({ imgToUse1h: 1 });

    price = 0;
    price =
      this.props.navigation.state.params.CurrencyDetails.price_usd *
      this.props.navigation.state.params.CurrencyDetails.percent_change_24h /
      100;
    this.setState({ change24h: price });
    if (price > 0) this.setState({ imgToUse24h: 0 });
    else this.setState({ imgToUse24h: 1 });
  }
  componentDidMount() {
      console.log(JSON.stringify(this.state.pricedata))
  }
  getExactData() {
    this.setState({refreshing: true});
    var cryptoName = this.props.navigation.state.params.CurrencyDetails.name;
    axios
      .get(
        "http://172.18.251.55:8000/getExactCurrency/" +
        this.props.navigation.state.params.CurrencyDetails.name
      )
      .then(res => {
        var pricedata = [];
        var datedata = [];
        console.log(res.data[1].name);
        var filteredRes = res.data;
        //console.log(filteredRes)

        for(let i in filteredRes){
            console.log(i);
            pricedata.push({y : filteredRes[i].price_usd , x : Number(i)})
            datedata.push(filteredRes[i].dateval)
            
        }
        console.log(JSON.stringify(pricedata))
        this.setState({refreshing: false});
        this.setState({pricedata : [pricedata]})
      });
  }
  render() {
      this.getExactData = this.getExactData.bind(this)
    
      let options = {
        width: 250,
        height: 250,
        color: '#2980B9',
        margin: {
          top: 10,
          left: 35,
          bottom: 30,
          right: 10
        },
        animate: {
          type: 'delayed',
          duration: 200
        },
        axisX: {
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks:true,
          zeroAxis: false,
          orient: 'bottom',
          tickValues: [],
          
          label: {
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            fill: '#34495E'
          }
        },
        axisY: {
          showAxis: true,
          showLines: true,
          showLabels: true,
          showTicks: true,
          zeroAxis: false,
          orient: 'left',
          tickValues: [],
          label: {
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            fill: '#34495E'
          }
        }
      }
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}  scrollEnabled={this.state.scrollEnabled} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.getExactData}
      />}>
        <Text style={styles.row_header}>Changes in 1 Hour</Text>
        <View style={styles.row}>
          <Image
            style={{ width: 35, height: 35 }}
            source={this.state.images[this.state.imgToUse1h]}
          />
          <Text style={styles.row_name}>
            {this.state.change1h}$ {"\n"}
          </Text>
        </View>
        <Text style={styles.row_header}>Changes in 24 Hours</Text>
        <View style={styles.row}>
          <Image
            style={{ width: 35, height: 35 }}
            source={this.state.images[this.state.imgToUse24h]}
          />
          <Text style={styles.row_name}>
            {"\n"}
            {this.state.change24h}$
          </Text>
        </View>
        <View
          style={styles.container}
          scrollEnabled={this.state.scrollEnabled}
        >
         <StockLine data={this.state.pricedata} options={options} xKey='x' yKey='y'/>
        </View>
      </ScrollView>
    );

  }
}
const styles = StyleSheet.create({
    contentContainer: {
    flex: 1,
    flexDirection: "column", // main axis
    justifyContent: "flex-start", // main axis
    alignItems: "stretch", // cross axis
    backgroundColor: "#303F9F",
  },
  row_name: {
    color: "#C5CAE9",
    textAlign: "center",
    includeFontPadding: false,
    flex: 0,
    fontSize: 20,
    fontFamily: "Roboto",
  },
  row_header: {
    flex: 0,
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
    fontSize: 30,
    fontFamily: "Roboto",
  },
  row: {
    elevation: 1,
    borderRadius: 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});
