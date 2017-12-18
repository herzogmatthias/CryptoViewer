import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, FlatList, ActivityIndicator, StatusBar, AppRegistry} from 'react-native';
import io from 'socket.io-client';
import{Button} from 'react-native-elements'
import axios from 'axios'
import Expo from 'expo';
import { StackNavigator} from 'react-navigation';
import CryptoDetails from './CryptoDetails.js';
let socket = io('http://10.0.0.2:1233');

class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cryptoList : [],
      isLoading : true,
      EurExchange : 0
    }
    
  }
  static navigationOptions = {
    title: 'Crypto-App',
    headerStyle:{
      backgroundColor: '#3F51B5',
    },
    headerTitleStyle: { color: 'white' },
    
  };
  componentWillMount(){
    if(!socket.connected){
      socket = io.connect('http://172.18.251.55:1233')
    }
    axios.get('https://api.fixer.io/latest?base=USD')
    
       .then(res => {
            console.log(res.data.rates.EUR)
            const eur = res.data.rates.EUR
            this.setState({ EurExchange: eur })
            console.log(this.state.EurExchange);
            
        }) 
        this.getCryptoData();
  }
  
  getCryptoData(){
    socket.on('getData', (data) => {
      console.log(data);
      this.setState({cryptoList : data, isLoading : false})
    });
    console.log(this.state.cryptoList)
  }
  componentWillUnmount() {
    socket.close();
    
}
  render() {
    const { navigate } = this.props.navigation;
    this.getCryptoData = this.getCryptoData.bind(this)
    if (this.state.isLoading) {
      return (
        <View>
           
          <ActivityIndicator 
          color = '#bc2b78'
          size = "large"
          style = {styles.activityIndicator}
          />
        </View>
      );
    }
    return (
      
      <View style={styles.v_container}>
        
      <StatusBar hidden = {true} translucent={false} />
        <FlatList data={this.state.cryptoList} style={styles.container} 
         renderItem={({item}) =>
         <View style={styles.row}>
               <Text style={styles.row_name}>{item.name} {"\n"}</Text>
               <Text style={styles.row_price_usd}>{item.price_usd}$</Text>
               <Text style={styles.row_price_eur}>{item.price_usd * this.state.EurExchange}€</Text>
               <Button
                small
                buttonStyle={{backgroundColor: '#03A9F4'}}
                title='Details'
                onPress={()=> navigate('Details', {CurrencyDetails : item}) } />
          </View>
         }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  v_container: {
    flex: 1,
    padding: 8,
    flexDirection: 'column', // main axis
    justifyContent: 'center', // main axis
    alignItems: 'stretch', // cross axis
    backgroundColor: '#303F9F',
    
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 },
 container: {
  marginTop: 14,
  alignSelf: "stretch",
},
row: {
  elevation: 1,
  borderRadius: 2,
  flex: 1,
  backgroundColor: '#C5CAE9',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 18,
  paddingRight: 16,
  marginLeft: 14,
  marginRight: 14,
  marginTop: 0,
  marginBottom: 6,
},
row_price_usd: {
  color: '#757575',
  textAlignVertical: 'bottom',
  includeFontPadding: false,
  flex: 0,
  fontSize: 15,
  fontFamily: 'Roboto',
},
row_price_eur: {
  color: '#757575',
  textAlignVertical: 'bottom',
  includeFontPadding: false,
  flex: 0,
  fontSize: 15,
  fontFamily: 'Roboto',
},
row_name: {
  color: '#212121',
  textAlignVertical: 'top',
  includeFontPadding: false,
  flex: 0,
  fontSize: 20,
  fontFamily: 'Roboto',
},
});
const SimpleApp = StackNavigator({
  Home: { screen: MainPage },
  Details: {screen : CryptoDetails}
});

export default SimpleApp;