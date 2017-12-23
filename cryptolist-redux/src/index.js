import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainPage from './components/MainPage.jsx';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store, {history} from './store.js'
import { ConnectedRouter} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router'
import Details from './components/Details.jsx';

ReactDOM.render(
<MuiThemeProvider>
    <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/details/:id" component={Details}/>
        </Switch>
    </ConnectedRouter>
    </Provider>
</MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
