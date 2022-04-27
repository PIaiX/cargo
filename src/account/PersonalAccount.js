import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import UserProfile from './UserProfile';
import ViewAccount from './ViewAccount';
import ProfileEdit from './ProfileEdit';
import UserCars from './UserCars';
import UserCargo from './UserCargo';
import UserPatterns from './UserPatterns';
import UserDocuments from './UserDocuments';

export default function PersonalAccount() {
    const [mob, setMob] = useState(false);

    useEffect(() => {
        function updateView() {
            if(window.matchMedia("(max-width: 991px)").matches){
                setMob(true);
            } else {
                setMob(false);
            }
        }
        window.addEventListener('resize', updateView);
        updateView();
        return () => window.removeEventListener('resize', updateView);
    }, []);

    return (
        <main className="account bg-gray py-sm-3 py-md-4 py-lg-5">
            <section id="sec-12" className="container">
                {
                    (mob === false) ?
                    <div className="row gx-4 gx-xl-5">
                        <div className="col-md-4 col-lg-3">
                            <AccountMenu />
                        </div>
                        <div className="col-md-8 col-lg-9">
                        
                            <Routes>
                                <Route path="/" element={<UserProfile />} />
                                <Route path="profile" element={<UserProfile />} />
                                <Route path="view-profile" element={<ViewAccount />} />
                                <Route path="profile/edit" element={<ProfileEdit />} />
                                <Route path="user-cars" element={<UserCars />} />
                                <Route path="user-cargo" element={<UserCargo />} />
                                <Route path="user-patterns" element={<UserPatterns />} />
                                <Route path="user-documents" element={<UserDocuments />} />
                            </Routes>

                        </div>
                    </div>
                    : 
                    <Routes>
                        <Route path="/" element={<AccountMenu />} />
                        <Route path="profile" element={<UserProfile />} />
                        <Route path="view-profile" element={<ViewAccount />} />
                        <Route path="profile/edit" element={<ProfileEdit />} />
                        <Route path="user-cars" element={<UserCars />} />
                        <Route path="user-cargo" element={<UserCargo />} />
                        <Route path="user-patterns" element={<UserPatterns />} />
                        <Route path="user-documents" element={<UserDocuments />} />
                    </Routes>
                }
            </section>
        </main>
    )
}