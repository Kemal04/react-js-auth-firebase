import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    IsLoggedIn: false,
    email: null,
    userName: null,
    userID: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            console.log(action.payload)
            const { email, userName, userID } = action.payload
            state.IsLoggedIn = true;
            state.email = email;
            state.userName = userName;
            state.userID = userID;
        },
        REMOVE_ACTIVE_USER: (state, action) => {
            state.IsLoggedIn = false;
            state.email = null;
            state.userName = null;
            state.userID = null;
        }
    }
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.IsLoggedIn;
export const selectEmail = (state) => state.auth.email
export const selectuserName = (state) => state.auth.userName
export const selectuserID = (state) => state.auth.userID

export default authSlice.reducer