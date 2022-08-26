import React from 'react';
import { Outlet } from 'react-router-dom'
import Header from './Header';
import {Footer} from './Footer';
import useAlert from '../hooks/alert';

const Layout = () => {
    const {alertNode} = useAlert(3000)

    return (
        <div className='root-wrapper'>
            <Header />
            {alertNode}
            <div className='content-wrapper'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;