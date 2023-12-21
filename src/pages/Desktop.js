import React, { useState,useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Box, Grid, Modal,Container, Tab, Tabs,Avatar,Typography,Button} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "../components/icon"
import {BoxChat} from "../features/messenger/BoxChat"
import { useSelector } from "react-redux";
import UserList from "../features/user/UserList"
import CardIndividual from "../features/user/CardIndividual"
import LoadingScreen from "../components/LoadingScreen";
import {Attendance} from "../features/attendance/attendance"
import SearchInput from "../components/SearchInput";
import { design_Button_On,design_Button_OFF,centered ,box_nava} from "../app/config";
import AddRoom from "../features/messenger/AddRoom";
import DeleteRoom from "../features/messenger/DeleteRoom";

function Desktop() {
  const { user } = useAuth();
  const { listFriend,userById } = useSelector((state) => state.user,);
  const { listRoom, roomsById } = useSelector((state) => state.messenger,);
  const [displayAttendance ,setDisplayAttendance] =useState (false)
  const [controlModalAddRoom, setControlModalAddRoom] = useState(false)
  const [controlModalDeleteRoom, setControlModalDeleteRoom] = useState(false)
  const [controlModalIndividual, setControlModalIndividual] = useState(false)
  const [room, setRoom] = useState({})
    const rooms = listRoom.map((roomId) => roomsById[roomId]);
  const users = listFriend.map((userId) => userById[userId]);
  const [typeListChat,TypeListChat] = useState("user")
  const [listChat,SetListChat] = useState(users)
  const [chat, setChat] = useState(listChat[0]);
  const [ feature,setFeature] = useState("Chat")

  useEffect(() => {
    let list =[]
    if(feature === "Chat") {
      list = [...users, ...rooms]
      SetListChat(() => list)
      setChat(() => list[0])
    }
    if (feature === "Phonebook") {
      SetListChat(() => users);
      setChat(() => users[0]);
    }
  }, [listFriend,listRoom,feature]);

  const handleOneAttendance = () => {
    setDisplayAttendance((state) => !state)
  }

  const handleCloseAttendance = () => {
    setDisplayAttendance((state) => !state)
  }

  const handleOneDeleteRoom= (room) => {
    setControlModalDeleteRoom((state) => !state)
    setRoom(()=> room)

  }

  const handleCloseDeleteRoom= () => {
    setControlModalDeleteRoom((state) => !state)
    setRoom(() => {})
  }

  const handleSetListChat = (type) => {
    TypeListChat(type)
    type === "user" && SetListChat(users)
     type === "room" && SetListChat(rooms)
  }

  const handleOnAddRoom = (room,type) => {
    setControlModalAddRoom((state) => !state)
    setRoom(()=> room,type)
  }

  const handleCloseAddRoom = () => {
    setControlModalAddRoom((state) => !state)
    setRoom(() => {})
  }

console.log(chat)
  return (
    <>
      <>
        <Modal open={displayAttendance} onClose={handleCloseAttendance}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <Attendance handleCloseAttendance={handleCloseAttendance } />
        </Modal>
      </>

      <>
        <Modal open={controlModalDeleteRoom} onClose={handleCloseDeleteRoom}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <DeleteRoom addRoom={room} handleCloseDeleteRoom={handleCloseDeleteRoom} handleOneDeleteRoom={handleOneDeleteRoom} />
        </Modal>
      </>

      <>
        <Modal open={controlModalAddRoom} onClose={handleCloseAddRoom}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <AddRoom handleCloseAddRoom={handleCloseAddRoom } addRoom={room}/>
        </Modal>
      </>

       <>
        <Modal open={controlModalIndividual} onClose={() => setControlModalIndividual((state) => !state)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={centered}
        >
          <CardIndividual handleModalIndividual={() => setControlModalIndividual((state) => !state)} />
        </Modal>
      </>
      {!listChat ? (
        <LoadingScreen />
      ) : (
        <>
          <Box sx={{
            display: "flex", pt: 2
            }}>
            <Box sx={{width: "34%",}}>
              <Grid container>
                <Grid xs={12} md={2}>
                    <Box sx={box_nava}>
                      <Box>
                    <Avatar src={user?.avatarUrl} sw={{width: 56,height: 56}}/>  
                      </Box>
                <Grid container sx={{textAlign: "center"}}>
                  <Grid xs={4} md={12}>
                  {/* <Button onClick={()=>handleOneAttendance()}> */}
                  <Button sx={{minWidth: 0}}  onClick={() => setFeature(() => "Phonebook")}>
                    {/* <Icon.attendance /> */}
                    {feature === "Phonebook" ? <Icon.attendance_on  /> : <Icon.attendance_off  />}

                          </Button>
                        </Grid>  
                  <Grid xs={4} md={12}>
                  <Button sx={{minWidth: 0}}  onClick={() => setFeature(() => "Chat")}>
                    {/* <Icon.chat_off  /> */}
                    {feature === "Chat" ? <Icon.chat_on  /> : <Icon.chat_off  />}
                          </Button>
                        </Grid>  
                  <Grid xs={4} md={12}>
                  <Button sx={{minWidth: 0}}  onClick={() => setControlModalIndividual((state) => !state)}>
                    <Icon.People />
                          </Button>
                  </Grid>
              </Grid>
            </Box>
                </Grid>
                <Grid xs={12} md={10}>
                <Box sx={{display: "flex",flexDirection: "column"}}>
                  <Grid container>
                    <Grid xs={12} md={8} sx={{textAlign:"center"}}>
                      <Typography variant="h5" sw={{ fontWeight: "bolder" }} >{feature === "Chat" ? "Trò chuyện" : "Danh bạ"}</Typography>
                    </Grid>
                    <Grid xs={12} md={4} sx={{textAlign:"center"}}>
                      <Box>
                        <Button>
                          <Icon.User />
                        </Button>
                        <Button onClick={() => handleOnAddRoom({type:"create"})}>
                          <Icon.Users />
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
              <Box sx={{
                display: "flex",
                justifyContent: "space-around",
                mb: 2
                }}>
                  {feature === "Chat" ? 
                    <Grid container>
                      {/* <Button variant="contained" sx={ typeListChat === "user" ? design_Button_On : design_Button_OFF } onClick={()=>handleSetListChat("user")}>Tất cả tin nhắn</Button>
                      <Button variant="contained" sx={ typeListChat === "room" ? design_Button_On : design_Button_OFF } onClick={()=>handleSetListChat("room")}>Tin nhắn chưa đọc</Button> */}
                     <Grid xs={12} md={6} sx={{padding: "0 4px"}}>
                      <Button  variant="contained" sx={design_Button_On} >Tất cả tin nhắn</Button>
                     </Grid>
                     <Grid xs={12} md={6} sx={{padding: "0 4px"}}>
                      <Button variant="contained" sx={  design_Button_OFF } >Tin nhắn chưa đọc</Button>
                     </Grid>
                    </Grid>
                    :
                    <Grid container>
                     <Grid xs={12} md={6} sx={{padding: "0 4px"}}>
                      <Button variant="contained" sx={ typeListChat === "user" ? design_Button_On : design_Button_OFF } onClick={()=>handleSetListChat("user")}>Danh sách bạn bè</Button>
                    </Grid>
                     <Grid xs={12} md={6} sx={{padding: "0 4px"}}>
                      <Button variant="contained" sx={ typeListChat === "room" ? design_Button_On : design_Button_OFF } onClick={()=>handleSetListChat("room")}>Danh sách nhóm</Button>
                      </Grid>
                    </Grid>
                  }
                </Box>
              <Box sx={{ textAlign: "center" }}>
                <SearchInput />
              </Box>
              <Box sx={{ mt: 2, overflowY:"auto",height:"calc(100vh - 258px)",maxHeight: "736px"}}>
                  <UserList listUsers={listChat} setChat={setChat} handleOnAddRoom={handleOnAddRoom} handleOneDeleteRoom={handleOneDeleteRoom} />
              </Box>
              </Box>
                </Grid>
              </Grid>
              </Box>
            <Box sx={{width: "66%",}}>
              {!chat ? (
                <LoadingScreen />
              ) : (
                <>
                  <BoxChat chatUser={chat} />
                </>
              )}
              </Box>             
         </Box>
        </>
      )}
  </>
);
}

export default Desktop;
