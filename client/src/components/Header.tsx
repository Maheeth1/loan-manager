import React from 'react';
import { FaBell, FaComments, FaUserCircle } from 'react-icons/fa';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="header">
      <div className="logo">CREDIT APP</div>
      <nav className="nav">
        <button className="nav-button" onClick={() => onNavigate('applicationForm')}>Application Form</button>
        <button className="nav-button" onClick={() => onNavigate('verifierDashboard')}>Verifier Dashboard</button>
      </nav>
      <div className="icons">
        <FaBell className="icon" title="Notifications" />
        <FaComments className="icon" title="Chat" />
        <FaUserCircle className="icon" title="User" />
        <div className="user-dropdown">▼ User</div>
      </div>
    </header>
  );
};

export default Header;
