import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//LAYOUT
import Layout from './Layouts/Layout.jsx'

//PAGES
import { Blog, ErrorPage, Home, Login, Register, Single, Write } from './pages/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'post/:id', element: <Single /> },
      { path: 'write', element: <Write /> },
      { path: 'blog', element: <Blog /> },
    ],
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  },
  {
    path: '*',
    element: <ErrorPage />
  },
])

function App() {
    return (
  <div className="app">
     <RouterProvider router={router} />
  </div>
    )
}

export default App
