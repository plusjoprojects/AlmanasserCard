import CategoriesType from './CategoriesType'

const intintalState = {
    categories_list:[],
    selected_category:{},
    selected_sub_category:{},
    code:'',
    selected_last_categories:null
}


const reducer = (state = intintalState,action) => {
    switch (action.type) {
        case CategoriesType.SET_CATEGORIES:
            return {...state,categories_list:action.payload}
        case CategoriesType.SET_SELECTED_CATEGORIES:
            return {...state,selected_category:action.payload}
        case CategoriesType.SET_SELECTED_SUB_CATEGORIES:
            return {...state,selected_sub_category:action.payload}
        case CategoriesType.SET_CODE:
            return {...state,code:action.payload}
        case CategoriesType.SET_LAST_CATEGORIES:
            return {...state,selected_last_categories:action.payload}
        default:
            return state
    }
}

export default reducer