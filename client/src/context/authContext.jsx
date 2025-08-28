import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const authContext = createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check`, { withCredentials: true });
                setIsLoggedIn(true);
                setUser(res.data.user);
            } catch (error) {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkAuth();
    }, [isLoggedIn]);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password }, { withCredentials: true });
            setIsLoggedIn(true);
            setUser(res.data.user);
        } catch (error) {
            console.error("Login failed:", error);
            setIsLoggedIn(false);
            setUser(null);

            // Check if error response contains a message and return it
            if (error.response && error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }

            // Return a generic error message if none is found
            throw new Error('An error occurred');
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            setUser(null);
            toast.success('Log out Successfull.', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <authContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </authContext.Provider>
    );
};
