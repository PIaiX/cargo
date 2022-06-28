import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import savedCargoTemplatesReducer from "./savedCargoTemplates";
import savedCarTemplatesReducer from "./savedCarTemplates";

const rootReducer = combineReducers({
    news: newsReducer,
    savedCargoTemplates: savedCargoTemplatesReducer,
    savedCarTemplates: savedCarTemplatesReducer
  });
  
  export default rootReducer;