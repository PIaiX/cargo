import React from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleFilter() {

    const currentUser = useSelector(state => state.currentUser.data.user)
    const location = useLocation()
    const {id} = useParams()

    if (currentUser.roleId === 2 && (
        location.pathname === '/personal-account/user-cargo' ||
        location.pathname === '/add-cargo' ||
        location.pathname === `edit-cargo/${id}`
    )) {
        return <Outlet/>
    } else if (
        currentUser.roleId === 3 && (
            location.pathname === '/personal-account/user-routes' ||
            location.pathname === '/personal-account/user-cars' ||
            location.pathname === '/add-route' ||
            location.pathname === `/edit-route/${id}`
        )) {
        return <Outlet/>
    } else if (currentUser.roleId === 4) {
        return <Outlet/>
    } else {
        return <Navigate to='/'/>
    }
}
