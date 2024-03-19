import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";

import logo from '../../../assets/images/logo.jpg'
import { login } from '../../../api/auth.api.ts'

import '../Auth.scss'
import FormLogin from "../components/FormLogin.tsx";


function Login() {

    const [loading, setLoading] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleSubmit = useCallback(async(values) => {
        setErrMessage("")
        setLoading(true)
        
        const json = await login(values, dispatch, navigate)    
        
        setLoading(false)

        if(!json.success){
            setErrMessage(json.errors.email)
        }
    },[])

    return ( 
        <div className="wrapper-auth">
            <div className="inner-auth">
                <div className="logo">
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <FormLogin onSubmit={handleSubmit} loading={loading} errMessage={errMessage}/>
            </div>
        </div>
     );
}

export default Login;