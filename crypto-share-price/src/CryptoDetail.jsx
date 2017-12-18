
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Highcharts from 'highcharts';
import ReactDOM from 'react-dom';
import { map, reduce, unique } from 'underscore'
const ReactHighcharts = require('react-highcharts');
var config = {
    title: {
        text: ""
    },
    xAxis: {
        categories: []
    },
    series: [{
        data: [],
        name : 'market Price'
      }]
}
export class cryptoDetail extends Component {
    constructor() {
        super()
        this.state = {
            crypto: {},
            change1h: 0,
            change24h: 0,
            Arrow1h: '',
            Arrow24h:'',
            intervalid: 0,
            data : [],
            pricedata : [],
        }

    }
    
    componentWillMount() {
        
        
        //config.xAxis.categories = ["this", "is"]
        let price = 0
        price = (this.props.location.state.crypDetail.price_usd * this.props.location.state.crypDetail.percent_change_1h) / 100
        this.setState({ change1h: price })
        if (price > 0)
            this.setState({ Arrow1h: 'greenArrowUp.png' })
        else
            this.setState({ Arrow1h: 'Red_Arrow_Down.svg' })

        price = 0
        price = (this.props.location.state.crypDetail.price_usd * this.props.location.state.crypDetail.percent_change_24h) / 100
        this.setState({ change24h: price })
        if (price > 0)
        this.setState({ Arrow24h: 'greenArrowUp.png' })
    else
        this.setState({ Arrow24h: 'Red_Arrow_Down.svg' })

    }
    getData(){
        
        var cryptoName = this.props.location.state.crypDetail.name;
        axios.get('http://localhost:8000/getExactCurrency/'+this.props.location.state.crypDetail.name)
        .then(res =>{
           
            console.log(res)
            var filteredRes = res.data.filter(function(item, pos, self){
                return item.name == cryptoName
            })
            let uniqueArray = [...new Set(filteredRes)]
            
            console.log(uniqueArray)
            var pricedata = [];
            var datedata = [];
           this.setState({data : []});
            this.setState({data : uniqueArray});

            for(let i in uniqueArray){
                pricedata.push(uniqueArray[i].price_usd)
                datedata.push(uniqueArray[i].dateval)
            }
            var chart = this.refs.chart.getChart();
            config.xAxis.categories = datedata
            chart.series[0].setData(pricedata, true);
            console.log(chart.series[0].data)
            chart.series[0].remove(true);
            this.setState({pricedata : []})
            this.setState({pricedata : pricedata})
            res.data = []
            pricedata = []
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.intervalid)
        let chart = this.refs.chart.getChart();
        console.log(chart.xAxis.categories)
        
        chart.series[0].remove();
    }
    componentDidMount(){
        config.title.text = this.props.location.state.crypDetail.name
        this.getData();
        
        var intervalId = setInterval(this.getData, 300000)
        this.setState({intervalId : intervalId})
        this.setState({ crypto: this.props.location.state.crypDetail })
        /*console.log('Hello:');
        console.log ( this.state.pricedata);
        let exCur = this.state.pricedata
        let uniqueArray = exCur.filter(function(item, pos, self) {
            return self.indexOf(item) == pos;
        })
        */
        
    }
    render() {
        //console.log(this.state.data)
        this.getData = this.getData.bind(this)
        
        if(!this.state.data){
            return  <div>Loading...</div>
        }
        
        return (
            <div>
                <h1>
                    {this.state.crypto.name}
                </h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <b>Change in 1 Hour: {this.state.change1h}$</b>
                                <img src={require('./img/' + this.state.Arrow1h)} width='20px' height='20px' />
                            </td>
                            
                        </tr>
                        <tr>
                        <td>
                            <b>Change in 24 Hours: {this.state.change24h}$</b>
                                <img src={require('./img/' + this.state.Arrow24h)} width='20px' height='20px' />
                            </td>
                        </tr>
                        <tr>
                        <td>
                            
                            </td>
                        </tr>
                    </tbody>

                
                </table>
                <ReactHighcharts config={config} ref="chart">
            </ReactHighcharts>
            </div>
        )

    }
}
export default withRouter(cryptoDetail)