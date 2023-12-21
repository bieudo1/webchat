import React , { useState,useEffect,useCallback } from "react";
import { Avatar, Box, styled, SvgIcon, Input ,TextField, Button} from "@mui/material";
import { Icon } from "../../components/icon" 
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import io from "socket.io-client";
import { BASE_URL } from "../../app/config";
import {  useDispatch } from "react-redux";
import { sendtMessenger } from "./messengerSlice";
import { FUploadImage, FormProvider ,FTextField,FButtonUPloadFile} from "../../components/form";
import { cloudinaryUpload } from "../../utils/cloudinary";


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
const socket = io(BASE_URL);
const defaultValues = {
  file: "",
  message:""
};
function MessengerInput({ setMessages,user_id,chatUser_id,chat_type }) {
    const dispatch = useDispatch();
  const [userMessage, setUserMessage] = useState("");
    const methods = useForm({
      defaultValues,
    });
    const {
      handleSubmit,
      setValue,
      getValues,
      formState: { isSubmitting },
    } = methods;
  
  useEffect(() => {
    socket.on("message", (message) => {
      dispatch(sendtMessenger(message));
    });
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
    socket.on("error", (error) => {
      console.error(error);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.on("join", (message) => {
    });
    return () => {
      socket.off("message");
      socket.off("error");
      socket.off("disconnect");
      socket.off("join");
    };
  }, []);
  const join = chat_type ? { room_id: chatUser_id,user_id_1: user_id, } : { user_id_1: user_id, user_id_2: chatUser_id }

  useEffect(() => { 
    socket.emit("join", join);
  }, [chatUser_id, chat_type])

  const  handleChange = async(e) => {
    const selectedFile = e.target.files[0];
    // Kiểm tra xem selectedFile có phải là file hay không
    if (selectedFile instanceof File) {
      // Nếu là file, thì tạo một đối tượng file mới với thuộc tính preview
      const file = new File([selectedFile], selectedFile.name, {
        type: selectedFile.type,
        lastModified: selectedFile.lastModified,
      });
      file.preview = URL.createObjectURL(file);
      // Cập nhật state
      const imageUrl = await cloudinaryUpload(file);
      socket.emit("message",{message:imageUrl,user_id_1:user_id,user_id_2:chatUser_id,type:"img"});
    }
    // socket.emit("message",{message:,user_id_1:user_id,user_id_2:chatUser_id,type:"img"});
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "file",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const onSubmit = (e) => {
    socket.emit("message",{message:userMessage,user_id_1:user_id,user_id_2:chatUser_id,type:"text"});
    setUserMessage("");
  };
  return (
    <Box>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding:"14px"
          }}
        >   
          <Box>
            <Icon.Icon1/>
          </Box>
          <FTextField
            name="message"
            // placeholder="Tin nhắn"
            // onChange={(event) => setUserMessage(event.target.value)}
            sx={{
              width: "80%",
              p: "0 6px",
              "& .css-8bgon8-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "50px",
              }
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex", }}>
                  <Button
                    component="label"
                    role={undefined}
                    tabIndex={-1}
                    variant="outlined"
                    sx={{p: 0,border: "unset"}}
                  >
                    <Icon.SendPicture/>
                    <VisuallyHiddenInput type="file" onChange={handleChange}/>
                  </Button>
                <Icon.Smile/>
              </Box>
              ),
            }}
          />
          
          {/* <div>
      <h4>Chọn một file từ máy tính của bạn</h4>
      <input type="file" onChange={handleChange} />
      <button onClick={handleClick}>Đọc file</button>
    </div> */}
          <Box>
            <LoadingButton
              type="submit"
              sx ={{p:0,minWidth:0}}
            >
              <Icon.Message/>
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default MessengerInput
