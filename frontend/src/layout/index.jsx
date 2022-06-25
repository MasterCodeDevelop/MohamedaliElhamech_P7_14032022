import React  from 'react';
import { Outlet } from "react-router-dom";
import { Logout } from '../functions';
import Header from './Header';

export default function Layout({session}) {
 
  return (
    <>
      <Header session={session} />
      <main>
        <Outlet />
      </main>
      <footer>
        Add footer
      </footer>
    </>
  )
}

