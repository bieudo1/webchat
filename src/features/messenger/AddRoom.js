import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Card, Typography, Button, InputAdornment,Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "../../components/icon"
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FCheckbox, FormProvider, FTextField } from "../../components/form";
import ColUser from "../../components/ColUser";
import splitArray from "../../hooks/splitArray"
import {design_Button} from "../../app/config" 
import {createRoom,addUserToRoom} from "./messengerSlice"
import useAuth from "../../hooks/useAuth"
import { useLocation, Link as RouterLink } from "react-router-dom";

function AddRoom({ type, handleCloseAddRoom }) {
  const location = useLocation();
  const CSSMobile = location?.pathname === "/createroom"?{width: "auto"} :{width: "500px"}
  const { listRoom, roomsById } = useSelector((state) => state.messenger,);
  // let {type} = location?.pathname === "/createroom" ?  "create" : addRoom
  // location?.pathname && {type : "create" }
  const { user } = useAuth();
  const dispatch = useDispatch()
  const LoginSchema = Yup.object().shape({
    name: type !== "add" &&  Yup.string().required("Name is required"),
  });
  const defaultValues= {
    name: "",
  };
  let { listUsers } = useSelector((state) => state.user,);
  // const [listUsersRoom, setListUsersRoom] = useState(type !== "add" ? [] : [...room?.users_id])
  const [listUsersRoom, setListUsersRoom] = useState([])

  if (type !== "add") listUsers = listUsers.filter(userToList => userToList.id !== user.id)
  const { subarray1, subarray2, subarray3 } = splitArray(listUsers)
  
  const handleChange = (event) => {
   ( listUsersRoom.includes(event) )? 
   setListUsersRoom(listUsersRoom.filter(userId => userId !== event))
   :
   setListUsersRoom([...listUsersRoom,event])
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
   const {name} = data
    try {
      type === "add" ? dispatch(addUserToRoom({
        // roomId:room.id,listUsersRoom
      })) :
      dispatch(createRoom({ name, listUsersRoom }))
      handleCloseAddRoom()
    } catch (error) {
      reset();  
      setError("responseError", error);
    }
  };

  return (
    <Box sx={{backgroundColor: "#e0e0e0"}}>
      {
        location?.pathname === "/createroom" &&
        <Box sx={{ display: "flex", height: "50px", alignItems: "center", m: "10px 6px"}}>
          <Link
            variant="h4"
            sx={{ fontWeight: 600, }}
            component={RouterLink}
            to={"/Chat"}
          >
            <Button >
              <Icon.Ext/>
            </Button>
          </Link>
          <Typography>Hồ sơ</Typography>
        </Box>
      }
      <Card sx={{ ...CSSMobile, height: "600px", p: 2, textAlign: "center" }}>
        {
          location?.pathname !== "/createroom" &&
          <Box sx={{ textAlign: "end" }}>
            <Button onClick={() => handleCloseAddRoom()}>
              <Icon.close />
            </Button>
          </Box>}
      <Box sx={{mt:2}}>
      {type === "add" ? 
      <Typography> Thêm thành viên vào nhóm </Typography>
      :
      <Typography> Tạo nhóm</Typography>
        }
        </Box>
      <Box sx={{p:2}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {type === "add" &&
            <Box sx={{height:"50px"}}>
              <Typography sx={{margin:"25px"}}></Typography>
            </Box>
          }
          {type !== "add" &&
            <FTextField
              name="name"
              label="Tên nhóm"
            />
          }
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start",height: "350px" }}>
            {subarray1.length > 0 &&  <ColUser listUser={subarray1} listUsers={listUsersRoom} handleChange={handleChange} /> } 

            { subarray2.length > 0 && <ColUser listUser={subarray2} listUsers={listUsersRoom} handleChange={handleChange} />}

            { subarray3.length > 0 && <ColUser listUser={subarray3} listUsers={listUsersRoom} handleChange={handleChange} />}
          </Box>
          <LoadingButton
          sx={design_Button}
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {type === "add" ? "Xát nhận" : "Tạo nhóm"}
        </LoadingButton>
      </FormProvider>
      </Box>
      </Card>
    </Box>
  )
 }

 export default AddRoom