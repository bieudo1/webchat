import React from "react";
import { Avatar, Box, Card, Typography, Button,Grid,Link } from "@mui/material";
import {Icon} from "../../components/icon"
import { Link as RouterLink } from "react-router-dom";

function UserCard({ user, handlesetChat, handleOnAddRoom, handleOneDeleteRoom }) {
  const type = user?.type || "user"
  return (
    <>
      <Box onClick={() => handlesetChat(user) }>
        <Card sx={{ display: "flex", alignItems: "center", p: "20px 4px", boxShadow: "unset" }}>
            <Avatar src={user?.avatarUrl} sx={{ width: 40, height: 40 }} />
          <Box sx={{ ml: "4px" }}>
          <Link
              variant="h4"
              sx={{ fontWeight: 600, }}
              onClick = {() => handlesetChat(user)}
              component={RouterLink}
              to={`/${type.toLowerCase()}/${user.id}`}
            >
                <Typography>
                  {user.name}
              </Typography>
              </Link>
              </Box>
        </Card>
      </Box>
    </>
  );
}

export default UserCard


