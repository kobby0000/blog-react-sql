import React from 'react'
import { Header } from '../components'
import { Outlet } from 'react-router-dom'

const ErrorPageLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default ErrorPageLayout