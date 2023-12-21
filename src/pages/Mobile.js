import React, { useState,useEffect } from "react";
import { Box,Card, Grid, Link, Container, Tab, Tabs, Avatar, Typography, Button, } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import UserList from "../features/user/UserList";
import {ButtonON,ButtonOFF,fontSize, tabbar,design_Button_On,design_Button_OFF,centered ,box_nava,bothSides,rounded} from "../app/config";
import { Icon } from "../components/icon"
import useAuth from "../hooks/useAuth";
import Setting from "../components/Setting"

import {useNavigate, useLocation,Link as RouterLink } from "react-router-dom";

function Mobile() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { listFriend,userById } = useSelector((state) => state.user,);
  const { listRoom, roomsById } = useSelector((state) => state.messenger,);
  const  feature = location.pathname
  const [room, setRoom] = useState({})
  const [typeListChat,TypeListChat] = useState("user")
  const [listChat, SetListChat] = useState(listFriend)
  const [chat, setChat] = useState();
  const rooms = listRoom.map((roomId) => roomsById[roomId]);
  const users = listFriend.map((userId) => userById[userId]);

  const [statusTabbar, setStatusTabbar] = useState(true)

  useEffect(() => {
    let list =[]
    if(feature === "/Chat") {
      list = [...users, ...rooms]
      SetListChat(() => list)
    }
    if (feature === "/Phonebook") {
      SetListChat(() => users);
      typeListChat == "user" && SetListChat(() => users);
      typeListChat == "room" && SetListChat(() => rooms);
    }

  }, [listFriend, listRoom, feature,typeListChat]);

  const handleTabBar = (type) => {
    navigate(`/${type}`);
  }
  const handleOnAddRoom = (room,type) => {

  }
  const handleOneDeleteRoom= (room) => {

  }
  return (
    <Container sx={{p: "16px 0 0 0",backgroundColor: "#e0e0e0",position: "relative"}}>
      {feature === "/Setting" ? (
        <Setting  setStatusTabbar={(start) => start} />
          ) : ( 
          <>
            <Box sx ={bothSides}>
              <Box sx={{ display: "flex", alignItems: "center", }}>
              <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              component={RouterLink}
              to={"/admin"}
            >
                  <Avatar src={user?.avatarUrl} sw={{ width: 56, height: 56, }} />
                  </Link>
                <Box  sx={{ml:2}}>
                <Typography>{user.name}</Typography>
                </Box>
              </Box>
              <Box>
              <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              component={RouterLink}
              to={""}
            >
                <Button>
                  <Icon.User />
                  </Button>
                  </Link>
                  
                <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              component={RouterLink}
              to={"/createroom"}
            >
                <Button>
                  <Icon.Users />
                  </Button>
                  </Link>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Card sx={{ ...bothSides, ...rounded }}>
                {feature === "/Chat" ?
                  <>
                    <Button sx={ButtonON}>Tất cả tin nhắn</Button>
                    <Button sx={ButtonOFF} >Tin nhắn chưa đọc</Button>
                  </>
                  :
                  <>
                    <Button sx={ typeListChat === "user" ? ButtonON : ButtonOFF } onClick={()=>TypeListChat(() => ("user"))}>Danh sách bạn bè</Button>
                    <Button sx={ typeListChat === "room" ? ButtonON : ButtonOFF } onClick={()=>TypeListChat(() => ("room"))}>Danh sách nhóm</Button>
                  </>
                }
              </Card>
            </Box>
            <Box sx={{height: "calc(100vh - 142px)",overflowY:"auto"}}>
              <Card sx={{height: "-webkit-fill-available"}}>
                <UserList listUsers={listChat} setChat={setChat} handleOnAddRoom={handleOnAddRoom} handleOneDeleteRoom={handleOneDeleteRoom} />
              </Card>
            </Box>
        </>
        )
      }

      <Box sx={{...bothSides,...tabbar}}>
        <Button sx={{...fontSize,...centered,flexDirection: "column", color: "#000"}} onClick={() => handleTabBar("Phonebook")}> {feature === "/Phonebook" ? <Icon.attendance_on  /> : <Icon.attendance_off  />}Danh bạ </Button>
        <Button sx={{...fontSize,...centered,flexDirection: "column", color: "#000"}} onClick={() => handleTabBar("Chat")}> {feature === "/Chat" ? <Icon.chat_on  /> : <Icon.chat_off  />} Trò chuyện</Button>
        <Button sx={{ ...fontSize, ...centered, flexDirection: "column", color: "#000" }} onClick={() => handleTabBar("Setting")}> {feature === "/Setting" ? <Icon.SettingOn /> : <Icon.SettingOff />} Cài đặt</Button>
        </Box>
    </Container> 
  )
}
export default Mobile;
