import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AccountMenu from '../account/AccountMenu';
import UserProfile from '../account/UserProfile';
import ViewAccount from '../account/ViewAccount';
import ProfileEdit from '../account/ProfileEdit';
import UserCars from '../account/UserCars';
import UserCargo from '../account/UserCargo';
import Responses from '../account/Responses';
import InWork from '../account/InWork';
import Tariffs from '../account/Tariffs';
import UserPatterns from '../account/UserPatterns';
import UserDocuments from '../account/UserDocuments';

const PersonalAccountRouter = ({isMobile}) => {
    return (
        isMobile
            ? <Routes>
                <Route path="/" element={<AccountMenu />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="view-profile" element={<ViewAccount />} />
                <Route path="profile/edit" element={<ProfileEdit />} />
                <Route path="user-cars" element={<UserCars />} />
                <Route path="user-cargo" element={<UserCargo />} />
                <Route path="responses" element={<Responses />} />
                <Route path="in-work" element={<InWork />} />
                <Route path="tariffs" element={<Tariffs />} />
                <Route path="user-patterns" element={<UserPatterns />} />
                <Route path="user-documents" element={<UserDocuments />} />
            </Routes>
            : <Routes>
                <Route path="/" element={<UserProfile />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="view-profile" element={<ViewAccount />} />
                <Route path="profile/edit" element={<ProfileEdit />} />
                <Route path="user-cars" element={<UserCars />} />
                <Route path="user-cargo" element={<UserCargo />} />
                <Route path="responses" element={<Responses />} />
                <Route path="in-work" element={<InWork />} />
                <Route path="tariffs" element={<Tariffs />} />
                <Route path="user-patterns" element={<UserPatterns />} />
                <Route path="user-documents" element={<UserDocuments />} />
            </Routes>
    );
};

export default PersonalAccountRouter;