import React from 'react';
import Sidebar from '../sidebar/sidebar';
import './layout.css';

function Layout({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />

            <div className="main-content">
                <header className="navbar">
                    <h1>Placement Management System</h1>
                </header>

                <main className="content-area">{children}</main>
            </div>
        </div>
    );
}

export default Layout;