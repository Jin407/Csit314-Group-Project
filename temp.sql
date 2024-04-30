ALTER TABLE csit314.users
ADD status ENUM('active','suspended') DEFAULT 'active';