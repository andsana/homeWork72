import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
      <div className="container-fluid">
        <span className="navbar-brand">
             <NavLink to="/" className="nav-link">Turtle Pizza</NavLink>
        </span>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          {isAdminPage && (
            <>
              <li className="nav-item">
                <NavLink to="/admin/pizzas" className="nav-link">Pizzas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/new-pizza" className="nav-link">Add new Pizza</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;