import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PastOrders from './pages/PastOrders';
import OrderDetails from './pages/OrderDetails';
import MenuStock from './pages/MenuStock';
import Navbar from './components/Navbar';
import { isAuthenticated } from './utils/auth';

function PrivateRoute({ children }: { children: React.ReactElement }) {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default function App() {
    const location = useLocation();
    const hideNavbar = ['/login', '/signup'].includes(location.pathname);
    return (
        <div className="min-h-screen bg-gray-100">
            {!hideNavbar && <Navbar />}
            <main className="max-w-2xl mx-auto p-4">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/orders/:id"
                        element={
                            <PrivateRoute>
                                <OrderDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/past-orders"
                        element={
                            <PrivateRoute>
                                <PastOrders />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/menu-stock"
                        element={
                            <PrivateRoute>
                                <MenuStock />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}
