
import { combineReducers } from "redux"

import currency from './currencyReducer.js'
import exactCurrency from './exactCurrencyReducer.js'
import { routerReducer } from "react-router-redux";

export default combineReducers({
    currency,
    exactCurrency,
    router: routerReducer
})