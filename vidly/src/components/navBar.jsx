import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>Vidly</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <div className='navbar-nav'>
            <NavLink className='nav-item nav-link' to='/movies'>Movies</NavLink>
            <NavLink className='nav-item nav-link' to='/customers'>Customers</NavLink>
            <NavLink className='nav-item nav-link' to='/rentals'>Rentals</NavLink>
            {!user && (
              <>
                <NavLink className='nav-item nav-link' to='/login'>Login</NavLink>
                <NavLink className='nav-item nav-link' to='/register'>Register</NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink className='nav-item nav-link' to='/profile'>{user.name}</NavLink>
                <NavLink className='nav-item nav-link' to='/logout'>Logout</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
