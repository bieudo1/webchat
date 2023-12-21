import React, { useState } from "react";
import { Avatar, Box, Card, Typography, Button, InputAdornment } from "@mui/material";
import { Icon } from "../../components/icon"
import {RepairRoom} from "./messengerSlice"
import { useDispatch } from "react-redux";


function DeleteRoom({ addRoom, handleCloseDeleteRoom,handleOnDeleteRoom }) {
  const { room } = addRoom
  console.log(addRoom)
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(RepairRoom({id:room.id}))
    handleCloseDeleteRoom()
  }
  
  return (
    <Card sx={{ width: "300px", height: "150px", }}>
       <Box sx={{textAlign: "end"}}>
        <Button onClick={() =>handleCloseDeleteRoom()}>
          <Icon.close/>
        </Button>
      </Box>
     <Box sx={{mt:2,display: "flex", flexDirection: "column",alignItems: "center",justifyContent: "center"}}>
      <Typography>Bạn có muốn xoá nhóm {room.name}</Typography>
      <Box sx={{width: "100%",display: "flex",justifyContent: "space-around",mt:2}}>
          <Button onClick={() => handleCloseDeleteRoom()}>
         <Icon.cancel/>
        </Button>
          <Button onClick={() =>handleDelete()}>
          <Icon.confirm />
        </Button>
      </Box>
      </Box>
    </Card>
  )
}

export default DeleteRoom