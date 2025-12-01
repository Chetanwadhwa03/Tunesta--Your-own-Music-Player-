import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {useAuth} from './context/Authcontext'
import Signup from './pages/Signup';


function App(){
  // we have to protect our router, therefore we need the authenticated state to verify that the user is logged in or not.
   const {Authenticated}= useAuth();

   const router= createBrowserRouter([
    {
      path:"/",
      element: Authenticated?<Home/>: <Navigate to="/login"/>
    },

    {
      path:"/login",
      element: !Authenticated?<Login/>: <Navigate to="/"/>

    },
    {
      path:"/signup",
      element: !Authenticated?<Signup/>: <Navigate to="/"/>
    },
  ])


  return (
    <RouterProvider router={router}/>
    
  )
}


export default App
