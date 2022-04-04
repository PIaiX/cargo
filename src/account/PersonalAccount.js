import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import UserProfile from './UserProfile';

export default function PersonalAccount() {
    return (
        <main className="account bg-gray py-sm-3 py-md-4 py-lg-5">
            <section id="sec-12" className="container">
                <div className="d-none d-lg-block">
                    <div className="row gx-5">
                        <div className="col-lg-4 col-xl-3">
                            <AccountMenu />
                        </div>
                        <div className="col-lg-8 col-xl-9">
                            <Routes>
                                <Route path="/" element={<UserProfile />} />
                                <Route path="profile" element={<UserProfile />} />
                                
                            </Routes>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}