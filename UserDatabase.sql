DROP DATABASE UserDatabase;
CREATE DATABASE UserDatabase;
USE UserDatabase;


CREATE TABLE UserDatabase.Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType VARCHAR(50) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);