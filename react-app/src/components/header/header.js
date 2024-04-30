import './header.css';
import houselogo from './house-logo.png';
import profilepic from './profilepic.png';

function Headerbanner(){
  return(
    <>
      <p className="headerbanner">
        <p className="companylogo"><img src={houselogo} alt="logo" className="compLogo"/></p>
        <p className="companyname">BIG GUY</p>
        <p className="filler"/>
        <p className="flushedright">
          <p className="header-flex">SEARCH</p>
          <p className="header-flex">LISTINGS</p>
          <p className="header-flex">FAVOURITE</p>
          <p className="header-flex4"><p className="profileName">TAM ZHI WEN</p><img src={profilepic} alt="logo" className="profilePic"/></p>
        </p>
      </p>
    </>
  );
}

export default Headerbanner;