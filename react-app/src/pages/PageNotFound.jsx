import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-6">Oops! The page you're looking for does not exist.</p>
            <Link to="/" className="text-blue-500 hover:underline">
                Go back to Dashboard
            </Link>
        </div>
    );
};

export default PageNotFound;
