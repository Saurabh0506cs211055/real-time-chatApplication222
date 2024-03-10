import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Register from "./pages/register/Register";


import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login"; 
import { Link } from "react-router-dom";
import Messenger from "./pages/messenger/Messenger";
import TopbarNoUser from "./topbar2/TopbarNoUser";
import  Update  from "./pages/update/Update";
import Postall from "./pages/Post/Postall";
import Job from "./pages/job/Job";
import { Group } from "./pages/group/Group";



function App() {
  const  {user}  = useContext(AuthContext);

  function Layout() {
    return (
      <div className="app">
        {user ? <Topbar/>:<TopbarNoUser/>}
        <Outlet />
      </div>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element:<> {user ? <Home /> : <Register />}</>
        },
        {
          path: "/login",
          element: <>{user ? <Link to="/" /> : <Login />}</>
        },  {
          path: "/profile/:username",
          element: <Profile></Profile>
        },{
          path:"/register",
          element:<>{user ? <Link to="/"/>:<Register/>}</>
        },{
          path:"/chat",
          element:<>{user ? <Messenger />:  <Link to="/login" />  }</>
        },
        {
          path: "/update",
          element: <>{user ? <Update/>:<Link to ="/login"/>}</>
        },
        {
          path: "/post",
          element: <>{user ? <Postall/>:<Link to ="/login"/>}</>
        },
        {
          path: "/job",
          element: <>{user ? <Job/>:<Link to ="/login"/>}</>
        },
        {
          path:"/group",
          element:<>{user ? <Group></Group>:<Link to="/login"/>}</>
        }
      ],
    },
  ]);


  return <RouterProvider router={router} />;
}
export default App;