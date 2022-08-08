import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import AccountMenu from '../pages/account/AccountMenu';
import UserProfile from '../pages/account/UserProfile';
import ViewAccount from '../pages/account/ViewAccount';
import ProfileEdit from '../pages/account/ProfileEdit';
import UserCars from '../pages/account/UserCars';
import UserCargo from '../pages/account/UserCargo';
import Responses from '../pages/account/Responses';
import InWork from '../pages/account/InWork';
import Tariffs from '../pages/account/Tariffs';
import UserPatterns from '../pages/account/UserPatterns';
import UserDocuments from '../pages/account/UserDocuments';
import PersonalAccountLayout from '../pages/account/PersonalAccountLayout';
import UserRoutes from "../pages/account/UserRoutes";

const PersonalAccountRouter = ({isMobile}) => {

    return (
        <Routes>
            <Route path="/" element={<PersonalAccountLayout isMobile={isMobile}/>}>
                {isMobile
                    ? <Route index element={<AccountMenu />} />
                    : <Route index element={<Navigate to="profile" replace={true} />} />
                }
                <Route path="profile" element={<UserProfile/>}/>
                <Route path="view-profile" element={<ViewAccount/>}/>
                <Route path="profile/edit" element={<ProfileEdit/>}/>
                <Route path="user-cars" element={<UserCars/>}/>
                <Route path="user-cargo" element={<UserCargo/>}/>
                <Route path="user-routes" element={<UserRoutes/>}/>
                <Route path="responses" element={<Responses/>}/>
                <Route path="in-work" element={<InWork/>}/>
                <Route path="tariffs" element={<Tariffs/>}/>
                <Route path="user-patterns" element={<UserPatterns/>}/>
                <Route path="user-documents" element={<UserDocuments/>} />
            </Route>
        </Routes>
    );
};

export default PersonalAccountRouter;