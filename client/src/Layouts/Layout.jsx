import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer, ScrollToTop, ScrollToTopButton} from '../components/index.js';


const Layout = () => {
  return (
    <div>
      <ScrollToTop />
      <ScrollToTopButton />
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout