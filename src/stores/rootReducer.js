import {combineReducers} from 'redux'
import CategoriesReducers from './Categories/CategoriesReducers'
import UserReducers from './User/UserReducers'
const rootReducer = combineReducers({
  categories: CategoriesReducers,
  user:UserReducers
 
});

export default rootReducer;