-- Create table for property listings, add other variables as required
CREATE TABLE PropertyListings (
    listingID INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    status ENUM('Available','Sold') default 'Available',
    agentUser varchar(50),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_agentUser FOREIGN KEY (agentUser) REFERENCES csit314.users(Username)
);