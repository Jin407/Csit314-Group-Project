import './sponsors.css';
import hbdlogoedited from './BigGuy-Logos_HDB.jpg';
import maslogoedited from './BigGuy-Logos_MAS.jpg';
import cpflogoedited from './BigGuy-Logos_CPF.jpg';
import iraslogoedited from './BigGuy-Logos_IRAS.jpg';

function Sponsorbanner(){
  return(
    <> 
      <p className="sponsorbanner">
      <hr/> 
        <table className="footertable">
          <tr className="footerrow1">
            <th>Approved by: </th>
          </tr>
        </table>
          <p className="footerrow2">
            <p className="sponsorcontainer" colSpan="4">
              <a href="https://www.hdb.gov.sg/cs/infoweb/homepage" target="_blank" rel="noopener noreferrer" className="sponsorelement"><img src={hbdlogoedited} alt="hdblogosmall" className="logosponsor"/></a>
              <a href="https://www.iras.gov.sg/" target="_blank" rel="noopener noreferrer" className="sponsorelement"><img src={iraslogoedited} alt="hdblogosmall" className="logosponsor"/></a>
              <a href="https://www.mas.gov.sg/" target="_blank" rel="noopener noreferrer" className="sponsorelement"><img src={maslogoedited} alt="maslogosmall" className="logosponsor"/></a>
              <a href="https://www.cpf.gov.sg/member" target="_blank" rel="noopener noreferrer" className="sponsorelement"><img src={cpflogoedited} alt="cpflogosmall" className="logosponsor"/></a>
            </p>
          </p>
        <p className="privatelimited">@2024 Big Guy Pte. Ltd.</p>
      </p>
    </>
  );
}

export default Sponsorbanner;