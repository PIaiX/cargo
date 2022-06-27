import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import savedCargoTemplatesReducer from "./savedCargoTemplates";

const rootReducer = combineReducers({
    news: newsReducer,
    savedCargoTemplates: savedCargoTemplatesReducer
  });
  
  export default rootReducer;