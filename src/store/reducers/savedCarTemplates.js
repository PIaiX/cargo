import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTemplates: [],
  currentTemplate: null,
  formData: null
}

//Change the logic in the future. Make API calls to store templates on the server
const savedCarTemplatesSlice = createSlice({
  name: "savedCarTemplates",
  initialState,
  reducers: {
    saveCarTemplate: (state, action) => {
      const template = {
        id: state.allTemplates.length + 1,
        name: action.payload.name,
        remark: action.payload.remark,
        data: state.formData
      }
      state.allTemplates.push(template);
    },
    deleteCarTemplate: (state, action) => {
      state.allTemplates = state.allTemplates.filter((item) => item.id !== action.payload)
    },
    setCurrentCarTemplate: (state, action) => {
      state.currentTemplate = state.allTemplates.find((item) => item.id === action.payload)
    },
    setCarFormData: (state, action) => {
      state.formData = action.payload
    }
  },
});

export const { saveCarTemplate, deleteCarTemplate, setCurrentCarTemplate, setCarFormData } = savedCarTemplatesSlice.actions;
export default savedCarTemplatesSlice.reducer;