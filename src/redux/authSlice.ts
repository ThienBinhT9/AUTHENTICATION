import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        currentUser:{},
    },
    reducers:{
        //register
        registerSuccess(state, action){
            state.currentUser = action.payload
        },

        //login
        loginSuccess(state, action){
            state.currentUser = action.payload
        },
    }
})

export const {loginSuccess, registerSuccess} = authSlice.actions
export default authSlice.reducer