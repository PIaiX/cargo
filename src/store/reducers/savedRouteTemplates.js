import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTemplates: [],
  currentTemplate: null,
  formData: null
}

//Change the logic in the future. Make API calls to store templates on the server
const savedRouteTemplatesSlice = createSlice({
  name: "savedRouteTemplates",
  initialState,
  reducers: {
    saveRouteTemplate: (state, action) => {
      const template = {
        id: state.allTemplates.length + 1,
        name: action.payload.name,
        remark: action.payload.remark,
        data: state.formData
      }
      state.allTemplates.push(template);
    },
    deleteRouteTemplate: (state, action) => {
      state.allTemplates = state.allTemplates.filter((item) => item.id !== action.payload)
    },
    setCurrentRouteTemplate: (state, action) => {
      state.currentTemplate = state.allTemplates.find((item) => item.id === action.payload)
    },
    setRouteFormData: (state, action) => {
      state.formData = action.payload
    }
  },
});

export const { saveRouteTemplate, deleteRouteTemplate, setCurrentRouteTemplate, setRouteFormData } = savedRouteTemplatesSlice.actions;
export default savedRouteTemplatesSlice.reducer;