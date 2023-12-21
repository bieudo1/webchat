import { Avatar, Box, Card, Typography, Button ,InputAdornment,Checkbox} from "@mui/material";
import React from "react";

function ColUser({listUser,listUsers,handleChange}) {
  return (
    <Box>
    {listUser.map((user) => {
      return (
        <Box sx={{display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          pt: 2,
        }}>
          
        <Typography>
          {user.name}
        </Typography>
        <Checkbox
          key={user.id}
          value={user.id}
          label={user.name}
          checked={listUsers.includes(user.id)}
          onChange={() => handleChange(user.id)}
          inputProps={{ 'aria-label': 'controlled' }}
          />
         </Box>
      )
    })}
    </Box>
  );
}

export default ColUser;
