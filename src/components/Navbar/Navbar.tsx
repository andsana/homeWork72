import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Turtle Pizza Admin</span>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/admin" className="nav-link">Pizzas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/new-pizza" className="nav-link">Add new Pizza</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;