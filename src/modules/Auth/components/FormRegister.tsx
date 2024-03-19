import React, { memo } from "react";
import {useFormik} from 'formik'
import * as yup from 'yup'

import Loading from '../../../components/Loading/index.tsx'
import Button from "../../../components/Button/index.tsx";

import { IPropsRegisterParams, IRegisterParams, IGender, ILocationParams } from '../../../interfaces/auth.ts'
import { GENDER } from '../../../utils/constants.ts'
import { validEmpty } from '../../../utils/index.ts'

function FormRegister(props : IPropsRegisterParams) {

    const {onSubmit, onChange, loading, errMessage, region, state, } = props

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            repeatPassword:"",
            name:"",
            gender:"",
            region:undefined,
            state:undefined
        },
        validationSchema: yup.object({
            email:yup.string()
            .required("Bạn chưa nhập trường này!")
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Vui lòng nhập đúng định dạng email"),
            password:yup.string()
            .required("Bạn chưa nhập trường này!")
            .min(6, "Mật khẩu phải có nhiều hơn 6 kí tự!")
            .max(12, "Mật khẩu chỉ được tối đã 12 kí tự!"),
            repeatPassword:yup.string()
            .oneOf([yup.ref('password')], 'Password không trùng khớp')
            .required("Bạn chưa nhập trường này!"),
            name:yup.string()
            .required("Bạn chưa nhập trường này!")
            .min(6, "Tên phải có nhiều hơn 6 kí tự!")
            .max(50, "Tên chỉ được tối đã 50 kí tự!"),
            gender:yup.string()
            .required("Bạn chưa chọn giới tính!"),
            region:yup.string()
            .required("Bạn chưa chọn quốc gia"),
            state:yup.string()
            .required("Bạn chưa chọn thành phố!") 
        }),
        onSubmit:(values : IRegisterParams) => {
            onSubmit(values)
        }
    })

    const renderGender = () => {
        const output: JSX.Element[] = [
            <option key={"abcxyz"} value={""} selected disabled>-- Select an option --</option>
        ]

        GENDER.forEach((gender:IGender, index:number) => {
            output.push(
                <option key={index} value={gender.value}>{gender.label}</option>
            )
        })

        return output
    }

    const renderLocation = (data:ILocationParams[]) => {
        const output: JSX.Element[] = [
            <option key={"abcxyz"} value={""} selected disabled>-- Select an option --</option>
        ]

        data && data.forEach((re:ILocationParams, index:number) => {
            output.push(
                <option key={index} value={re.id}>{re.name}</option>
            )
        })

        return output
    }
    
    const handleChangeRegion = (e) => {
        formik.handleChange(e)
        onChange(e.target.value)
    }
    
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
                    onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && <span className="form__message">{formik.errors.password}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="repeatPassword">Xác nhận mật khẩu</label>
                <input 
                    className="form__input"
                    type="password" 
                    id="repeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword && <span className="form__message">{formik.errors.repeatPassword}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="name">Họ & Tên</label>
                <input 
                    className="form__input"
                    type="text" 
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                {formik.errors.name && formik.touched.name && <span className="form__message">{formik.errors.name}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="gender">Giới tính</label>
                <select 
                    className="form__select"
                    id="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                >
                    {renderGender()}   
                </select>
                {formik.errors.gender && formik.touched.gender && <span className="form__message">{formik.errors.gender}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="region">Quốc gia</label>
                <select
                    className="form__select"
                    id="region"
                    value={formik.values.region}
                    onChange={handleChangeRegion}
                >
                    {renderLocation(region)}
                </select>
                {formik.errors.region && formik.touched.region && <span className="form__message">{formik.errors.region}</span>}
            </div>
            <div className="non-form">
                <label className="form__label" htmlFor="state">Thành phố</label>
                <select
                    className="form__select"
                    id="state"
                    value={formik.values.state}
                    disabled={state.length === 0 ? true : false}
                    onChange={formik.handleChange}
                >
                    {renderLocation(state)}
                </select>
                {formik.errors.state && formik.touched.state && <span className="form__message">{formik.errors.state}</span>}
            </div>

            {errMessage && <p className="form-err-message">{errMessage}</p>}
            <div className="non-btns">
                <Button to='/login' type="button" text="Đăng nhập"/>
                <Button 
                type="submit" text="Đăng kí" disabled={validEmpty(formik.values) === false ? true : false}  primary={validEmpty(formik.values)}/>
            </div>
        </form>
    );
}

export default memo(FormRegister);