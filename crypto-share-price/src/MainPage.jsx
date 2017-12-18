import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import openSocket from 'socket.io-client';
let socket = openSocket('http://localhost:1233');

export class mainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cryptoList: [],
            EurExchange: 0,
            inputVal: ''
        }
    }
    componentDidMount() {
        /* this.getCryptoData();
        var intervalId = setInterval(this.getCryptoData.bind(this), 300000);
        this.setState({ intervalId: intervalId });
        */
        if(!socket.connected){
            socket = openSocket.connect('http://localhost:1233')
        }
        axios.get('https://api.fixer.io/latest?base=USD')
        
           .then(res => {
                console.log(res.data.rates.EUR)
                const eur = res.data.rates.EUR
                this.setState({ EurExchange: eur })
                console.log(this.state.EurExchange);
                this.getCryptoData();
                
            }) 
            

    }
    getCryptoData(){
        socket.on('getData', (data) => {
            console.log(data);
            this.setState({cryptoList : data})
        });
    }

    validFilter(pers){
        return (pers.name.toUpperCase().indexOf(this.state.inputVal.toUpperCase()))=== 0;
      }
    updateInputVal(e){
        this.setState({inputVal : e.target.value});
      }
    
    componentWillUnmount() {
        socket.close();
        
    }
    render() {
        this.validFilter = this.validFilter.bind(this)
        this.getCryptoData = this.getCryptoData.bind(this)
        return (
            <div>
                <h1>Crypto Currencies</h1>
                <hr />
                Search: <input value={this.state.inputVal} onChange={this.updateInputVal.bind(this)}/>
                <hr/>
                <ul>
                    {this.state.cryptoList.map(function (post) {
                        if(this.validFilter(post)){

                        
                        return (
                            <div>
                                
                                <li key={post.id}>{post.name}, {post.symbol}, <b style={{ color: 'green' }}>{post.price_usd}$</b> ~ <b style={{ color: 'red' }}>{post.price_usd * this.state.EurExchange}€</b></li>
                                <Link to={{ pathname: '/cryptodetail/' + post.symbol, state: {crypDetail : post}}}>
                                    <img src={require('./img/link.jpg')} width='20px' height='20px'/>
                                </Link>
                            </div>

                        );
                    }

                    }, this)}
                </ul>
            </div>
        )

    }
}
export default withRouter(mainPage);