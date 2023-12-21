import React , { useState,useEffect } from "react";
import { Button, Box, Card, Typography, Modal, useForkRef } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Icon } from "../../components/icon";
import AttendanceRow from './attendanceRow'
import { design_Button_Confirm,centered } from "../../app/config";
import {checkDay} from "./attendanceSlice"

export function Attendance({handleCloseAttendance}) {
  const { attendance, attendance_Id, pointDate } = useSelector((state) => state.attendance);
  const arrayAttendance = Object.keys(JSON.parse(attendance)).length > 0 ? JSON.parse(attendance) : ""
  const arrayPointDate = Object.keys(JSON.parse(pointDate)).length > 0 ? JSON.parse(pointDate) : ""
  const [controlModal,setControlModal] = useState(false)
  const [confirm,setConfirm] =useState(false)
  const dispatch = useDispatch();
  let weekCheck = arrayPointDate[0]['week']
  let dayCheck = arrayPointDate[0]['day']
  const countTheDays = () => {
    let setday = dayCheck + 1
    let setweek =  weekCheck
    if (setday > 6) {
      setweek += 1 
      setday = 0
    }
      return ([{week:setweek,day:setday}])
  }

  const handleControlModal = () => {
    setControlModal( () => false)
  }

  const handleOnModal = () => {
    setControlModal(() => true)
  }

  const handleConfirm = () => {
    setConfirm( () => true)
    arrayAttendance[weekCheck][`week_${weekCheck + 1}`][dayCheck][`day_${dayCheck + 1}`] = true
    const setPointDate = countTheDays()
    dispatch(checkDay({setPointDate,arrayAttendance,attendance_Id}))
  }

  useEffect(() => {
    let timerId;
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      if (hour === 0 && minute === 0) {
        setConfirm( () => false)
      }
    };
    timerId = setInterval(checkTime, 60 * 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []); 

  return (
    <>
    <Card >
      <Box sx={{position: "relative"}}>
        <Box sx={{textAlign: "center"}}>
          <Typography>Bảng điểm danh <br />hằng ngày</Typography>
        </Box>
        <Box sx={{
          position: "absolute",
          top: 0,
          right: 0,
        }}>
          <Button sx={{ m: "0 10px" }} onClick={() => handleCloseAttendance()}>
            <Icon.close />
          </Button>
          </Box>
      </Box>
      <Box>
          {arrayAttendance.map((week, indexWeek) => {
            return (
              <AttendanceRow week={week} indexWeek={indexWeek} weekCheck={weekCheck} dayCheck={dayCheck} />
            )
          }) 
          }
      </Box>
      <Box sx={{textAlign: "center", mb:1}}>
      <Button sx={design_Button_Confirm} onClick={() =>  confirm ? handleOnModal () : handleConfirm()}>
        xác nhận
      </Button>
      </Box>

    </Card>
      <>
        <Modal
          open={controlModal}
          onClose={handleControlModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <Box sx={{
            backgroundColor: "#fff",
                height:" 200px",
                borderRadius: "25px",
                display: "flex",
                flexDirection: "column",
            alignItems: "center",
                padding:"10px"
          }}>
            <Box sx={{
              width: "100%",
              textAlign:"end"
            }}>

          <Button onClick={() => handleControlModal()} >
            <Icon.close />
            </Button>
            </Box>
            <Box
              sx={{
                marginTop:"40px"
            }}
            >
              
          <Typography>Hôm nay bạn đã điểm danh rồi, vui lòng trở lại vào ngày mai</Typography>
            </Box>
          </Box>
        </Modal>
      </>
      </>

  )

}