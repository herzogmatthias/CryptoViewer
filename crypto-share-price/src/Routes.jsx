import { cryptoDetail } from './CryptoDetail.jsx';
import { mainPage } from './MainPage.jsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Router, Route, browserHistory, Switch } from 'react-router-dom'


class Routes extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={mainPage} />
                    <Route path='/cryptodetail/:currency' component={cryptoDetail}/>
                </Switch>
            </main>
        )
    }
}

export default Routes
