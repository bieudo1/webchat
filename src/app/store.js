import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";
import friendReducer from "../features/friend/friendSlice";
import messengerReducer from "../features/messenger/messengerSlice";
import attendanceReducer from "../features/attendance/attendanceSlice"

const rootReducer = combineReducers({
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  friend: friendReducer,
  messenger: messengerReducer,
  attendance: attendanceReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
