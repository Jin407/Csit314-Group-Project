import './App.css';
import {BrowserRouter as Router,  Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginpage.js';
import CreateAccountPage from './pages/createaccpage.js';
import { Component } from 'react';
import ProfilePage from './pages/profilepage.js';
import SAHomePage from './pages/sahomepage.js';
import CreateDynamicAccount from './components/createdynamicaccount/createdynamicaccount.js';
import UpdateProfile from './components/updateprofile/updateprofile.js';
import ViewProfile from './components/viewprofile/viewprofile.js';
import EditProfilePage from './pages/editaccountpage.js';
import RateAndReviewPage from './pages/rateandreviewpage.js';
import REAHomePage from './pages/reahomepage.js';
import REACreateListingPage from './pages/reacreatelistingpage.js';
import ViewListingPage from './pages/viewlistingpage.js';
import UpdateListingPage from './pages/updatelistingpage.js';
import BuyerHomePage from './pages/buyerhomepage.js';
import MortgageCalculatorPage from './pages/mortgagecalculatorpage.js';
import SellerHomePage from './pages/sellerhomepage.js';

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
            <Route path='/reahomepage/:username' element={ <REAHomePage /> } />
            <Route path='/buyerhomepage/:username' element={ <BuyerHomePage /> } />
            <Route path='/sellerhomepage/:username' element={ <SellerHomePage /> } />
            <Route path='/sacreateaccountpage/:userType' element = { <CreateDynamicAccount /> } />
            <Route path='/saupdateprofilepage/:userType' element = { <UpdateProfile /> } />
            <Route path='/saviewprofilepage/:userType' element = { <ViewProfile /> } />
            <Route path='/editprofile/:userType' element = { <EditProfilePage /> } />
            <Route path='/rateandreview/:userType/:username/:agentname' element = { <RateAndReviewPage /> } />
            <Route path='/reacreatelistingpage/:username' element={ <REACreateListingPage /> } />
            <Route path='/viewlistingpage/:userType/:listingid' element={ <ViewListingPage /> } />
            <Route path='/updatelistingpage/:listingid' element={ <UpdateListingPage /> } />
            <Route path='/mortgagecalculatorpage' element={<MortgageCalculatorPage/>}/>
            
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