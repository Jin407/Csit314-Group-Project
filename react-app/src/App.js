import './App.css';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage.js';
import CreateAccountPage from './pages/createaccpage.js';
import { Component } from 'react';
import ProfilePage from './pages/profilepage.js';
import SAHomePage from './pages/sahomepage.js';
import CreateDynamicAccount from './components/createdynamicaccount/createdynamicaccount.js';
import EditProfilePage from './pages/editprofilepage.js';

class App extends Component{
  render(){
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path='/' exact element={ <LoginPage /> } />
            <Route path='/createaccountpage' element={ <CreateAccountPage /> } />
            <Route path='/profilepage/:user' element={ <ProfilePage /> } />
            <Route path='/sahomepage' element={ <SAHomePage /> } />
            <Route path='/sacreateaccountpage/:userType' element = { <CreateDynamicAccount /> } />
            <Route path='/editprofile/:userType' element = { <EditProfilePage /> } />
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