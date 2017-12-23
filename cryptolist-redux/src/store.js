import reducer from './reducers/index.js'
import { createStore, applyMiddleware } from 'redux'


import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware';


export const history = createHistory()



const middleware = applyMiddleware(routerMiddleware(history), promise(), thunk, logger)

export default createStore(reducer, middleware)