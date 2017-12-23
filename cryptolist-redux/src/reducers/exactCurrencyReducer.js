export default function reducer(state={
    exactCurrency:{},
    config : {
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
}, action){
    switch (action.type) {
        case "CURRENT_CURRENCY":
            return{...state, exactCurrency: action.payload}
            break;
        
        case "GET_CURRENCY_LIST":
        return{...state, config : action.payload}
        break;

        default:
        return state
            break;
    }
}