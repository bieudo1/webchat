import React , { useState,useEffect } from "react";
import { Button, Box, Card, Typography, Link } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Icon } from "../../components/icon";
import { boxYesterday,boxNextDay,boxDay } from "../../app/config";


function AttendanceRow({ week, indexWeek, weekCheck, dayCheck }) { 
  
  const beforeDayCheck = (weekCheck * 7) + (dayCheck + 1)
  console.log(beforeDayCheck)
  //((indexWeek * 7) + indexday + 1) < beforeDayCheck ? boxNextDay  : boxYesterday
  return (
    <Box sx={{display: "flex",justifyContent: "space-around",m:2,}}>
      {week[`week_${indexWeek + 1}`].map((day, indexday) => {
        return (
          <Card className="day" sx={{ m: 1 }}>
            {((indexWeek * 7) + indexday + 1) < beforeDayCheck ?
           (  <Box sx={day[`day_${indexday + 1}`] ? boxYesterday : boxNextDay}>
             <Typography sx={boxDay}>
               {`${(indexWeek * 7) + indexday + 1}`}
             </Typography>
               <Box sx={{position: "absolute"}}>
                 {day[`day_${indexday + 1}`] && <Icon.Check />}
               </Box>
              </Box>
              ) : 
              (
                <Box >
             <Typography sx={boxDay}>
               {`${(indexWeek * 7) + indexday + 1}`}
             </Typography>
              </Box>
              )}
            {/* <Box>
              <Typography sx={boxDay}>
                {`${(indexWeek * 7) + indexday + 1}`}
              </Typography>
                <Box sx={{position: "absolute"}}>
                  {day[`day_${indexday + 1}`] && <Icon.Check />}
                </Box>
              </Box> */}
          </Card>
        )
      })}
    </Box>
  )
}

export default AttendanceRow