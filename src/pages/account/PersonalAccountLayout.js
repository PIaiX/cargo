import React from 'react';
import { Outlet } from 'react-router-dom'
import AccountMenu from './AccountMenu';

const PersonalAccountLayout = ({isMobile}) => {
    return <>
        {isMobile
            ? <Outlet/>
            : <div className="row gx-4 gx-xl-5">
                <div className="col-md-4 col-lg-3">
                    <AccountMenu/>
                </div>
                <div className="col-md-8 col-lg-9">
                    <Outlet/>
                </div>
            </div>}
    </>

};

export default PersonalAccountLayout;