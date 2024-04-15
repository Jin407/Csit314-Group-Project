import "./footer.css";
import FooterFunctions from "./footerfunctions/footerfunctions";
import Sponsorbanner from "./sponsors/sponsors";

function Footer(){
    return(
    <>
        <FooterFunctions />
        <p className="footerVertFiller"/>
        <Sponsorbanner />
    </>
    )
}

export default Footer;