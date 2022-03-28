import React from 'react'
import './assets/css/style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Cookie } from './functions';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Redirect from './pages/Redirect';

export default function App() {

    const user = {
        id: Cookie.get('id'),
        token: Cookie.get('token')
    }
    return (
        <BrowserRouter>
          {(user.token === undefined || user.token === '')?
          <Routes>
                <Route index element={<Login/>} />
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
                <Route path="*" element={< Redirect />} />
          </Routes>
    
          :<Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home/>} />
            <Route path="*" element={< Redirect />} />
          </Routes>
        }
        </BrowserRouter>
      );
}
