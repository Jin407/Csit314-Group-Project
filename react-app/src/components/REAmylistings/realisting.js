import React from 'react';
import './realistings.css'

const Listing = ({ listing, onDelete, onView, onUpdate }) => {
  return (
    <div className="listing">
        <div className="listingbuttons">
            <button onClick={onView}>View</button>
            <button onClick={onUpdate}>Update</button>
        </div>
      <h2>{listing.address}</h2>
      <p>Price: ${listing.price}</p>
      <p>Status: {listing.status}</p>
      {listing.buyer && <p>Buyer: {listing.buyer}</p>}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Listing;
