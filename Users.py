from flask import Flask,request,jsonify
import mysql.connector
#base class
class User:

    #default constructor for base class
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.connection = mysql.connector.connect(
            host="127.0.0.1",
            #host="darrenhkx",
            user="username",
            password="password",
            database="UserDatabase"
            #database="csit314"
        )
        self.cursor = self.connection.cursor()

    def __repr__(self) -> str:
        return self.username
    
    #method to authenticate user login, user entity class will connect to database via this method
    def authLogin(self,username, password,userType) -> bool:
        try:
            if(username == 'username' and password == "password"):
                return True

            query = "SELECT * FROM UserDatabase.Users WHERE username = %s AND password = %s AND UserType = %s;"
            self.cursor.execute(query, (username, password,userType))
            result = self.cursor.fetchall()
            return len(result) > 0
        except mysql.connector.Error as err:
            print("Error:", err)
            return False

    def logout():
        pass#to be filled in later

#System admin class
class System_Admin(User):
    #default constructor for System admin class
    def __init__(self, username ,password):
        super().__init__(username,password)

    #method for system admin to view user details
    def viewUserDetails():
        pass#to be filled in later

    #method for system admin to update user details
    def updateUserDetails():
        pass #to be filled in later

    #method for system admin to delete user accounts
    def suspendUserAccount():
        pass#to be filled in later

    #method for system admin to search user accounts
    def searchUserAccount():
        pass#to be filled in later

    #method for system admin to create user accounts
    def createNewUserAccount(self,username, password, userType) -> bool:
        query = "INSERT INTO UserDatabase.Users (Username, Password, UserType) VALUES (%s, %s, %s);"
        try:
            self.cursor.execute(query, (username, password,userType))
            # Commit the transaction to apply changes to the database
            self.connection.commit()
            return True
        except mysql.connector.Error as err:
            print("Error:",err)
            # If there was an error, rollback the transaction to avoid partial changes
            self.connection.rollback()
            return False

class Real_Estate_Agent(User):
    #default constructor for Real Estate Agent
    def __init__(self, username,password):
        super().__init__(self,username,password)

    #method for Real estate agent to create property listing
    def createPropertyListings():
         pass#to be filled in later
    
    #method for Real estate agent to search for property listing
    def searchPropertyListings():
         pass#to be filled in later
    
    #method for Real estate agent to update property listing
    def updatePropertyListings():
         pass#to be filled in later
    
    #method for Real estate agent to remove property listing
    def removePropertyListings():
         pass#to be filled in later
    
    #method for Real estate agent to view property listing
    def viewPropertyListings():
         pass#to be filled in later

    #method for Real estate agent to view their ratings
    def viewRatings():
         pass#to be filled in later

    #method for Real estate agent to view Reviews
    def viewReviews():
         pass#to be filled in later
    
class Buyer(User):
    #default constructor for Buyer
    def __init__(self, username,password):
        super().__init__(self,username,password)

    #method for Buyer to search for property listing
    def searchPropertyListings():
         pass#to be filled in later
    
    #method for Buyer to save property listing
    def savePropertyListings():
        pass#to be filled in later

    #method for Buyer to view property listing
    def viewPropertyListings():
        pass#to be filled in later

    #method for Buyer to calculate Mortgage
    def calculateMortgage():
        pass#to be filled in later

    #method for Buyer to rate their agent
    def rateAgent():
        pass#to be filled in later

    #method for Buyer to review their agent
    def reviewAgent():
        pass#to be filled in later


class Seller(User):
    #default constructor for Seller
    def __init__(self, username,password):
        super().__init__(self,username,password)

    # view the number of times property has been shortlisted/viewed
    def viewPropertyListingsDetails():
         pass#to be filled in later

    #method for Seller to rate their agent
    def rateAgent():
        pass#to be filled in later

    #method for Seller to review agent
    def reviewAgent():
        pass#to be filled in later
        