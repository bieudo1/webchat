import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  listUsers: [],
  listFriend: [],
  userById: {},
};

// const { user } = useAuth();

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },

    allUsers(state, action) {
      state.isLoading = false;
      state.error = null;
      let { data, userId } = action.payload
      state.listUsers = [...data];
      data = data.filter((user) => {
        return user.id !== userId
       })
       data.forEach((user) => {
        state.userById[user.id] = user;
        if (!state.listFriend.includes(user.id))
          state.listFriend.push(user.id);
      });
    },
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({
    userId,
    name,
    avatarUrl,
    phone,
    gender,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        phone,
        gender,
      };
      
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/user/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/user/me");
    dispatch(slice.actions.updateUserProfileSuccess(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const getListUsers = (user) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/user");
    dispatch(slice.actions.allUsers({data:response,userId:user.id}));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const putUpdatePassword = ({ user_id, password }) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/user/password/${user_id}`,{password:password});
    // dispatch(slice.actions.allUsers({data:response,userId:user.id}));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
