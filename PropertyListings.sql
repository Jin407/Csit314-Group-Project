-- Create table for property listings, add other variables as required
use csit314;

CREATE TABLE PropertyListings (
    listingID INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    status ENUM('Available','Sold') default 'Available',
    agentUser varchar(50),
    sellerUser varchar(50),
    buyerUser varchar(50) default null,
    viewcount INTEGER default 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_agentUsername FOREIGN KEY (agentUser) REFERENCES csit314.users(Username),
    CONSTRAINT fk_sellerUsername FOREIGN KEY (sellerUser) REFERENCES csit314.users(Username),
    CONSTRAINT fk_buyerUsername FOREIGN KEY (buyerUser) REFERENCES csit314.users(Username)
);
