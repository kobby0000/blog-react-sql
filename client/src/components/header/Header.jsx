import React from 'react';
import './header.css';
import Logo from '/logo.jpg'
import { Link } from 'react-router-dom';
import { RiQuillPenAiLine } from "react-icons/ri";

const Header = () => {
  return (
    <nav id='navbar'>
      <div className="navbar_wrapper container">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <Link className='link' to='/?cat=art'>
          <h6> Art</h6>
          </Link>
          <Link className='link' to='/?cat=sience'>
          <h6> Science</h6>
          </Link>
          <Link className='link' to='/?cat=technology'>
          <h6> Technology</h6>
          </Link>
          <Link className='link' to='/?cat=cinema'>
          <h6> Cinema</h6>
          </Link>
          <Link className='link' to='/?cat=design'>
          <h6> Design</h6>
          </Link>
          <Link className='link' to='/?cat=food'>
          <h6> Blog</h6>
          </Link>
          <span>Mike</span>
          <span>Logout</span>
            
          <Link className='write'  to='/write'>
          <span>
           Write
          </span>
          <RiQuillPenAiLine />
           </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header