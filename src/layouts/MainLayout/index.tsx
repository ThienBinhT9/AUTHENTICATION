import React from 'react';

import './MainLayout.scss'

import Header from '../components/Header/index.tsx'
import Footer from '../components/Footer/index.tsx'

function MainLayout({children}) {
    return ( 
        <div className='wrapper-mainLayout'>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default MainLayout;