import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import AddCargo from "../pages/AddCargo";
import AddCar from "../pages/AddCar";
import AddRoute from "../pages/AddRoute";
import EditCar from "../pages/EditCar";
import EditCargo from "../pages/EditCargo";
import CargoPage from "../pages/CargoPage";
import CarPage from "../pages/CarPage";
import Home from "../pages/Home";
import Search from "../pages/Search";
import AllNews from "../pages/AllNews";
import ArticleFull from "../pages/ArticleFull";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ResetPassword from "../pages/ResetPassword";
import ResetPassword2 from "../pages/ResetPassword2";
import Forum from "../pages/Forum";
import PersonalAccount from "../pages/account/PersonalAccount";
import Document from "../pages/account/Document";
import ForumMyTopics from "../pages/ForumMyTopics";
import ForumTopicChat from "../pages/ForumTopicChat";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";
import EditRoute from "../pages/EditRoute";

export default function AppRouter() {

const Wrapper = ({children}) => {
        const {pathname} = useLocation();
        useLayoutEffect(() => document.documentElement.scrollTo(0, 0), [pathname]);
        return children
} 
  return (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
            {/* Роуты доступные всем пользователям */}
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="cargo-page" element={<CargoPage />} />
          <Route path="all-news" element={<AllNews />} />
          <Route path="news/:slug" element={<ArticleFull />} />
          <Route path="forum" element={<Forum />} />
          <Route path="forum-section/:id" element={<ForumTopicChat />} />
            {/* Роуты доступные не зареганным пользователям */}
          <Route element={<AuthRoutes />}>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="reset-password-2" element={<ResetPassword2 />} />
          </Route>
            {/* Роуты доступные только зареганным пользователям */}
          <Route element={<ProtectedRoutes />}>
            <Route path="route-page" element={<CarPage />}>
              <Route path=':id' element={<CarPage/>}/>
            </Route>
            <Route path="add-cargo" element={<AddCargo />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="add-route" element={<AddRoute />} />
            <Route path="edit-car/:id" element={<EditCar />} />
            <Route path="edit-cargo/:id" element={<EditCargo />} />
            <Route path="edit-route" element={<EditRoute/>}>
              <Route path=':id' element={<EditRoute/>}/>
            </Route>
            <Route path="my-topics" element={<ForumMyTopics />} />
            <Route path="personal-account/*" element={<PersonalAccount />} />
            <Route path="document/:docID" element={<Document />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Wrapper>
  )
}
