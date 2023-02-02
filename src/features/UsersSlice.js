import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [
    {
      id: "testId1",
      name: "testName",
      email: "testEmail",
      username: "testUsername",
      mobile: "testMobile",
      roleKey: "testRole",
      password: "testPassword",
    },
    {
      id: "testId2",
      name: "testName1",
      email: "testEmail1",
      username: "testUsername1",
      mobile: "testMobile1",
      roleKey: "testRole1",
      password: "testPassword1",
    },
  ],
};

const UserSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList = [...state.usersList, action.payload];
    },
    deleteUser: (state, action) => {
      state.usersList = state.usersList.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    editUser: (state, action) => {
      console.log(action.payload);
      // state.usersList = state.usersList.findIndex(action.payload);
    },
    getAllUsers: (state, action) => {},
  },
});

export const { addUser, deleteUser, editUser, getAllUsers } = UserSlice.actions;
export default UserSlice.reducer;
