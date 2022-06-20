import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";

const rootReducer = combineReducers({
    news: newsReducer
  });
  
  export default rootReducer;