import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from './images/logo.png';
import profile from './images/profile.png';
import { useAuth } from '../AuthContext';
import DropdownMenu from './DropdownMenu'; // Nieuwe component
import './style/Header.css';

/*************  ✨ Codeium Command ⭐  *************/
/******  7b1a241c-9475-43c4-93ac-e3488bb417ae  *******/
const Header = () => {
  const { loggedIn, userData, error } = useAuth();
  const location = useLocation(); // Hook to get current URL

  const navItems = [
    { path: '/home', label: 'Home' },
    { path: '/information', label: 'Information' },
    { path: '/solar_dashboard', label: 'Solar Panels Dashboard' },
    { path: '/battery_dashboard', label: 'Battery Dashboard' },
  ];

  return (
    <div className='navbar'>
      <a href='/'>
        <img className='logo' src={logo} alt='logo'></img>
      </a>
      
      <div className='headerMenu'>
        <div className='rightMenu'>
          {loggedIn ? (
            <>
              <ul>
                {navItems.map((item) => (
                  <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                    <Link to={item.path}>{item.label}</Link>
                  </li>
                ))}
              </ul>
              <img src={profile} alt='profile' className='profile'></img>
              <span>{userData?.name}</span>
              <DropdownMenu />
            </>
          ) : (
            <></>
          )}

          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Header;
