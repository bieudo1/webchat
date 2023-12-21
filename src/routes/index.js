import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import AccountPage from "../pages/AccountPage";
import UpdatePassword from "../components/updatePassword"
import UserProfilePage from "../pages/UserProfilePage";
import Chat from "../features/messenger/chat"
import CardIndividual from "../features/user/CardIndividual";
import AddRoom from "../features/messenger/AddRoom";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
         element={
          <AuthRequire>
           <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="/:tabbar" element={<HomePage />} />
        <Route path="/UpdatePassword" element={<UpdatePassword/>}/>
        <Route path="/:chat/:chatId" element={<Chat />} />
        <Route path="/admin" element={<CardIndividual />} />
        <Route path="/createroom" element={<AddRoom />} />

      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/register" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
