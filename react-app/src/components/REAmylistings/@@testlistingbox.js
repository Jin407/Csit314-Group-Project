import React from 'react';
import './realistings.css'

const Listing = ({ listing, onDelete, onView, onUpdate }) => {
  return (
    <div className="listing">
        <div className="listingbuttons">
            <button onClick={onView}>View</button>
            <button onClick={onUpdate}>Update</button>
        </div>
      <h2>ADDRESS</h2>
      <p>Price: $1,000,000</p>
      <p>Status: Sold</p>
      <p>Buyer: Buyer1</p>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Listing;
