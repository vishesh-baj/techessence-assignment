import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    roleLabel: "testRoleLabel",
    roleKey: "testRoleKey",
  },
];

const RoleSlice = createSlice({
  name: "role-slice",
  initialState,
  reducers: {
    addRole: (state, action) => {},
    deleteRole: (state, action) => {},
    editRole: (state, action) => {},
    getAllRoles: (state, action) => {},
  },
});

export const { addRole, deleteRole, editRole, getAllRoles } = RoleSlice.actions;
export default RoleSlice.reducer;
