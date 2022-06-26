import React  from 'react';
import { Outlet } from "react-router-dom";
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

