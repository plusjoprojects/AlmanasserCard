import CategoriesType from './CategoriesType'

export const setCategories = item => {
    return {
        type:CategoriesType.SET_CATEGORIES,
        payload:item
    }
}

export const setSelectedCategories = item => {
    return {
        type:CategoriesType.SET_SELECTED_CATEGORIES,
        payload:item
    }
}

export const setSelectedSubCategories = item => {
    return {
        type:CategoriesType.SET_SELECTED_SUB_CATEGORIES,
        payload:item
    }
}

export const setCode = item => {
    return {
        type:CategoriesType.SET_CODE,
        payload:item
    }
}

export const setLastCategories = item => {
    return {
        type:CategoriesType.SET_LAST_CATEGORIES,
        payload:item
    }
}