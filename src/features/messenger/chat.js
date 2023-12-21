import React, { useState,useEffect } from "react";
import { Avatar, Box, Card, Typography, Link ,Button} from "@mui/material";
import { Icon } from "../../components/icon"
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { BoxChat } from "./BoxChat";

function Chat() { 
  let params = useParams();
  let type = params?.chat
  let typeId = params?.chatId
  const { listFriend,userById } = useSelector((state) => state.user,);
  const { listRoom, roomsById } = useSelector((state) => state.messenger,);
  const chat = type === "user" ? userById[typeId] : roomsById[typeId]


  return (
    <Box>
      <BoxChat chatUser={chat} />
    </Box>
  )
}


export default Chat