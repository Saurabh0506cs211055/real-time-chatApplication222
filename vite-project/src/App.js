//import Home from "./pages/home/Home";
//import Login from "./pages/login/Login";
//import Profile from "./pages/profile/Profile";
//import Register from "./pages/register/Register";
//import {
//  BrowserRouter as Router,
//  Switch,
//  Route,
//  Redirect,
//} from "react-router-dom";
//
//
//import { useContext, useState } from "react";
//import { AuthContext } from "./context/AuthContext";
//
//
//function App() {
//  const [currentuser,setCurrentuser] = useState([]);
//  useEffect(() => {
//    const items = JSON.parse(localStorage.getItem('currentuser'));
//    if (items) {
//     setItems(items);
//    }
//  }, []);
//  return (
//    <Router>
//      <Switch>
//        <Route exact path="/">
//          {user ? <Home /> : <Register />}
//        </Route>
//        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
//        <Route path="/register">
//          {user ? <Redirect to="/" /> : <Register />}
//        </Route>
//        <Route path="/profile/:username">
//          <Profile />
//        </Route>
//      </Switch>
//    </Router>
//  );
//}
<img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />

