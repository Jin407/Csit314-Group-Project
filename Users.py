from flask import Flask,request,jsonify
import mysql.connector
#base class
class User:

    #default constructor for base class
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.connection = mysql.connector.connect(
            #host="127.0.0.1",
            host="darrenhkx",
            user="username",
            password="password",
            database="csit314"
        )
        self.cursor = self.connection.cursor()

    def __repr__(self) -> str:
        return self.username
    
    #method to authenticate user login, user entity class will connect to database via this method
    #need to change to return bool
    def authLogin(self,username, password,userType) -> bool:
        try:
            #for admin login
            if(username == 'username' and password == "password"):
                return True

            query = "SELECT * FROM csit314.Users WHERE username = %s AND password = %s AND UserType = %s;"
            self.cursor.execute(query, (username, password,userType))
            result = self.cursor.fetchall()

            #determine if any rows with the matching records found if not the user does not exist and is denied login
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
    def viewUserDetails(self,username) -> str:
        query = "SELECT * FROM csit314.Users WHERE username = %s;"
        try:
            self.cursor.execute(query, (username))
            result = self.cursor.fetchall()
            #check if any user found
            if(len(result) > 0):
                #format user's info
                message = f"User ID: {result[0][0]}\nUsername: {result[0][1]}\nPassword: {result[0][2]}\nUser Type: {result[0][3]}\nCreated at: {result[0][4]}"

                return message
            else:
                return "Username not found" #no rows returned
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False

    #method for system admin to update user details
    def updateUserDetails(self,password,userType,username)->bool:
        query = "UPDATE csit314.users SET Password = %s,userType=%s WHERE Username = %s;"
        try:
            self.cursor.execute(query, (password,userType,username))
            self.connection.commit() # Ensure change is committed and reflected in database
            #check if any rows were affected by the update
            if(self.cursor.rowcount > 0):
                return True # User successfully updated
            else:
                return False # No rows were affected, user not found
            
        except mysql.connector.Error as err:
            print("Error:",err)
            self.connection.rollback()
            return False # Deletion failed due to an error


    #method for system admin to delete user accounts
    def suspendUserAccount(self,username)->bool:
        query = "DELETE FROM csit314.users WHERE Username = %s;"
        try:
            self.cursor.execute(query, (username,))
            self.connection.commit() # Ensure change is committed and reflected in database
            # Check if any rows were affected by the delete operation
            if self.cursor.rowcount > 0:
                return True  # User successfully deleted
            else:
                return False  # No rows were affected, user not found
        except Exception as e:
            print("Error:", e)
            self.connection.rollback()
            return False  # Deletion failed due to an error

    #method for system admin to search user accounts
    def searchUserAccount():
        pass#to be filled in later

    #method for system admin to create user accounts
    def createNewUserAccount(self,username, password, userType) -> bool:
        query = "INSERT INTO csit314.Users (Username, Password, UserType) VALUES (%s, %s, %s);"
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
        super().__init__(username,password)

    #method for Real estate agent to create property listing
    def createPropertyListings(self, propertyAddress, price):
        query = "INSERT INTO csit314.PropertyListings (address, price) VALUES (%s, %s);"
        try:
            self.cursor.execute(query, (propertyAddress, price))
            # Commit the transaction to apply changes to the database
            self.connection.commit()
            return True
        except mysql.connector.Error as err:
            print("Error:",err)
            # If there was an error, rollback the transaction to avoid partial changes
            self.connection.rollback()
            return False
    
    # Method to search for property listings 
    def searchPropertyListings(self, searched):
        query = "SELECT address FROM csit314.PropertyListings WHERE address LIKE %s;"
        try:
            self.cursor.execute(query, (f"%{searched}%",))  # Wrap the search string with % and pass it as a tuple
            result = self.cursor.fetchall()
            if len(result) > 0:
                return result  # Return tuples of all matches (can extract them as strings into a list but idk if thats ok)
            else:
                return "No listings match"  # No rows returned
        except mysql.connector.Error as err:
            print("Error:", err)
    
    #method for Real estate agent to update property listing           (have not tested yet, might add more things)
    def updatePropertyListings(self, newprice, id):
        query = "UPDATE csit314.PropertyListings SET price = %s WHERE address = %s;" # only updating price as of now
        try:
            self.cursor.execute(query, (newprice, id)) 
        except mysql.connector.Error as err:
            print("Error:", err)
    
    #method for Real estate agent to remove property listing
    def removePropertyListings(self, id):
        query = "DELETE FROM csit314.PropertyListings WHERE id = %s"
        try:
            self.cursor.execute(query, id) 
        except mysql.connector.Error as err:
            print("Error:", err)
    
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
        super().__init__(username,password)

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
        super().__init__(username,password)

    # view the number of times property has been shortlisted/viewed
    def viewPropertyListingsDetails():
         pass#to be filled in later

    #method for Seller to rate their agent
    def rateAgent():
        pass#to be filled in later

    #method for Seller to review agent
    def reviewAgent():
        pass#to be filled in later

''' test
rea = Real_Estate_Agent("user1", "password1")
#rea.createPropertyListings("Hougang ave 10","9999999")
#rea.createPropertyListings("Lorong 1 Toa Payoh","282828")
results = rea.searchPropertyListings('Hougang')
print(results)
'''