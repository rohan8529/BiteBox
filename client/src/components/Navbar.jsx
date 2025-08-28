import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, XMarkIcon, UserIcon, Bars3Icon, HomeIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/CartContext';
import Search from './Search';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const OrderHistory = () => {
        navigate('/orders');
    };

    const close = () => {
        setIsOpen(false);
        setIsDropdownOpen(false);
    }

    return (
        <nav className="flex flex-col md:flex-row items-start md:items-center md:justify-between p-4 relative bg-white shadow-md">
            {/* Left side */}
            <div className="flex justify-between flex-shrink-0 items-center w-full md:w-auto">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold text-corg" onClick={() => { setIsOpen(false) }}>
                    oneBite
                </NavLink>
                {/* Menu Toggle for Mobile */}
                <div className="md:hidden flex items-center ml-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-cgrey focus:outline-none"
                        aria-expanded={isOpen}
                        aria-controls="nav-menu"
                    >
                        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Right side Navigation Links */}
            <div id="nav-menu" className={`flex-grow md:flex ${isOpen ? 'block' : 'hidden'} xs:mt-2 md:mt-0 md:flex md:items-center md:gap-4`}>
                <div className="flex flex-col md:flex-row xs:items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 ml-auto">
                    {/* Search Bar */}
                    <Search />
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${isActive ? 'text-corg' : ''} hover:text-corg`}
                        onClick={() => setIsOpen(false)}
                    >
                        <HomeIcon className="w-6 h-6" />
                    </NavLink>

                    {isLoggedIn && (
                        <NavLink
                            to="/cart"
                            className={({ isActive }) => `${isActive ? 'text-corg' : ''} relative hover:text-corg`}
                            onClick={() => setIsOpen(false)}
                        >
                            <ShoppingCartIcon className="w-6 h-6" />
                            <span className="absolute -top-2 -right-2 bg-corg text-gray-900 text-xs px-1 rounded-full">
                                {cart.length}
                            </span>
                        </NavLink>
                    )}

                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2"
                                aria-haspopup="true"
                                aria-expanded={isDropdownOpen}
                            >
                                <UserIcon className="w-6 h-6" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute md:right-0 mt-2 w-48 bg-white text-cgrey shadow-md shadow-slate-700 rounded-md">
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-corg hover:text-gray-800"
                                        onClick={() => { close(); OrderHistory(); }}
                                    >
                                        Order History
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-corg hover:text-gray-800"
                                        onClick={() => { close(); logout(); }}
                                    >
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="md:px-4 py-2 rounded md:hover:bg-corg hover:text-black"
                            onClick={() => setIsOpen(false)}
                        >
                            Log In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

