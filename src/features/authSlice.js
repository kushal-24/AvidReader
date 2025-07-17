import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status=true;
            state.userData=action.payload.userData;
            // Store the user data from the dispatched action into Redux state.
        },
        logout: (state,action)=>{
            state.status=false;
            state.userData=null;
        }
    }
})

export const {login, logout}=authSlice.actions 
export default authSlice.reducer;
