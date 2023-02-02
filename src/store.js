import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./features/UsersSlice";
import RoleSliceReducer from "./features/RolesSlice";
const store = configureStore({
  reducer: {
    users: UserSliceReducer,
    roles: RoleSliceReducer,
  },
});

export default store;
