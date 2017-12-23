import axios from "axios";

let timer = 0

export function getExactCurrency(currency){
    return{
        type : "CURRENT_CURRENCY",
        payload: currency
    }
}
export function getExactCurrencyList(name){
	return (dispatch) => {
        axios.get('http://localhost:8000/getExactCurrency/'+ name)
		.then(res => {
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
            var pricedata = []
            let uniqueArray = [...new Set(res.data)]
            for(let i in uniqueArray){
                pricedata.push(uniqueArray[i].price_usd)
            }
            config.series[0].data = pricedata
            dispatch({type: "GET_CURRENCY_LIST", payload: config})
        })
        timer = setInterval(function(){
            axios.get('http://localhost:8000/getExactCurrency/'+ name)
		.then(res => {
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
            var pricedata = []
            let uniqueArray = [...new Set(res.data)]
            for(let i in uniqueArray){
                pricedata.push(uniqueArray[i].price_usd)
            }
            config.series[0].data = pricedata
			dispatch({type: "GET_CURRENCY_LIST", payload: config})
		})
        }, 300000)
		
	}
}
export function stop(){
    clearInterval(timer)
    return({type:"TIMER_STOP"})
}