import React from "react";
import classnames from 'classnames/bind'
import { Link } from "react-router-dom";

import styles from './Button.scss'

const cx = classnames.bind(styles)
interface Props{
    onClick?:() => void,
    type:"submit" | "reset" | "button",
    text:string,
    to?:string,
    primary?:boolean,
    disabled?:boolean,
    className?:string | number | symbol | any
}


function Button(props: Props) {
    const {to, type = 'button', text, onClick, primary, disabled, className, ...passProps} = props

    const _props = {
        onClick,
        ...passProps
    }

    const classes = cx({
        "wrapper":true,
        [className]:className,
        primary,
        disabled
    })

    return ( 
        <>
            {to ? (
                <Link to={to} className={classes} {..._props}>{text}</Link>
            ) : (
                <button type={type} className={classes} {..._props}>{text}</button>
            )}
        </>
     );
}

export default Button;