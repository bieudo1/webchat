import React, { useState,useCallback,useEffect } from "react";
import {
  Box,
  Card, 
  Grid,
  Link,
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
import { FUploadAvatar, FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { Icon } from "../../components/icon"
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth"
import { box_switch, boxAvatar, design_Button_save, design_Button_LogOut } from "../../app/config"
import { fData } from "../../utils/numberFormat";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserProfile } from "./userSlice";
import UpdatePassword from "../../components/updatePassword"
import {centered} from "../../app/config"
import { useNavigate,useLocation, Link as RouterLink } from "react-router-dom";

function CardIndividual({ handleModalIndividual }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [gender, setGender] = useState(user?.gender || "Other");
  const [browse, setBrowse] = useState("Vietnamese")
  const [updatePassword, setUpdatePassword] = useState(false)
  const CSSMobile = location?.pathname === '/admin' ? {width: "auto",height: "calc(100vh - 70px)"} : {width: "910px", height: "650px"}
  const LoginSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
  });
  const defaultValues= {
    name: user.name,
    phone: user?.phone || "",
    avatarUrl: user?.avatarUrl || "",

  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });
  const {
    handleSubmit,
    setValue,
    reset,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;
  const handleSetGender = (event) => {
    setGender(event.target.value);
  }
  const handleSetBrowse = (event) => {
    setBrowse(event.target.value);
  }
  const onSubmit = async (data) => {
    dispatch(updateUserProfile({ userId: user.id, ...data ,gender:gender}));
    handleModalIndividual()
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
  console.log(getValues("name"))
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Box sx={{backgroundColor: "#e0e0e0"}}>
    <>
        <Modal open={updatePassword} onClose={() => setUpdatePassword((state) => !state)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <UpdatePassword user_id={user.id} handleSetUpdatePassword={() => setUpdatePassword((state) => !state)} />
        </Modal>
      </>
      {location?.pathname === '/admin' &&
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
    <Card sx={{ ...CSSMobile, p: 2, textAlign: "center" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={boxAvatar}>
            {location?.pathname !== '/admin' && <Typography>Cá nhân</Typography>}
        <FUploadAvatar
              name="avatarUrl"
            accept="image/*"
            sx={{width:"100px",height: "100px"}}
              maxSize={3145728}
              onDrop={handleDrop}
            />
      </Box>
      <Box sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
        <Grid container >
        <Grid xs={12} md={6}  sx ={{padding: "0 25px" ,display: "flex",flexDirection: "column",justifyContent: "space-between"}}>
          <Box >
          <FTextField
            name="name"
            label="Tên hiển thị *"
            sx={{ mb: 2 }}  
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
            }}
                />
          </Box>
          <Box>                
          <FTextField
            name="phone"
            label="Số điện thoại *"
            sx={{ mb: 2 }}                  
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Icon.Copy/>
                </InputAdornment>
              ),
            }}
                />
          </Box>
          <Box>
                
          <FormControl>
            <RadioGroup
             row
             aria-labelledby="demo-row-radio-buttons-group-label"
             name="row-radio-buttons-group"
              value={gender}
              onChange={handleSetGender}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="Male" control={<Radio />} label="Nam" />
              <FormControlLabel value="Other" control={<Radio />} label="Khác" />                    
            </RadioGroup>
          </FormControl>
          </Box>
              </Grid>
              {location?.pathname !== '/admin' &&
            <Grid xs={12} md={6} sx={{padding: "0 25px",borderLeft: "2px solid #8A9AA9",}}>
          <Box >
            <Box sx={box_switch}>
              <Box sx={{ display: "flex",}}>
                <Icon.Key />
                <Typography  sx={{ml:2}}>Cho phép mọi người tìm thấy tôi</Typography>
              </Box>
              <Switch />
            </Box>
            <Box sx={box_switch}>
            <Box sx={{ display: "flex",}}>
              <Icon.moon />
              <Typography sx={{ml:2}}>Giao diện sáng/ tối</Typography>
            </Box>
              <Switch />
            </Box>
            <Box sx={box_switch}>
            <Box sx={{ display: "flex",}}>
              <Icon.sound_Max />
              <Typography sx={{ml:2}}>Âm thanh</Typography>
            </Box>
              <Switch />     
                </Box>
                <Box sx={box_switch}>
                <Box sx={{ display: "flex",}}>
              <Icon.browse />
              <Typography sx={{ml:2}}>Ngôn ngữ</Typography>
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
                <Box sx={{ display: "flex",}} >
                    <Icon.key_1 />
                  <Button onClick={() => setUpdatePassword((state) => !state)}>
                  <Typography sx={{ ml: 2 }}>Đổi mật khẩu</Typography>
                </Button>
            </Box>
            </Box>
          </Box>
        </Grid> }
            </Grid>
          <Box sx={{ mt: 4, display: "flex",justifyContent: "space-around",width: "60%"}}>
            {location?.pathname !== '/admin' &&
            <Button
              variant="contained"
                sx={design_Button_LogOut}
                onClick={handleLogout}
            >
            Đăng xuất
            </Button>}
          <LoadingButton
          sx={design_Button_save}
          type="submit"
          variant="contained"
          loading={isSubmitting}
          >
         { location?.pathname !== '/admin' ? "Lưu thay đổi" : "Cập nhật hồ sơ"}
          </LoadingButton>
          </Box>
       </Box>
        </FormProvider>
      </Card>
    </Box>
  )
}

export default CardIndividual