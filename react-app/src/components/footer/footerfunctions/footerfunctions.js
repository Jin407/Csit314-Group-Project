import './footerfunctions.css';
import instalogo from './insta-logo-small.png';
import facebooklogo from './facebook-logo-small.png';
import linkedinlogo from './linkedin-logo-small.png';
import youtubelogo from './youtube-logo-small.png';

function FooterFunctions(){
    return(
    <>
        <div className="footerbanner">
            <h2 className="footercompname">BIG GUY</h2>
            <p className="footer4columns">
                <p className="footercolumn1">
                    <p className="footerheader">General</p><p className="footerVertFiller"/>
                    <p className="footerliner">Home</p>
                    <p className="footerliner">My Profile</p>
                    <p className="footerliner">Search</p>
                    <p className="footerliner">Profile</p>
                </p>
                <p className="footercolumn2">
                    <p className="footerheader">About Us</p><p className="footerVertFiller"/>
                    <p className="footerliner">Our Company</p>
                    <p className="footerliner">Our Team</p>
                    <p className="footerliner">Disclaimer</p>
                    <p className="footerliner">Privacy Policy</p>
                    <p className="footerVertFiller" />
                </p>
                <p className="footercolumn3">
                </p>
                <p className="footercolumn4">
                    <p className="footerheader">Contact us</p><p className="footerVertFiller"/>
                    <img src={instalogo} alt="instagramlogosmall" className="footersmlogo"/>
                    <img src={facebooklogo} alt="facebooklogosmall" className="footersmlogo"/>
                    <img src={linkedinlogo} alt="linkedinlogosmall" className="footersmlogo"/>
                    <img src={youtubelogo} alt="youtubelogosmall" className="footersmlogo"/>
                </p>
            </p>            
        </div>
        
    </>
    )
}

export default FooterFunctions;