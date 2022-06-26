import React from 'react'
import { Link, useLocation } from "react-router-dom";
import logout from '../assets/img/logout.png';
import auth from '../functions/auth';
export default function Header({session}) {
    const path = useLocation().pathname
    const isActive = (link) => {
      if (link == path) {
        return 'active';
      } else if (link == "/home" && path == "/") {
        return 'active';
      } else {
        return ''
      }
    }

    return (
        <header className='header' >
            <nav className='header-nav' >
                <div className='header-group' >
                    <Link to="/" >
                        <h1>Groupomania</h1>
                    </Link>

                    <ul className='header__option' >
                        <li onClick={auth.logout} >
                            <img src={logout} alt="logout"  />
                        </li>
                    </ul>
                    
                </div>
                <ul className='header-group' >
                    <li className={isActive("/home")} >
                    <Link to="/home">
                        Accueil
                    </Link>
                    </li>
                    <li className={isActive("/friend")} >
                    <Link to="/friend">
                        Amis
                    </Link>
                    </li>
                    <li className={isActive("/profile")} >
                    <Link to="/profile">
                        Profile
                    </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
