import React, { memo } from "react";
import {useFormik} from 'formik'
import * as yup from 'yup'

import Loading from '../../../components/Loading/index.tsx'
import Button from "../../../components/Button/index.tsx";

import { ILoginParams, IPropsLoginParams } from '../../../interfaces/auth.ts'
import { validEmpty } from "../../../utils/index.ts";

function FormLogin(props: IPropsLoginParams) {

    const {onSubmit, loading, errMessage} = props

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: yup.object({
            email:yup.string()
            .trim()
            .required("Bạn chưa nhập trường này!")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Vui lòng nhập đúng định dạng email"),
            password:yup.string()
            .trim()
            .required("Bạn chưa nhập trường này!")
            .min(6, "Mật khẩu phải có nhiều hơn 6 kí tự!")
            .max(12, "Mật khẩu chỉ được tối đã 12 kí tự!")
        }),
        onSubmit:(values : ILoginParams) => {
            onSubmit(values)
        }
    })
    
    return ( 
        <form 
            className="auth-form"
            autoComplete="off"
            noValidate
            onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit()
            }}
        >
            {loading && <Loading />}
            <div className="non-form">
                <label className="form__label" htmlFor="email">Email</label>
                <input 
                    className="form__input"
                    type="email" 
                    id="email"
                    value={formik.values.email}
                    onChange={(e) => {
                        formik.handleChange(e)
                    }}
                />
                {formik.errors.email && formik.touched.email && <span className="form__message">{formik.errors.email}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="password">Mật khẩu</label>
                <input 
                    className="form__input"
                    type="password" 
                    id="password"
                    value={formik.values.password}
                    onChange={(e) => {
                        formik.handleChange(e)
                    }}
                />
                {formik.errors.password && formik.touched.password && <span className="form__message">{formik.errors.password}</span>}
            </div>
            {errMessage && <p className="form-err-message">{errMessage}</p>}
            <div className="non-btns">
                <Button to='/register' type="button" text="Đăng kí"/>
                <Button type="submit" text="Đăng nhập" primary={validEmpty(formik.values)} disabled={validEmpty(formik.values) === false ? true : false}/>
            </div>
        </form>
    );
}

export default memo(FormLogin);