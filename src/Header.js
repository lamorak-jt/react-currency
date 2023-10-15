import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';

class Header extends React.Component {
  render() {
    return(
      <nav className="navbar">
        <Link className="navbar-brand" to="/">The Money Changer</Link>
        <div className="navbar-container">
          <div className="navbar-nav">
            <div className="nav-item">
              <Link className="nav-link" to="/">List</Link>
            </div>
            <div className="nav-item"> 
              <Link className="nav-link" to="/convert">Converter</Link>
            </div>
          </div>
        </div>
    </nav>      
    );
  }
}
export default Header;