import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [
    {
      name: "testName",
      email: "testEmail",
      username: "testUsername",
      mobile: "testMobile",
      roleKey: "testRole",
      password: "testPassword",
    },
    {
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
    addUser: (state, action) => {},
    deleteUser: (state, action) => {
      state.usersList = state.usersList.filter(
        (item) => item.name !== action.payload.name
      );
    },
    editUser: (state, action) => {},
    getAllUsers: (state, action) => {},
  },
});

export const { addUser, deleteUser, editUser, getAllUsers } = UserSlice.actions;
export default UserSlice.reducer;
