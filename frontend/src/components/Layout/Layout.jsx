import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Notification from '../Common/Notification';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Notification />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;