-- temp file to store query to add column
ALTER TABLE csit314.users
ADD status ENUM('Active','Suspended') DEFAULT 'Active';