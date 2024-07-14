import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className='container'>
        <h1 className='title'>한국대학교</h1>
        <nav className='management-nav'>
          <ul className='management-ul'>
            <li className='student-management'>
              <NavLink to='/students' className='link'>
                학생관리
              </NavLink>
            </li>
            <li className='department-management'>
              <NavLink to='/departments' className='link'>
                학과관리
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
