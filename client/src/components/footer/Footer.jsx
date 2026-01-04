import React from 'react';
import './footer.css';
import Logo from '/logo.jpg'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Logo" />
      <span>© Copyright 2024 BullHunt. All rights reserved.</span>
    </footer>
  )
}

export default Footer