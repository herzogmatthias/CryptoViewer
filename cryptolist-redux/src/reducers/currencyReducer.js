export default function reducer(state={
    currencyList : [],
    error : null,
    fetching : false,
    searchString : '',
    EURExchange :0,
}, action){
    switch (action.type) {
        case 'INITIAL_ITEMS':
        return {
            ...state,
            currencyList:action.payload
          }
          // return {
        //     ...state,
        //     items:state.items.push({id:action.items.itemId,item:action.items.item,completed:action.items.completed})
        //   }
        case 'SEARCH_AFTER_CURRENCY':
        return{
            ...state,
            searchString:action.payload
        }
        case 'GET_EURO_MARKETPRICE':
        return{...state, EURExchange: action.payload}
        default:
          return state
            
    }
}