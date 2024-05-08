-- create table for favourites

CREATE TABLE favourites (
	favourite_ID INT auto_increment PRIMARY KEY,
	buyerUser varchar(50),
    listing_ID INT,
	CONSTRAINT fk_buyerUser foreign key (buyerUser) references csit314.users (username),
    CONSTRAINT fk_listing_id foreign key (listing_ID) references csit314.propertylistings (listingid)
);