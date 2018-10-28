import React from 'react';
import Login from './components/Login';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>

                <Login />
            </nav>
        </header>
    );
};

export default Header;
