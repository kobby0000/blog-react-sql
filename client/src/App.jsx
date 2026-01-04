import { useContext,Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './context/authContext.jsx'
import Loading from './components/loading/Loading.jsx'

//LAYOUT
import Layout from './Layouts/Layout.jsx'

//PAGES
import { Blog, ErrorPage, Home, Login, Register, Single, Write } from './pages/index.js'


const router = createBrowserRouter([
  {
    path: '/',
    element:(<Suspense> <Layout /></Suspense>),
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
  const { isLoading } = useContext(AuthContext);
    return (
  <div className="app">
    {isLoading && <Loading message="Processing your request..." />}
     <RouterProvider router={router} />
  </div>
    )
}

export default App
