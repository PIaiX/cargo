import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes() {
    const isAuthenticated = useSelector((state) => state.currentUser.data.token)
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" />
}