import React, { useEffect } from "react";
import { getListUsers } from "../features/user/userSlice";
import {getAttendance} from "../features/attendance/attendanceSlice"
import { getListRooms } from "../features/messenger/messengerSlice";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Desktop from "./Desktop"
import Mobile from "./Mobile"
import useAuth from "../hooks/useAuth";
var UAParser = require('ua-parser-js');

function HomePage() {
  let parser = new UAParser();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const isMobile = parser.getDevice();
  useEffect(() => {
    dispatch(getListUsers(user));
    dispatch(getListRooms());
    dispatch(getAttendance())
  }, []);
const  arr = []

for (let i = 0; i < 48; i++) {
  arr[i] = i + 3;
}

console.log(arr)

  return (
    <>
      {(isMobile.type === "mobile" ) ? (
        <Mobile/>
        )
        : (
          <Desktop/>
        )
      }
    
    </>
);
}

export default HomePage;
