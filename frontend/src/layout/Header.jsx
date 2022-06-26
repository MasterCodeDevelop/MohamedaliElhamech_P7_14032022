import React from 'react'
import { Link, useLocation } from "react-router-dom";
import logout from '../assets/img/logout.png';
import auth from '../functions/auth';
export default function Header({session}) {
    const path = useLocation().pathname

    return (
        <header className='header' >
            <nav className='header-nav' >
                <div className='header__group' >
                    <Link to="/" >
                        <h1>Groupomania</h1>
                    </Link>

                    <ul className='header__option' >
                        <li onClick={auth.logout} >
                            <img className='header__logout' src={logout} alt="logout"  />
                        </li>
                    </ul>
                    
                </div>
                <ul className='header__group' >
                    <li className={(path !='/profile')?'active':''} >
                        <Link to="/home">
                            Accueil
                        </Link>
                    </li>
                    
                    <li className={(path=='/profile')?'active':''} >
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
