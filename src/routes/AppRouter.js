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
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import ResetPassword from '../pages/ResetPassword';
import ResetPassword2 from '../pages/ResetPassword2';
import Forum from '../pages/Forum';
import PersonalAccount from '../pages/account/PersonalAccount';
import Document from '../pages/account/Document';
import ForumMyTopics from '../pages/ForumMyTopics';
import ForumTopicChat from '../pages/ForumTopicChat';
import Layout from '../components/Layout';
import NotFound from '../pages/NotFound';

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
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="search" element={<Search />} />
                <Route path="cargo-page" element={<CargoPage />} />
                <Route path="car-page" element={<CarPage />} />
                <Route path="add-cargo" element={<AddCargo />} />
                <Route path="add-car" element={<AddCar />} />
                <Route path="all-news" element={<AllNews />} />
                <Route path="news/:slug" element={<ArticleFull />} />
                <Route path="forum" element={<Forum />} />
                <Route path="forum-section/:id" element={<ForumTopicChat />} />
                <Route path="my-topics" element={<ForumMyTopics />} />
                <Route path="login" element={<Login />} />
                <Route path="registration" element={<Registration />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="reset-password-2" element={<ResetPassword2 />} />
                <Route path="personal-account/*" element={<PersonalAccount />} />
                <Route path="document/:docID" element={<Document/>}/>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        </Wrapper>
    )
}
