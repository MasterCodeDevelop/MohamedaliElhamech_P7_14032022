import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import Redirect from '../pages/Redirect';
import Test from '../pages/Test';
export default function Router({master}) {

    return (
        <BrowserRouter>
          {//(master.session.state === null)?
          <Routes>
                <Route index element={<Login/>} />
                <Route path="/login" element={<Login master={master} />} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="home" element={<Home master={master} />} />

                <Route path="/test" element={<Test/>} />
{/*                <Route path="*" element={< Redirect />} /> */}
          </Routes>
    
    /*      :<Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home/>} />
            <Route path="*" element={< Redirect />} />
          </Routes>*/
        }
        </BrowserRouter>
      );
}
