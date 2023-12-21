import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState} from "react";
import { Box, Typography,Modal,Button,Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import  UserCard  from "./UserCard"
import {useNavigate } from "react-router-dom";

function UserList({ listUsers, setChat ,handleOnAddRoom,handleOneDeleteRoom}) { 
  const navigate = useNavigate();

  const handlesetChat = (user) => {
    setChat(user)
  };

  return (
  <Box>
    {listUsers.map((user) => (
      <UserCard key={user.id} user={user} handlesetChat={handlesetChat} handleOnAddRoom={handleOnAddRoom} handleOneDeleteRoom={handleOneDeleteRoom} />
    ))}
  </Box>
)
}
export default UserList;

