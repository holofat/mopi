import React from 'react'
import Home from './components/Home';
import Discover from './components/Discover';
import Logout from './components/User/Logout';
import YourList from './components/YourList';
// import Recommendations from './components/Recommendations';

import logo_navbar from './components/img/logo.png'
import './styles/navbar.css'

import {FaInstagram, FaTwitter, FaFacebook} from 'react-icons/fa'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom"
import Login from './components/User/Login';
import {useSelector} from 'react-redux'
import Register from './components/User/Register';
import TopRated from './components/TopRated';
import { Detail } from './components/Detail';



function App() {
  const page = useSelector(state => state.page)
  const user = useSelector(state => state.user)

  return (
    <Router>
      <nav className="navbar navbar-expand-md navbar-light">
        <div className="container-fluid d-flex justify-content-between" >
          <a href="/#" className="navbar-brand">
            <img src={logo_navbar} width="120" height="50" alt="navbar-img"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="menu">
            <div className="navbar-nav">
              <Link to="/" className={`nav-link ${page === 'Home' && 'current'}`}>Home</Link>
              <Link to="/discover" className={`nav-link ${page === 'Discover' && 'current'}`}>Discover</Link>
              <Link to="/top-rated" className={`nav-link ${page === 'Top Rated' && 'current'}`}>Top Rated</Link>
              {user && <>
                <Link to="/your-list" className={`nav-link ${page === 'Your List' && 'current'}`}>Your Lists</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <a href="/logout" className="nav-link">Log Out</a>
              </>}
              {!user && <>
                <Link to="/login" className={`nav-link ${page === 'Login' && 'current'}`}>Login</Link>
              </>}
              
            </div>
          </div>
        </div>
      </nav>
      

      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/discover">
          <Discover/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/logout">
          <Logout/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/top-rated">
          <TopRated/>
        </Route>
        <Route path="/detail/:movieId">
          <Detail/>
        </Route>
        <Route path="/your-list">
          <YourList/>
        </Route>
      </Switch>

      <footer className={`bg-dark text-center p-2 ${page === 'Login' && 'fixed-bottom'}`}>
        <FaInstagram className="mx-4" style={{width:'30px', height:'30px', color:'white'}}/>
        <FaTwitter className="mx-4" style={{width:'30px', height:'30px', color:'white'}}/>
        <FaFacebook className="mx-4" style={{width:'30px', height:'30px', color:'white'}}/><br/>
        <div style={{fontSize: '0.8em'}} className="my-2 text-white fw-light">&#169; 2021 by MFYZ. All Rights Reserved.</div>
      </footer>
    </Router>
  );
}

export default App;
