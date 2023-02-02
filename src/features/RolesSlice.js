import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesList: [
    {
      id: "roleId1",
      roleLabel: "testRoleLabel",
      roleKey: "testRoleKey",
    },
    {
      id: "roleId2",
      roleLabel: "testRoleLabel1",
      roleKey: "testRoleKey1",
    },
  ],
};

const RoleSlice = createSlice({
  name: "role-slice",
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.rolesList = [...state.rolesList, action.payload];
    },
    deleteRole: (state, action) => {
      state.rolesList = state.rolesList.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    editRole: (state, action) => {
      state.rolesList = state.rolesList.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      );
    },
  },
});

export const { addRole, deleteRole, editRole } = RoleSlice.actions;
export default RoleSlice.reducer;
