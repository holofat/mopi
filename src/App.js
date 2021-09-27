import React from 'react'
import Home from './components/Home';

import logo_navbar from './components/img/logo.png'
import './styles/navbar.css'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"

function App() {
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
              <a href="/" className="nav-link current">Home</a>
              <a href="/#" className="nav-link">Discover</a>
              <a href="/news" className="nav-link">Top Rated</a>
              <a href="/contact" className="nav-link">Recommendations</a>
            </div>
          </div>
          <div className="profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
