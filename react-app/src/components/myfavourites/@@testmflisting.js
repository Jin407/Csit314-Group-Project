import './myfavourites.css';

const TestMFListing = ({ listing, onView }) => {
    
    return (
      <div className="listing">
          <div className="listingbuttons">
              <button onClick={onView}>View</button>
          </div>
        <h2>ADDRESS1</h2>
        <p>Price: $1,000,000</p>
        <p>Status: UNSOLD</p>
        <div className="favstat">Favourited</div>
      </div>
    );
  };
  
  export default TestMFListing;