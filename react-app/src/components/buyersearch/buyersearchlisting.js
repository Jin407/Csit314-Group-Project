const BSListing = ({ listing, onView, onFavourite }) => {
    
    return (
      <div className="listing">
          <div className="listingbuttons">
              <button onClick={onView}>View</button>
          </div>
        <h2>{listing.address}</h2>
        <p>Price: ${listing.price}</p>
        <p>Status: {listing.status}</p>
        <div className="favstat"><button onClick={onFavourite}>Favourite</button></div>
      </div>
    );
  };
  
  export default BSListing;