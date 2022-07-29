import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import savedCargoTemplatesReducer from "./savedCargoTemplates";
import savedRouteTemplatesReducer from "./savedRouteTemplates";
import currentUserReducer from "./currentUser"
import selectedCitySlice from './selectedCitySlice';

const rootReducer = combineReducers({
    news: newsReducer,
    savedCargoTemplates: savedCargoTemplatesReducer,
    savedRouteTemplates: savedRouteTemplatesReducer,
    selectedCity: selectedCitySlice,
    currentUser: currentUserReducer
  });
  
  export default rootReducer;