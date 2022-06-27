import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTemplates: [],
  currentTemplate: null,
  formData: null
}

//Change the logic in the future. Make API calls to store templates on the server
const savedCargoTemplatesSlice = createSlice({
  name: "savedCargoTemplates",
  initialState,
  reducers: {
    saveTemplate: (state, action) => {
      const template = {
        id: state.allTemplates.length + 1,
        name: action.payload.name,
        remark: action.payload.remark,
        data: state.formData
      }
      state.allTemplates.push(template);
    },
    deleteTemplate: (state, action) => {
      state.allTemplates = state.allTemplates.filter((item) => item.id !== action.payload)
    },
    setCurrentTemplate: (state, action) => {
      state.currentTemplate = state.allTemplates.find((item) => item.id === action.payload)
    },
    setFormData: (state, action) => {
      state.formData = action.payload
    }
  },
});

export const { saveTemplate, deleteTemplate, setCurrentTemplate, setFormData } = savedCargoTemplatesSlice.actions;
export default savedCargoTemplatesSlice.reducer;