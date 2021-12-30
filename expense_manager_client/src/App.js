import React from 'react'
import {Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Logout from './components/Logout';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>

      
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup"> 
        <Signup />
      </Route>
      
      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

    </>
  )
}

export default App
