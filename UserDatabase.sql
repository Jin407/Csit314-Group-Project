DROP Table csit314.users;

CREATE TABLE csit314.users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType VARCHAR(50) NOT NULL,
    Status ENUM('Active','Suspended') DEFAULT 'Active',
    ratings DECIMAL(15,2) DEFAULT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserType) REFERENCES userProfiles(UserType)
);