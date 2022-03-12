import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return(
        <>
        <nav className="navbar">
            <Link className="Nav-link" to="/">home</Link>
            <Link className="Nav-link" to="/add-exercise">+add exercise</Link>
        </nav>
        </>
    );
}

export default Nav;