import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


function Navbar() {
    return (
        <>
           <nav>
        <ul>
          <li><Link to='/'>Main Page</Link></li>
          <li><Link to='/rockpaperscissors'>Rock Paper Scissors</Link></li>
          <li><Link to='/connect4'>Connect 4</Link></li>
        </ul>
      </nav>
        </>
    );
}

export default Navbar;