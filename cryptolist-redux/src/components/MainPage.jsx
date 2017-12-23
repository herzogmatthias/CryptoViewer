import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import { loadInitialData, searchAfterCrypto, getEUROExchange } from "../actions/CryptoActions.js";
import { withRouter } from 'react-router-dom'
import io from "socket.io-client"
import { push } from "react-router-redux"
import { bindActionCreators } from 'redux'
import { getExactCurrency } from '../actions/ExactCurrencyActions'


let socket
let searchString
let currentCurrency

class mainPage extends Component {

  componentWillMount() {

    socket = io.connect("http://localhost:1233")
    console.log(socket)
    this.props.initData(socket)
    this.props.getEURO()
    console.log(this.props)
  }
  componentWillUnmount() {
    socket.disconnect()
    alert("Disconnecting Socket as component will unmount")
  }
  updateInputVal(e) {
    searchString = e.target.value
    this.props.search(searchString)
  }
  checkValue(currency) {
    return (currency.name.toUpperCase().indexOf(this.props.searchString.toUpperCase())) === 0;
  }
  render() {
    this.checkValue = this.checkValue.bind(this)
    return (
      <div>

        <AppBar
          title="CryptoViewer"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <hr />
        Search: <TextField hintText="Search after your Currency" input={this.props.searchString} onChange={this.updateInputVal.bind(this)} />
        <hr />
        <List>
        {this.props.cryptoList.map(function (currency) {
          {
            if (this.checkValue(currency)) {
              return (
                <div key={currency.name}>
                  <ListItem primaryText= {currency.name}  secondaryText ={<p>{currency.price_usd}$, {currency.price_usd * this.props.EURExchange}€</p>} secondaryTextLines={2}>
                    <FlatButton onClick={() => {
                      currentCurrency = currency
                      this.props.exactData(currentCurrency)
                      this.props.changePage()
                    }}
                      label="Details" primary={true}></FlatButton>
                  </ListItem>
                </div>
              )
            }

          }
        }, this)
        }
        </List>
        

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/details/' + currentCurrency.symbol),
  initData: () => loadInitialData(socket),
  search: () => searchAfterCrypto(searchString),
  exactData: () => getExactCurrency(currentCurrency),
  getEURO: () => getEUROExchange()
}, dispatch)

function mapStateToProps(state) {
  return { cryptoList: state.currency.currencyList, router: state.router, searchString: state.currency.searchString, EURExchange: state.currency.EURExchange }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));
