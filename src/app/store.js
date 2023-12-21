import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import friendReducer from "../features/friend/friendSlice";
import messengerReducer from "../features/messenger/messengerSlice";
import attendanceReducer from "../features/attendance/attendanceSlice"

const rootReducer = combineReducers({
  user: userReducer,
  friend: friendReducer,
  messenger: messengerReducer,
  attendance: attendanceReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
