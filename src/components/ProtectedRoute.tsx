import React from 'react';
import { Navigate } from 'react-router-dom';
import { isValidToken } from '../utils/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    authRequired?: boolean;
}

export default function ProtectedRoute({ children, authRequired = true }: ProtectedRouteProps) {
    const isAuthenticated = isValidToken();

    if (authRequired) {
        // Protect routes that require authentication
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        } else {
            return <>{children}</>;
        }
    } else {
        // Protect auth routes (login/signup) from authenticated users
        if (isAuthenticated) {
            return <Navigate to="/dashboard" />;
        } else {
            return <>{children}</>;
        }
    }
} 