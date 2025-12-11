import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer} from '../components/index.js';


const Layout = () => {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout