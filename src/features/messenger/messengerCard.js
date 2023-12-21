import React from "react";
import { Avatar, Box, Card, Typography, Link } from "@mui/material";
import {messengerCard_Friend,messengerCard_user }  from "../../app/config"; 


function MessengerCard({ messenge, user }) {
  console.log(messenge)
   
   return (
     <>
       <Card
         sx={ messenge.user_id !== user.id  ? messengerCard_user : messengerCard_Friend }>
         <Box sx={{ display: "flex", mb:1}}>
          <Avatar sx={{ width: 24, height: 24 }} />
          <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start",flexDirection: "column"}}>
              <Typography>
                {messenge.author}
              </Typography>
            </Box>
           </Box>
         </Box>
         <Box sx={{ flexGrow: 1, minWidth: 0 }}>
           <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
             {messenge.type === "img" ?
               <img src={messenge.message} style={{width:"400px"}}/> :
             
              <Typography>
              {messenge.message}
              </Typography>
            }
            </Box>
          </Box>
      </Card>
     </>
  );
}

export default MessengerCard


