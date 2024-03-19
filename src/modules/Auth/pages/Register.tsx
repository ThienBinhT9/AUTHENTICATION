import React, { useCallback, useEffect, useState } from "react";
import {useDispatch} from 'react-redux'

import logo from '../../../assets/images/logo.jpg'
import { register } from '../../../api/auth.api.ts'
import {getRegion, getState} from '../../../api/location.api.ts'

import FormRegister from "../components/FormRegister.tsx";
import { useNavigate } from "react-router-dom";

import '../Auth.scss'
import { IRegisterParams } from "../../../interfaces/auth.ts";

function Register() {

    const [loading, setLoading] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [region, setRegion] = useState([])
    const [state, setState] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const callAPIRegion = async() => {
            setLoading(true)
            setErrMessage("")

            const _region = await getRegion()

            setLoading(false)
            if(_region.code === 200){
                setRegion(_region.data)
                return
            }

            setErrMessage(_region.message)
        }
        callAPIRegion()
    },[])
    
    const handleSubmit = useCallback(async(values : IRegisterParams) => { 
        setErrMessage("")
        setLoading(true)
        
        const json = await register(values, dispatch, navigate)  

        setLoading(false)
        if(json.code === 200){
            alert("Đăng kí tài khoản thành công!")
            return
        }  
        setErrMessage(json.message)
        
    },[])

    const handleChangeRegion = useCallback(async(id: number) => {
        
        setLoading(true)
        setErrMessage("")

        const _state = await getState(id)

        setLoading(false)
        if(_state.code === 200){
            setState(_state.data)
            return
        }

        setErrMessage(_state.message)
    },[])

    return ( 
        <div className="wrapper-auth">
            <div className="inner-auth">
                <div className="logo">
                    <div>
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <FormRegister onSubmit={handleSubmit} onChange={handleChangeRegion} loading={loading} errMessage={errMessage} region={region} state={state}/>
            </div>
        </div>
     );
}

export default Register;