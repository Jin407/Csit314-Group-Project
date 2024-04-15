import './header.css';
import houselogo from './house-logo.png';
import profilepic from './profilepic.png';

function Headerbanner(){
  return(
    <>
      <p className="headerbanner">
        <p className="companylogo"><img src={houselogo} alt="logo" className="compLogo"/></p>
        <p className="companyname">Big Guy</p>
        <p className="filler"/>
        <p className="flushedright">
          <p className="header-flex">Search</p>
          <p className="header-flex">Listings</p>
          <p className="header-flex">Favourite</p>
          <p className="header-flex4"><p className="profileName">Tam Zhi Wen</p><img src={profilepic} alt="logo" className="profilePic"/></p>
        </p>
      </p>
    </>
  );
}

export default Headerbanner;