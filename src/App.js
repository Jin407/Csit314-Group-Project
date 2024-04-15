import './App.css';
import Headerbanner from './components//header/header.js';
import Footer from './components/footer/footer.js';
import Login from './components/login/login.js';
import CreateAccount from './components/createaccount/createaccount.js';

function App() {
  return (
    <div className="App">
      <Headerbanner/>
      <header className="App-header">
        <Login/>
        <CreateAccount/>
      </header>
      <Footer/>
      <br/>
    </div>
  );
}

export default App;
