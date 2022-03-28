import React from 'react'
import './assets/css/style.css';
import { BrowserRouter, Routes, Route, Switch, Redirect, Outlet, Link } from "react-router-dom";
import { Cookie } from './functions';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NoPage from './pages/NoPage';
export default function Router({master}) {

    const user = {
        id: Cookie.get('id'),
        token: Cookie.get('token')
    }
    return (
        <BrowserRouter>
          {(user.token === undefined || user.token === '')?
          <Routes>
                <Route index element={<Login master={master} />} />
                <Route path="login" element={<Login master={master} />} />
                <Route path="signup" element={<Signup master={master} />} />
                <Route path="*" element={<NoPage />} />
          </Routes>
    
          :<Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home master={master} />} />
            <Route path="login" element={<Login master={master} />} />
            <Route path="signup" element={<Signup master={master} />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        }
        </BrowserRouter>
      );
}
