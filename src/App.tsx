import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PastOrders from './pages/PastOrders';
import Home from './pages/Home'; // Removed .jsx extension as TypeScript can resolve it

function App() {
    return (
        <div className="app">
            <main className="page-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="past-orders" element={<PastOrders />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
