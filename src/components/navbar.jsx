import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import { useState } from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
     const [hover, setHover] = useState(false);
  return (
   <nav className="navbar top navbar-expand-lg bg-light w-100">
  <div className="container-fluid">
    <Link to='/' className='text-decoration-none navbar-brand me-auto'>
      <h2 className="full-name">TailorMark</h2>
    </Link>

    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <button type="button" className="btn-close me-0" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-uppercase fw-bold flex-grow-1 justify-content-center">
        <li className="nav-item">
          <NavLink to="/" className="nav-link text-dark" activeClassName="active">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/collections" className="nav-link text-dark" activeClassName="active">Collection</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/aboutus" className="nav-link text-dark" activeClassName="active">About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/contact" className="nav-link text-dark" activeClassName="active">Contact</NavLink>
        </li>
      </ul>
      </div>
</div>
      <Link to="/login" className="text-dark text-decoration-none">
        <div className="nav-item mx-2">
          <i
            className={`bi ${hover ? "bi-person-fill" : "bi-person"} fs-3 account`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          ></i>
        </div>
      </Link>
      
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>

  );
}

export default Navbar;