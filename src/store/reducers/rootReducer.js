import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import savedCargoTemplatesReducer from "./savedCargoTemplates";
import savedRouteTemplatesReducer from "./savedRouteTemplates";

const rootReducer = combineReducers({
    news: newsReducer,
    savedCargoTemplates: savedCargoTemplatesReducer,
    savedRouteTemplates: savedRouteTemplatesReducer
  });
  
  export default rootReducer;