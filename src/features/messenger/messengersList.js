import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState} from "react";
import { Box, Typography,Modal,Button,Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import  MessengeCard  from "./messengerCard"
import { location_MessengeCard_To } from "../../app/config";


function MessengersList({ listMessenges,user }) { 
  return (
  <>
      {listMessenges.map((Messenge) => (
      <Box sx={Messenge.user_id === user.id && location_MessengeCard_To } >
        <MessengeCard key={Messenge.id} messenge={Messenge} user={user} />
      </Box>
    ))}
  </>
)
}
export default MessengersList;

