import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connected from '../pages/Connected';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Layout from '../layout/index';


export default function Router({session}) {

  return (
    <BrowserRouter>
      {
        (session.state === undefined)?
          <Routes>
            <Route path="*" element={<Connected session={session} />} />
          </Routes>
        :(session.state === null)?
          <Routes>
              <Route path="*" element={<Auth session={session}/>} />
          </Routes>
        :
          <Routes>
            <Route path="/" element={<Layout session={session} />} >
              <Route path="*" element={<Home session={session} />} />
              <Route path="profile" element={<Profile session={session} />} />
            </Route>
          </Routes>
        }
        </BrowserRouter>
      );
}
