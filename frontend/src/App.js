import React, {useState} from "react";
import { BrowserRouter, Routes, Route, Switch, Redirect, Outlet, Link } from "react-router-dom";

import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Home from "./containers/Home/Home";


const Blogs = () => {
  return <h1>Blog Articles</h1>;
};
const Contact = () => {
  return <h1>Contact Me</h1>;
};
const NoPage = () => {
  return <h1>404</h1>;
};

export default function App() {

  var user = {state:null, setState:null}; [user.state, user.setState] = useState({});
  var api = {state:null, setState:null}; [api.state, api.setState] = useState({url: 'http://localhost:3000'});
  var master = {
    api: api,
    user: user
  }
  console.log()
  return (
    <BrowserRouter>
      {(user.state.token === undefined || user.state.token === '')?
      <Routes>
          <Route index element={<Login master={master} />} />
          <Route path="login" element={<Login master={master} />} />
          <Route path="signup" element={<Signup master={master} />} />
          <Route path="*" element={<NoPage />} />
      </Routes>

      :<Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
        <Route path="home" element={<Home master={master} />} />
        <Route path="login" element={<Login master={master} />} />
        <Route path="signup" element={<Signup master={master} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    }
    </BrowserRouter>
  );
}

