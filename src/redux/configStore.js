import {configureStore} from "@reduxjs/toolkit";
import feedReducer from "./modules/feedSlice"

const store = configureStore( {
  reducer:{
  feed:feedReducer,
} 
} );

export default store;