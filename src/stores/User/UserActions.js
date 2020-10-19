import UserTypes from './UserTypes'

export const setUser = item => {
    return {
        type:UserTypes.SET_USER,
        payload:item
    }
}

export const setOrderHistory = item => {
    return {
        type:UserTypes.SET_ORDER_HISTORY,
        payload:item
    }
}

export const setFav = item => {
    return {
        type:UserTypes.SET_FAV,
        payload:item
    }
}

export const SetLanguage = (item) => {
  return {
    type: UserTypes.SET_LANG,
    payload: item,
  };
};