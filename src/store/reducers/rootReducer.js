import { combineReducers } from "@reduxjs/toolkit";
import savedCargoTemplatesReducer from "./savedCargoTemplates";
import savedRouteTemplatesReducer from "./savedRouteTemplates";
import currentUserReducer from "./currentUser"
import selectedCitySlice from './selectedCitySlice';
import alert from './alert';

const rootReducer = combineReducers({
    savedCargoTemplates: savedCargoTemplatesReducer,
    savedRouteTemplates: savedRouteTemplatesReducer,
    selectedCity: selectedCitySlice,
    currentUser: currentUserReducer,
    alert
  });
  
  export default rootReducer;