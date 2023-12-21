import React , { useState,useEffect,useCallback } from "react";
import { Avatar, Box, Card, Typography, Link, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import {Icon} from "./icon" 
import { LoadingButton } from "@mui/lab";
import {FUploadImage,FormProvider} from"./form"

export function BoxMessenger() {
  const defaultValues = {
    file: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    setValue,
  } = methods;
    const [userMessage, setUserMessage] = useState("");
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
      e.preventDefault(); 
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
          <TextField
            value={userMessage}
            placeholder="Tin nhắn"
            onChange={(event) => setUserMessage(event.target.value)}
            sx={{
              width: "80%",
              "& .css-8bgon8-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "50px",
              }
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <Box sx={{display: "flex",}}>
                <Icon.SendPicture/>
                <Icon.Smile/>
              </Box>
              ),
            }}
          />
          <FUploadImage
            name="file"
            accept="image/*"
            maxSize={3145728}
            onDrop={handleDrop}
          />
          <Box>
            <LoadingButton
          type="submit"
            
            >
              <Icon.Message/>
            </LoadingButton>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  )
}

export default BoxMessenger
