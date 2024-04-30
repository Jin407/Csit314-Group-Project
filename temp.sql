-- temp file to store query to add column
ALTER TABLE csit314.users
ADD status ENUM('active','suspended') DEFAULT 'active';