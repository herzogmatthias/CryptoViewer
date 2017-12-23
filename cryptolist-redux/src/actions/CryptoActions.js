import axios from "axios";

export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	payload: res
})

export function loadInitialData(socket){
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('getData',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}	
}
export function searchAfterCrypto(input){
	return{
		type: "SEARCH_AFTER_CURRENCY",
		payload: input
	}
	
}
export function getEUROExchange(){
	return (dispatch) => {
		axios.get('https://api.fixer.io/latest?base=USD')
		.then(res => {
			dispatch({type: "GET_EURO_MARKETPRICE", payload: res.data.rates.EUR})
		})
	}
}