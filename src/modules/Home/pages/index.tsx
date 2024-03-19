import React from "react";
import { RootState } from '../../../redux/store'

import '../Home.scss'
import { useSelector } from "react-redux";
import { IUser } from "../../../interfaces/auth";

function Home() {

    const user: IUser = useSelector((state: RootState) => state.auth.currentUser)

    return ( 
        <div>
            <div>
                <h1>Tôi là {user.name || (user.firstName + user.lastName)}</h1>
                <h3>email:{user.email || user.login}</h3>
            </div>
        </div>
    );
}

export default Home;