import React, { useState,useCallback,useEffect } from "react";
import {
  Box,
  Card, 
  Grid, 
  Radio,
  Switch,
  Button,
  Select,
  Modal,
  MenuItem,
  FormGroup,
  Typography, 
  RadioGroup,
  FormControl,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "./icon"
import { useDispatch } from "react-redux";
// import useAuth from "../../hooks/useAuth"
import { box_switch, boxAvatar, design_Button, design_Button_LogOut } from "../app/config"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import UpdatePassword from "./updatePassword"
import useAuth from "../hooks/useAuth"

function Setting({handleExit,setStatusTabbar}) {
  const {  logout } = useAuth();
  const [browse, setBrowse] = useState("Vietnamese")
  const navigate = useNavigate();
  const [type,setType] = useState("Setting")
  const handleSetBrowse = (event) => {
    setBrowse(event.target.value);
  }
  const handleLogout = async () => {
    try {
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box >
      <Box sx= {{display: "flex",alignItems: "center",height:"100px"}}>
      <Button onClick={()=> navigate("/Chat")}>
        <Icon.Ext/> 
      </Button>
      <Box>
        <Typography>{type === "Setting" ? "Cài đặt" : "Đổi mật khẩu"}</Typography>
        </Box>
      </Box>
      <Card sx={{ height: "calc(100vh - 110px)", p: 2, textAlign: "center" }}>
            <Box sx={box_switch}>
              <Box sx={{ display: "flex", }}>
                <Icon.Key />
                <Typography sx={{ ml: 2 }}>Cho phép mọi người tìm thấy tôi</Typography>
              </Box>
              <Switch />
            </Box>
            <Box sx={box_switch}>
              <Box sx={{ display: "flex", }}>
                <Icon.moon />
                <Typography sx={{ ml: 2 }}>Giao diện sáng/ tối</Typography>
              </Box>
              <Switch />
            </Box>
            <Box sx={box_switch}>
              <Box sx={{ display: "flex", }}>
                <Icon.sound_Max />
                <Typography sx={{ ml: 2 }}>Âm thanh</Typography>
              </Box>
              <Switch />
            </Box>
            <Box sx={box_switch}>
              <Box sx={{ display: "flex", }}>
                <Icon.browse />
                <Typography sx={{ ml: 2 }}>Ngôn ngữ</Typography>
              </Box>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={browse}
                onChange={handleSetBrowse}
              >
                <MenuItem value={"English"}>English</MenuItem>
                <MenuItem value={"Vietnamese"}>Vietnamese</MenuItem>
              </Select>
            </Box>
            <Box sx={box_switch}>
              <Box sx={{ display: "flex", }} >
                <Icon.key_1 />
                <Button onClick={() => navigate("/UpdatePassword")}>
                  <Typography sx={{ ml: 2 }}>Đổi mật khẩu</Typography>
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: "100px" }}>
              <Button
                variant="contained"
                sx={design_Button}
                onClick={handleLogout}
              >
                Đăng xuất
              </Button>
            </Box>
      </Card>
  </Box>
  )
}

export default Setting