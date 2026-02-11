import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ClipboardList, MessageSquare, BarChart2 } from 'lucide-react';

const Layout = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div>
            <nav className="navbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 0 }}>Assessment App</h1>
                </div>
                <div>
                    {isAdmin && (
                        <>
                            <NavLink to="/assessment" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ClipboardList size={18} /> Assessment
                                </span>
                            </NavLink>
                            <NavLink to="/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MessageSquare size={18} /> Feedback
                                </span>
                            </NavLink>
                            <NavLink to="/admin/assessments" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BarChart2 size={18} /> Admin
                                </span>
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
            <div className="container animate-fade-in">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
