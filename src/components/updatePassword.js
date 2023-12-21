import React,{useState,useEffect} from "react";
import { IconButton, Box, Card, Typography, Button,InputAdornment,Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, FTextField, FUploadAvatar } from "./form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { putUpdatePassword } from "../features/user/userSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {box_UpdatePassword,design_Button,CSSMobile} from "../app/config"
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth"
import { Icon } from "./icon";
import {useNavigate,useLocation, Link as RouterLink } from "react-router-dom";
function UpdatePassword({ handleSetUpdatePassword,type }) {
  const { user } = useAuth()
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch()

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Phone is required").oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu không hợp lệ"),
  });

  const defaultValues= {
    password: "",
    confirmPassword:"",
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
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    const { password } = data
    dispatch(putUpdatePassword({ user_id: user.id, password }))
    handleSetUpdatePassword()
  }

  return (
    <Box sx={{ backgroundColor: "#e0e0e0" }}>
      {
        location?.pathname === "/UpdatePassword" &&
        <Box sx={{ display: "flex", height: "50px", alignItems: "center", m: "10px 6px"}}>
          <Link
              variant="h4"
              // onClick={() => navigate("/Setting")}
            sx={{ fontWeight: 600, }}
            component={RouterLink}
            to={"/Setting"}
          >
            <Button >
              <Icon.Ext/>
            </Button>
          </Link>
          <Typography>Hồ sơ</Typography>
        </Box>
      }
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx= { location.pathname === "/UpdatePassword" ? CSSMobile : box_UpdatePassword }>
          {location.pathname !== "/UpdatePassword" && <Typography>Đổi mật khẩu</Typography>}
          <Box>
    <FTextField
            name="password"
            label="Mật khẩu"
            sx={{ mb: 2 }}  
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
        />
        <FTextField
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            sx={{ mb: 2 }}  
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />
            </Box>
        <LoadingButton
          sx={design_Button}
          type="submit"
          variant="contained"
          loading={isSubmitting}
          >
          Cập nhật mật khẩu
          </LoadingButton>
    </Card>
    </FormProvider>
    </Box>

  )
}

export default UpdatePassword