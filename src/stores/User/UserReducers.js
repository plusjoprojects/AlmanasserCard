import UserTypes from './UserTypes'

const intintalState = {
    user:[],
    order_history:[],
    fav:[],
    lang:{
        title:'en',
        rtl:false
    }
}


const reducer = (state = intintalState,action) => {
    switch (action.type) {
        case UserTypes.SET_USER:
            return { ...state, user: action.payload };
        case UserTypes.SET_ORDER_HISTORY:
            return {...state,order_history:action.payload}
        case UserTypes.SET_FAV:
            return {...state,fav:action.payload}
        case UserTypes.SET_LANG:
            return {...state,lang:action.payload}
        default:
            return state
    }
}

export default reducer