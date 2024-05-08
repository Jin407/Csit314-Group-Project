from flask import Flask,request,jsonify
import mysql.connector
#base class
class User:

    #default constructor for base class
    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.userType = ''
        self.status = "active"
        self.connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        self.cursor = self.connection.cursor()

    def __repr__(self) -> str:
        return self.username
    
    def insert_into_database(self):
        try:
            query = "INSERT INTO csit314.Users (Username, Password, UserType) VALUES (%s, %s, %s);"
            self.cursor.execute(query, (self.username, self.password, self.userType))
            self.connection.commit()
            
            return True
        except mysql.connector.Error as err:
            print("Error:", err)
            return False
    
    #method to authenticate user login, user entity class will connect to database via this method
    #need to change to return bool
    def authLogin(self,username, password,userType) -> bool:
        try:
            #for admin login
            if(username == 'username' and password == "password"):
                return True
            
            if(userType == "REA"):
                userType = "Real estate agent"

            query = "SELECT * FROM csit314.Users WHERE username = %s AND password = %s AND UserType = %s;"
            self.cursor.execute(query, (username, password,userType))
            result = self.cursor.fetchall()

            #determine if any rows with the matching records found if not the user does not exist and is denied login
            return len(result) > 0
        except mysql.connector.Error as err:
            print("Error:", err)
            return False


#System admin class
class System_Admin(User):
    #default constructor for System admin class
    def __init__(self, username ,password):
        super().__init__(username,password)
        self.userType = "Admin"

    #method for system admin to view user details
    def viewUserDetails(self,username) ->list:
        query = "SELECT * FROM csit314.Users WHERE username = %s;"
        try:
            self.cursor.execute(query, (username,))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                ratings = result[5]
                createdAt = result[4]
                userType = result[6]
                user_details.append((ratings,userType,createdAt))
        
            return user_details
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False

    #method for system admin to view user's recent actions    
    def viewUserActions(self,username) -> list:
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
    def viewUserProfile(self,profilename) -> list:
        query = "SELECT * FROM csit314.userProfiles WHERE userType = %s;"
        try:
            self.cursor.execute(query, (profilename,))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                profilename = result[1]
                createdAt = result[3]
                requirements = result[2]
                user_details.append((profilename,requirements,createdAt))
        
            return user_details
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False
    
    #method for system admin to display user details on home page
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
        
    #method for system admin to display user types on home page
    def displayUserTypes(self):
        query = "SELECT * FROM csit314.userProfiles where UserType != 'admin' order by Profileid;"
        try:
            self.cursor.execute(query)
            results = self.cursor.fetchall()
            usertype_details = []
            for result in results:
                usertype = result[1]
                usertype_details.append((usertype))

            return usertype_details  # Return list of user details
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
        
    #method for system admin to update user profile
    def updateUserProfile(self,newprofileName,requirements, profileName)->bool:
        query = "INSERT INTO csit314.userProfiles (UserType,Requirements) VALUES (%s,%s);"
        query1 = "UPDATE csit314.users SET userType = %s WHERE userType = %s;"
        query2 = "DELETE FROM csit314.userProfiles WHERE UserType = %s;"
        try:
            self.cursor.execute(query, (newprofileName,requirements))
            self.cursor.execute(query1, (newprofileName,profileName))
            self.cursor.execute(query2, (profileName,))
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
        
    #method for system admin to suspend user accounts
    def suspendUserProfile(self,profileName)->bool:
        query = "UPDATE csit314.users SET Status='Suspended' WHERE UserType = %s;"
        try:
            self.cursor.execute(query, (profileName,))
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
    def searchUserAccount(self,username) -> bool:
        query = "SELECT * FROM csit314.Users WHERE username = %s;"
        try:
            self.cursor.execute(query, (username,))
            result = self.cursor.fetchall()
            if(result):
                return True
            else:
                return False
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False

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
        query = "INSERT INTO csit314.userProfiles (UserType) VALUES (%s);"
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
        self.userType = "Real estate agent"
        self.rating = 0

    #method for Real estate agent to create property listing
    def createPropertyListing(self, property)->bool:
        query = "INSERT INTO csit314.PropertyListings (address, price, agentUser, sellerUser) VALUES (%s, %s, %s, %s);"
        try:
            self.cursor.execute(query, (property.address, property.price, self.username, property.seller))
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
    def updatePropertyListings(self,newAddress, newPrice,newSeller, id)->bool:
        query = "UPDATE csit314.PropertyListings SET address = %s, price = %s, sellerUser= %s WHERE ListingId = %s;" # only updates price as of now
        try:
            self.cursor.execute(query, (newAddress, newPrice, newSeller, id))
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
    def viewPropertyListings(self,id):
        query = "SELECT * FROM csit314.PropertyListings WHERE listingID = %s;" # for now it returns a tuple of the entire row
        try:
            self.cursor.execute(query, (id,))
            result = self.cursor.fetchall()
            if len(result) > 0:
                return result 
            else:
                return "No listings found"  # No rows returned
        except mysql.connector.Error as err:
            print("Error:", err)

    #method for Real estate agent to preview listings
    def displayPropertyListings(self):
        query = "SELECT * FROM csit314.PropertyListings Where agentUser = %s;"
        try:
            self.cursor.execute(query,(self.username,))
            results = self.cursor.fetchall()
            listings = []
            for result in results:
                id = result[0]
                address = result[1]
                price = result[2]
                status = result[3]
                agent = result[4]
                seller = result[5]
                buyer = result[6]
                createdAt = result[7]
                viewCount = result[8]
                favCount = result[9]
                listing = PropertyListing(id=id, address=address, price=price, status=status, agent=agent, seller=seller, buyer=buyer, createdAt=createdAt, viewCount=viewCount, favCount=favCount)
                listings.append(listing)

            return listings

        except mysql.connector.Error as err:
            print("Error:", err)
        


    #method for Real estate agent to view their ratings
    def viewRatings(self):
        return self.rating

    #method for Real estate agent to view Reviews
    def viewReviews(self):
        query = "SELECT * FROM csit314.reviews WHERE agentUser = %s;" # for now it returns a tuple of the entire row
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
        self.userType = "Buyer"

    #method for Buyer to search for property listing
    def searchPropertyListings():
         pass#to be filled in later
    
    # Method for Buyer to save property listing
    def savePropertyListings(self, id):
        query = "INSERT INTO csit314.favourites (buyerUser, listing_id) VALUES (%s, %s);"
        try:
            self.cursor.execute(query, (self.username, id))
            self.connection.commit()
            return True
        except mysql.connector.Error as err:
            print("Error:",err)
            self.connection.rollback()
            return False

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
        self.userType = "Seller"

    # view the number of times property has been shortlisted/viewed
    def viewPropertyListingsDetails():
         pass#to be filled in later

    #method for Seller to rate their agent
    def rateAgent():
        pass#to be filled in later

    #method for Seller to review agent
    def reviewAgent():
        pass#to be filled in later

class PropertyListing():
    def __init__(self,id=None, address = None,price = None, status="Available", agent=None, seller=None, buyer=None,createdAt=None, viewCount=None, favCount=None):
        self.id = id
        self.address = address
        self.price = price
        self.status = status
        self.agent = agent
        self.seller = seller
        self.buyer = buyer
        self.createdAt = createdAt
        self.viewCount = viewCount
        self.favCount = favCount
    
    def createPropertyListing(self):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "INSERT INTO csit314.PropertyListings (address, price, agentUser, sellerUser) VALUES (%s, %s, %s, %s);"
        try:
            cursor.execute(query, (self.address, self.price, self.agent, self.seller))
            # Commit the transaction to apply changes to the database
            connection.commit()
            
        except mysql.connector.Error as err:
            print("Error:",err)
            # If there was an error, rollback the transaction to avoid partial changes
            connection.rollback()
    
    @classmethod
    def updatePropertyListing(cls, newAddress, newPrice, newSeller, id):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "UPDATE csit314.PropertyListings SET address = %s, price = %s, sellerUser= %s WHERE ListingId = %s;" # only updates price as of now
        try:
            cursor.execute(query, (newAddress, newPrice, newSeller, id))
            connection.commit()
            
        except mysql.connector.Error as err:
            print("Error:", err)

    @classmethod
    def deletePropertyListing(cls, id):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        print(id)
        query = "DELETE FROM csit314.PropertyListings WHERE ListingId = %s;"
        try:
            cursor.execute(query, (id,))
            connection.commit()
            
        except mysql.connector.Error as err:
            print("Error:", err)

    @classmethod
    def viewPropertyListing(cls, id)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT address,price,status,sellerUser,createdAt FROM csit314.PropertyListings WHERE ListingId = %s;"
        try:
            cursor.execute(query, (id,))
            results = cursor.fetchall()
            listing = []
            for result in results:
                address = result[0]
                price = result[1]
                status = result[2]
                seller = result[3]
                createdAt = result[4]
                listing.append((address,price,seller,status,createdAt))

            return listing
            
        except mysql.connector.Error as err:
            print("Error:", err)
            

'''
buyerTest = Buyer("buyer1", "password")
buyerTest.savePropertyListings(1)

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
    user_details = admin.viewUserProfile("Buyer")
    print(user_details)
