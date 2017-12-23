import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import { withRouter } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import { bindActionCreators } from 'redux'
import { getExactCurrencyList,stop } from '../actions/ExactCurrencyActions'
const ReactHighcharts = require('react-highcharts');

let change1h
let name
let pricedata
let change24h
let img_change1h
let img_change24h
let intervalId = 0
let counter = 0
class Details extends Component {

    componentWillMount() {
        name = this.props.exactCurrency.name
        
        console.log(intervalId)
        change1h = (this.props.exactCurrency.price_usd * this.props.exactCurrency.percent_change_1h) / 100
        change24h = (this.props.exactCurrency.price_usd * this.props.exactCurrency.percent_change_24h) / 100
        if (change1h > 0)
            img_change1h = 'greenArrowUp.png'
        else
            img_change1h = 'redArrowDown.png'

        if (change24h > 0)
            img_change24h = 'greenArrowUp.png'
        else
            img_change24h = 'redArrowDown.png'
    }
    componentDidMount() {
        this.props.getExactList();
        this.props.config.title.text = this.props.exactCurrency.name
        
        
    }
    componentWillUnmount() {
        this.props.stopTimer()
    }
    render() {
        return (
            <div>
                <AppBar
                    title={this.props.exactCurrency.name}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Table>
                    <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{font: 50}}>Details</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>
                                <b>Change in 1 Hour: {change1h}$</b>
                                <img src={require('../img/' + img_change1h)} width='20px' height='20px' />
                            </TableRowColumn>

                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                <b>Change in 24 Hours: {change24h}$</b>
                                <img src={require('../img/' + img_change24h)} width='20px' height='20px' />
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                <b>Price in Bitcoin: {this.props.exactCurrency.price_btc}</b>
                                <img src={require('../img/bitcoin.jpg')} width='30px' height='30px' />
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>


                </Table>
                <ReactHighcharts config={this.props.config} ref="chart">
            </ReactHighcharts>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { exactCurrency: state.exactCurrency.exactCurrency, config : state.exactCurrency.config }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getExactList : () => getExactCurrencyList(name),
    stopTimer : () =>  stop()
  }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));