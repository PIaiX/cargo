import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    token: "",
    user: {
      "id": 37,
      "isBlocked": false,
      "email": "manager@mail.ru",
      "subject": true,
      "firstName": "ihsan",
      "lastName": "izmailov",
      "phone": "+79231312312",
      "companyName": "OOO \"TV OR OG\"",
      "taxIdentificationNumber": 1234567891,
      "city": "Лагань",
      "avatar": "User/cl66jf7kv00b6qsvy3ln7186d.jpg",
      "roleId": 4,
      "createdAt": "2022-07-29T07:51:00.196+00:00",
      "updatedAt": "2022-07-29T14:05:59.457+00:00",
      "endAccessDate": null,
      "fullName": "izmailov ihsan",
      "subjectForUser": "Юр. лицо",
      "roleForUser": "Грузовладелец - перевозчик",
      "createdAtForUser": "29.07.2022",
      "isBlockedForUser": "Нет"
    },
    rememberMe: false,
  },
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.data = action.payload;
    },
    resetCurrentUser: (state, action) => {
      state.data = initialState;
    },
  },
});

export const { setCurrentUser, resetCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;
