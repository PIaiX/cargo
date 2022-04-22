import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

import AddCargo from '../pages/AddCargo';
import AddCar from '../pages/AddCar';
import CargoPage from '../pages/CargoPage';
import CarPage from '../pages/CarPage';
import Home from '../pages/Home';
import Search from '../pages/Search';
import AllNews from '../pages/AllNews';
import ArticleFull from '../pages/ArticleFull';
import Entrance from '../pages/Entrance';
import Registration from '../pages/Registration';
import ResetPassword from '../pages/ResetPassword';
import ResetPassword2 from '../pages/ResetPassword2';
import Forum from '../pages/Forum';
import PersonalAccount from '../account/PersonalAccount';
import Document from '../account/Document';
import ForumSublevel from '../pages/ForumSublevel';
import ForumMyTopics from '../pages/ForumMyTopics';
import ForumTopicChat from '../pages/ForumTopicChat';

export default function AppRouter() {
    const Wrapper = ({children}) => {
        const location = useLocation();
        useLayoutEffect(() => {
          document.documentElement.scrollTo(0, 0);
        }, [location.pathname]);
        return children
    } 
   
    return (
        <Wrapper>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cargo-page" element={<CargoPage />} />
            <Route path="/car-page" element={<CarPage />} />
            <Route path="/add-cargo" element={<AddCargo />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/all-news" element={<AllNews />} />
            <Route path="/news" element={<ArticleFull />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum-section" element={<ForumSublevel />} />
            <Route path="/my-topics" element={<ForumMyTopics />} />
            <Route path="/forum-topic" element={<ForumTopicChat />} />
            <Route path="/entrance" element={<Entrance />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password-2" element={<ResetPassword2 />} />
            <Route path="/personal-account/*" element={<PersonalAccount />} />
            <Route path="/document" element={<Document />} />
        </Routes>
        </Wrapper>
    )
}
