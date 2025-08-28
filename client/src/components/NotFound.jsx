import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
                <p className="text-4xl font-bold text-red-500">404</p>
                <p className="text-xl font-semibold text-gray-700 mt-2">Page Not Found</p>
                <p className="text-gray-500 mt-4">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/">
                    <p className="mt-8 px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700">Back to Home</p>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
