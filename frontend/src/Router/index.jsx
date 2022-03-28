import React from 'react'
import { BrowserRouter, Routes, Route, Switch, Redirect, Outlet, Link } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

export default function Router({master}) {
    const user = master.user.state;
    return (
        <BrowserRouter>
          {(user.token === undefined || user.token === '')?
          <Routes>
              <Route path="/" element={<Auth master={master} />}>
                <Route index element={<Login master={master} />} />
                <Route path="login" element={<Login master={master} />} />
                <Route path="signup" element={<Signup master={master} />} />
                <Route path="*" element={<NoPage />} />
              </Route>
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
