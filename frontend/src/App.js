import React, {useState} from "react";
import { BrowserRouter, Routes, Route, Switch, Redirect, Outlet, Link } from "react-router-dom";

import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Login";
import Home from "./containers/Home/Home";

const Layout = () => {
  return (
    <>
      <div>
        <h2>Header</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Outlet />

      <div>
        <h2>Footer</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
};

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
  var user = {};

  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

