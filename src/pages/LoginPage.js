import React, { useState } from "react";
import {
  Link,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { design_Button } from "../app/config";
import {Icon} from "../components/icon"
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  
});

let defaultValuesLogin = {
  email: "",
  password: "",
  name:"",
  remember: true,
};

const defaultValuesRegister = {
  email: "",
  name: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const defaultValues = location.pathname === "/login" ? defaultValuesLogin : defaultValuesRegister
  
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
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate("/Chat", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs" sx ={{textAlign: "center"}}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          

          <FTextField
            name="email"
            label="Tên đăng nhập/ Số điện thoại"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon.Letters />
                </InputAdornment>
              ),
            }}
          />

          <FTextField
            name="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon.Lock />
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
{ location.pathname !== "/login"&&<FTextField
            name="name"
            label="Tên hiển thị"
            sx={{ marginBottom: "16px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon.People />
                </InputAdornment>
              ),
            }}
          />}
        </Stack>
        {location.pathname === "/login" &&
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            // sx={{ my: 2 }}
          >
            <FCheckbox name="remember" label="Ghi nhớ đăng nhập" />
            <Link component={RouterLink} variant="subtitle2" to="/">
              Quên mật khẩu?
            </Link>
          </Stack>
        }
        <LoadingButton
          sx={design_Button}
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Đăng nhập
        </LoadingButton>
        {location.pathname === "/login"?
        <Alert severity="info" sx={{
          marginTop: "40px",
          backgroundColor: "unset",
          justifyContent: "center"
        }}>
        Chưa có tài khoản?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
            Đăng ký
            </Link>
        </Alert> 
        :
        <Alert severity="info" sx={{
          marginTop: "40px",
          backgroundColor: "unset",
          justifyContent: "center"
          }}>
             Đã có tài khoản?{" "}
            <Link variant="subtitle2"  component={RouterLink} to="/login">
            Đăng nhập
            </Link>
          </Alert>
        }
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
