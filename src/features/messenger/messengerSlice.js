import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  listMessenger: [],
  listRoom: [],
  roomsById: {},
  
};

const slice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    allMessenger(state,action) {
      state.isLoading = false;
      state.error = null;
      state.listMessenger =[ ...action.payload];
    },
    sendtMessenger(state, action) {
      
      state.listMessenger =[ ...state.listMessenger,action.payload];
    },

    allRooms(state, action) {
      state.isLoading = false;
      state.error = null;

      action.payload.forEach((room) => {
        state.roomsById[room.id] = room;
        if (!state.listRoom.includes(room.id))
          state.listRoom.push(room.id);
      });
    },
    createRoomsuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const newRoom = action.payload;
      state.roomsById[newRoom.id] = newRoom;
      state.listRoom.unshift(newRoom.id);
    },
    removeEditSuccess(state,action){
      state.isLoading = false;
      state.error = null;

      const {roomId, editRoom} = action.payload;
      state.roomsById[roomId].users_id= editRoom.users_id;
    },
    removeRoomSuccess(state,action){
      state.isLoading = false;
      state.error = null;
      
      const {id} = action.payload;
      state.roomsById[id]= undefined;
      state.listRoom = state.listRoom.filter( post => post !== id);
    },
  }
})

export default slice.reducer;

export const getListMessengers = ({ user_id_to }) => async (dispatch) => {
  console.log(user_id_to)
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/chat/${user_id_to}`);
    dispatch(slice.actions.allMessenger(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const sendtMessenger = (message) => async (dispatch) => {
  dispatch(slice.actions.sendtMessenger(message));
};

export const getListRooms = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/room");
    dispatch(slice.actions.allRooms(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const addUserToRoom = ({ roomId,listUsersRoom }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  console.log(roomId,listUsersRoom )
  try {
    const response = await apiService.put(`/room/${roomId}`,{user_id:listUsersRoom});
    dispatch(slice.actions.removeEditSuccess({
      roomId,
      editRoom: response
    }));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const createRoom = ({ name, listUsersRoom }) => async (dispatch) => {
  console.log(name, listUsersRoom)
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/room",{ roomName: name,user_id: listUsersRoom,type: "ROOM"});
    dispatch(slice.actions.createRoomsuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const RepairRoom = ({id}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try{
    await apiService.delete(`/room/${id}`)
    dispatch(slice.actions.removeRoomSuccess({id}))
  }catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
}