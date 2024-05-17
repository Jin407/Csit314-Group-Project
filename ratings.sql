-- creates a new table for ratings
CREATE TABLE csit314.ratings (
	ratingID INT auto_increment PRIMARY KEY,
	ratingUser varchar(50),
    agentUser varchar(50),
    ratings DECIMAL(15,2),
    created_at TIMESTAMP default current_timestamp,
	CONSTRAINT fk_ratingUser foreign key (ratingUser) references csit314.users (username),
    CONSTRAINT fk_agentUserConstraint foreign key (agentUser) references csit314.users (username)
);
