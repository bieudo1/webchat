import React, { useState,useEffect } from "react";
import { Avatar, Box, Link, Typography, Button } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Icon } from "../../components/icon"
import { getListMessengers } from "./messengerSlice";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "../../components/LoadingScreen";
import MessengerInput from './MessengerInput'
import MessengersList from './messengersList'
import {useLocation, Link as RouterLink } from "react-router-dom";

import BoxMessenger from "../../components/BoxMessenger"
export function BoxChat({ chatUser }) { 
  const { user } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { listMessenger, isLoading } = useSelector((state) => state.messenger,);
  useEffect(() => {
    dispatch(getListMessengers({
      user_id_to: chatUser.id,
    }));
  }, [chatUser.id,chatUser.name]);

  useEffect(() => {
    setMessages( () => listMessenger)
},[listMessenger])
console.log(location.pathname)
  return (
    <>
      <Box sx={{ width: "100%", }}>
        {location.pathname !== "/" &&
          <Box sx={{ display: "flex", height: "50px", alignItems: "center", m: "10px 6px" }}>
            <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              component={RouterLink}
              to={"/"}
            >
              <Button >
                <Icon.Ext />
              </Button>
            </Link>
            <Avatar src={chatUser?.avatarUrl} sx={{ width: 48, height: 48 }} />
            <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
              <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                <Typography>
                  {chatUser.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        }
            <Box sx={{backgroundColor:"#FAF7F6", height:"calc(100vh - 164px)", marginTop: "10px",overflowY:"auto",}}>
            {messages ? (
              <MessengersList listMessenges={messages} user={user} />
              ) : 
              null
            }
            </Box>
              <Box sx={{height:"80px"}}>
              <MessengerInput setMessages={setMessages} user_id={user.id} chatUser_id={chatUser.id} chat_type={chatUser?.type} />   
        </Box>
          </Box>
       
    </>
  )
}