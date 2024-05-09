-- creates a new table for reviews
CREATE TABLE csit314.reviews (
	reviewID INT auto_increment PRIMARY KEY,
	reviewerUser varchar(50),
    agentUser varchar(50),
    reviewText TEXT,
    created_at TIMESTAMP default current_timestamp,
	CONSTRAINT fk_reviewerUser foreign key (reviewerUser) references csit314.users (username),
    CONSTRAINT fk_agent foreign key (agentUser) references csit314.users (username)
);

-- to create a review: INSERT INTO reviews (reviewerUser, agentUser, reviewText) VALUES (%s, %s, %s);