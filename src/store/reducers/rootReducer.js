import { combineReducers } from "@reduxjs/toolkit";
import newsReducer from "./newsSlice";
import savedCargoTemplatesReducer from "./savedCargoTemplates";
import savedCarTemplatesReducer from "./savedCarTemplates";
import selectedCitySlice from './selectedCitySlice';

const rootReducer = combineReducers({
    news: newsReducer,
    savedCargoTemplates: savedCargoTemplatesReducer,
    savedCarTemplates: savedCarTemplatesReducer,
    selectedCity: selectedCitySlice
  });
  
  export default rootReducer;