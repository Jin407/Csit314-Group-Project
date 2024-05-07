from flask import Flask,request,jsonify
import mysql.connector
#base class
class User:

    #default constructor for base class
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.status = "active"
        self.connection = mysql.connector.connect(
            host="127.0.0.1",
            #host="darrenhkx",
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
    def viewUserDetails(self,username):
        query = "SELECT * FROM csit314.Users WHERE username = %s;"
        try:
            self.cursor.execute(query, (username,))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                ratings = result[6]
                createdAt = result[5]
                userType = result[3]
                user_details.append((ratings,userType,createdAt))
        
            return user_details
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False
        
    def viewUserActions(self,username):
        query = "SELECT *,CASE WHEN agentUser = %s THEN 'agentUser' WHEN buyerUser = %s Then 'buyerUser' WHEN sellerUser = %s THEN 'sellerUser' END AS retrieved_from FROM csit314.PropertyListings WHERE buyerUser = %s OR sellerUser = %s OR agentUser = %s;"
        try:
            self.cursor.execute(query, (username,username,username,username,username,username))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                address = result[1]
                createdAt = result[7]
                userType = result[8]
                user_details.append((address,userType,createdAt))
        
            return user_details
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False
    
    #method for system admin to view user details
    def displayUserDetails(self,usertype):
        query = "SELECT * FROM csit314.Users WHERE userType = %s Limit 5;"
        try:
            self.cursor.execute(query,(usertype,))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                username = result[1]
                status = result[3]
                createdAt = result[4]
                user_details.append((username, createdAt, status))

            return user_details  # Return list of user details
            #message = f"Username: {result[0][1]}\nCreated at: {result[0][4]}
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False

    #method for system admin to update user details
    def updateUserDetails(self,newPassword,username)->bool:
        query = "UPDATE csit314.users SET  Password = %s WHERE Username = %s;"
        try:
            self.cursor.execute(query, (newPassword,username))
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
        
    #method for system admin to update user details
    def updateUserProfile(self,newprofileName, profileName)->bool:
        query = "UPDATE csit314.user_types SET type = %s WHERE type = %s;"
        try:
            self.cursor.execute(query, (newprofileName,profileName))
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


    #method for system admin to suspend user accounts
    def suspendUserAccount(self,username)->bool:
        query = "UPDATE csit314.users SET Status='Suspended' WHERE Username = %s;"
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
        
    #method for system admin to reactivate user accounts
    def reactivateUserAccount(self,username)->bool:
        query = "UPDATE csit314.users SET Status='Active' WHERE Username = %s;"
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

     #method for system admin to create new user profile   
    def createNewUserProfile(self,profileName) -> bool:
        query = "INSERT INTO csit314.user_types (type) VALUES (%s);"
        try:
            self.cursor.execute(query, (profileName,))
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
        self.rating = 0

    #method for Real estate agent to create property listing
    def createPropertyListings(self, propertyAddress, price)->bool:
        query = "INSERT INTO csit314.PropertyListings (address, price, agentUser) VALUES (%s, %s, %s);"
        try:
            self.cursor.execute(query, (propertyAddress, price, self.username))
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
    
    #method for Real estate agent to update property listing
    def updatePropertyListings(self, newprice, id)->bool:
        query = "UPDATE csit314.PropertyListings SET price = %s WHERE ListingId = %s;" # only updates price as of now
        try:
            self.cursor.execute(query, (newprice, id))
            if self.cursor.rowcount == 0:
                print("No listing found with ID:", id)
                return False
            self.connection.commit()
            return True
        except mysql.connector.Error as err:
            print("Error:", err)
            return False
    
    #method for Real estate agent to remove property listing
    def removePropertyListings(self, id):
        query = "DELETE FROM csit314.PropertyListings WHERE ListingId = %s;"
        try:
            self.cursor.execute(query, (id,))
            if self.cursor.rowcount == 0:
                print("No listing found with ID:", id)
                return False
            self.connection.commit()
            return True 
        except mysql.connector.Error as err:
            print("Error:", err)
            return False
    
    #method for Real estate agent to view property listing
    def viewPropertyListings(self):
        query = "SELECT * FROM csit314.PropertyListings WHERE agentUser = %s;" # for now it returns a tuple of the entire row
        try:
            self.cursor.execute(query, (self.username,))
            result = self.cursor.fetchall()
            if len(result) > 0:
                return result 
            else:
                return "No listings found"  # No rows returned
        except mysql.connector.Error as err:
            print("Error:", err)

    #method for Real estate agent to view their ratings
    def viewRatings(self):
        return self.rating

    #method for Real estate agent to view Reviews
    def viewReviews(self):
        query = "SELECT  FROM csit314.reviews WHERE agentUser = %s;" # for now it returns a tuple of the entire row
        try:
            self.cursor.execute(query, (self.username,))
            result = self.cursor.fetchall()
            if len(result) > 0:
                return result 
            else:
                return "No reviews found"  # No rows returned
        except mysql.connector.Error as err:
            print("Error:", err)
    
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
rea = Real_Estate_Agent("REA1", "password")
#rea.createPropertyListings("Hougang ave 9","9999999")
results = rea.viewReviews()
print(results)

if __name__ == '__main__':
 admin = System_Admin("username","password")
 count = 0
 for x in range(10):
     username = "seller" + str(count)
     password = "sellerpass" + str(count)
     admin.createNewUserAccount(username,password,"seller")
     count += 1
'''
if __name__ == '__main__':
    admin = System_Admin("username","password")
    # Assuming you have an instance of the class containing the `displayUserDetails` method
    # For example, if your instance is named `instance`:
    user_details = admin.viewUserActions("Leeroy")
    print(user_details)

