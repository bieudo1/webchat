import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";
// import  JSONService  from "../../hooks/jsonService"

const initialState = {
  isLoading: false,
  error: null,
  // listMessenger: [],
  attendance: null,
  attendance_Id: null,
  pointDate:null
};

const slice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    attendance(state,action) {
      state.isLoading = false;
      state.error = null;

      state.attendance_Id = action.payload.id
      state.attendance = action.payload.calendar;
      state.pointDate = action.payload.pointDate
    },
  }
})

export default slice.reducer;

export const getAttendance = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    let response = await apiService.get(`/attendance`);
    // response.pointDate = Object.keys(JSON.parse(response.pointDate)).length > 0 ? JSON.parse(response.pointDate) : ""
    dispatch(slice.actions.attendance(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const checkDay = ({ setPointDate,arrayAttendance, attendance_Id }) => async (dispatch) => {
  const attendance = JSON.stringify(arrayAttendance) 
  const pointDate = JSON.stringify(setPointDate) 
  console.log(setPointDate)
  try {
  let response = await apiService.put(`/attendance/${attendance_Id}`,{attendance,pointDate});
  dispatch(slice.actions.attendance(response));
} catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

// export const getListRooms = () => async (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   try {
//     const response = await apiService.get("/room");
//     dispatch(slice.actions.allRooms(response));
//   } catch (error) {
//     dispatch(slice.actions.hasError(error));
//   }
// };