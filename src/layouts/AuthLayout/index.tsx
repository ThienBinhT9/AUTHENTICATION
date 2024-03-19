import React from 'react';

import './AuthLayout.scss'

function AuthLayout({children}) {
    return ( 
        <div className='wrapper-authLayout'>
            {children}
        </div>
    );
}

export default AuthLayout;