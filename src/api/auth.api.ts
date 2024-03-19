import { API_PATHS } from '../configs/api.config.ts'
import axios from 'axios'
import {ILoginParams, IRegisterParams} from '../interfaces/auth.ts'
import { loginSuccess, registerSuccess} from '../redux/authSlice.ts'

export const login = async(data: ILoginParams, dispatch, navigate) => {
    try {
        const results = await axios.post('https://api.gearfocus.div4.pgtest.co/api/authentication/login', data)
        if(results.data.success){
            dispatch(loginSuccess({...results.data.user, "token":results.data.user_cookie}))
            navigate('/')
        }
        return results.data
    }catch (error) {
        return error.message || "Có lỗi sảy ra!!"
    }
}

export const register = async(data: IRegisterParams, dispatch, navigate) => {
    try {
        const results = await axios.post(API_PATHS.register, data)
        
        if(results.data.code === 200){
            dispatch(registerSuccess(results.data.data))
            navigate('/')
        }
        return results.data
    } catch (error) {
        return error.response.data; 
    }
}