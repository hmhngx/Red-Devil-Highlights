// src/components/Sidebar.jsx
import { Link } from 'react-router-dom';
import { FaHome, FaDatabase } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <ul>
        <li>
          <Link to="/">
            <FaHome className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <a href="https://api-football.com" target="_blank" rel="noopener noreferrer">
            <FaDatabase className="sidebar-icon" /> Data Source
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;