import './App.css';
import Headerbanner from './components//header/header.js';
import Footer from './components/footer/footer.js';
import Login from './components/login/login.js';
import CreateAccount from './components/createaccount/createaccount.js';
import ProfileTable from './components/profiletable/profiletable.js';
import AccountDetails from './components/accountdetails/accountdetails.js';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage.js';
import CreateAccountPage from './pages/createaccpage.js';
import { Component } from 'react';
import ProfilePage from './pages/profilepage.js';
import SAHomePage from './pages/sahomepage.js';

class App extends Component{
  render(){
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path='/' exact element={ <LoginPage /> } />
            <Route path='/createaccountpage' element={ <CreateAccountPage /> } />
            <Route path='/profilepage' element={ <ProfilePage /> } />
            <Route path='/sahomepage' element={ <SAHomePage /> } />
          </Routes>
        </header>
      </div>
      </Router>
    );
  }
}

export default App;

/*
          <Login/>
          <CreateAccount/>
          <ProfileTable/>
          <AccountDetails/>
*/