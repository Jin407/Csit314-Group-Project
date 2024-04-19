import './App.css';
import Headerbanner from './components//header/header.js';
import Footer from './components/footer/footer.js';
import Login from './components/login/login.js';
import CreateAccount from './components/createaccount/createaccount.js';
import ProfileTable from './components/profiletable/profiletable.js';
import { Component } from 'react';

class App extends Component{
  render(){
    return (
      <div className="App">
        <Headerbanner/>
        <header className="App-header">
          <Login/>
          <CreateAccount/>
          <ProfileTable/>
        </header>
        <Footer/>
      </div>
    );
  }
}

export default App;
