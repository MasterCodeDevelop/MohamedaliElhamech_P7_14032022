import React from 'react';
import { Logout } from '../functions';

export default function Header() {
  return (
    <header>
        <button onClick={Logout} >
          logout
        </button>
    </header>
  )
}
