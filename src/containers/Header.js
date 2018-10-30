import React from 'react';
import Login from './components/Login';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-light bg-light">
                <Link className="navbar-brand" to="/">BrandName</Link>
                <Link className="navbar-Link" to="/task/create">Create new</Link>

                <Login />
            </nav>
        </header>
    );
};

export default Header;
