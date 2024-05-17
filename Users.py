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
    
    def createNewUserAccount(self) -> bool:
        try:
            query = "INSERT INTO csit314.Users (Username, Password, UserType) VALUES (%s, %s, %s);"
            self.cursor.execute(query, (self.username, self.password, self.userType))
            self.connection.commit()
            
            return True
        except mysql.connector.Error as err:
            print("Error:", err)
            return False
    
    #method to authenticate user login, user entity class will connect to database via this method
    def authLogin(self,username, password,userType) -> bool:
        try:
            query1 =  "SELECT username,password FROM csit314.Users WHERE UserType = 'Admin';"
            self.cursor.execute(query1)
            result1 = self.cursor.fetchone()
            if result1:
                admin_username = result1[0]
                admin_password = result1[1]

            #for admin login
            if(username == admin_username and password == admin_password):
                return True
            
            if(userType == "REA"):
                userType = "Real estate agent"

            query = "SELECT * FROM csit314.Users WHERE username = %s AND password = %s AND UserType = %s AND status = 'Active';"
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
        query = "SELECT createdAt,userType FROM csit314.Users WHERE username = %s;"
        try:
            self.cursor.execute(query, (username,))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                createdAt = result[0]
                userType = result[1]
                user_details.append((userType,createdAt))
        
            return user_details
           
            
        except mysql.connector.Error as err:
            print("Error:",err)
            return False

    #method for system admin to view user's recent actions    
    def viewUserActions(self,username) -> list:
        query = "SELECT address,CreatedAt,agentUser, CASE WHEN agentUser = %s THEN 'agentUser' WHEN buyerUser = %s Then 'buyerUser' WHEN sellerUser = %s THEN 'sellerUser' END AS retrieved_from FROM csit314.PropertyListings WHERE buyerUser = %s OR sellerUser = %s OR agentUser = %s;"
        try:
            self.cursor.execute(query, (username,username,username,username,username,username))
            results = self.cursor.fetchall()
            user_details = []
            for result in results:
                address = result[0]
                createdAt = result[1]
                agent = result[2]
                userType = result[3]
                user_details.append((address,userType,createdAt,agent))
        
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
    def displayUserDetails(self,usertype)->list:
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
    def displayUserTypes(self)->list:
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

    
    

class Buyer(User):
    #default constructor for Buyer
    def __init__(self, username,password):
        super().__init__(username,password)
        self.userType = "Buyer"



class Seller(User):
    #default constructor for Seller
    def __init__(self, username,password):
        super().__init__(username,password)
        self.userType = "Seller"


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
        query2 = "UPDATE csit314.propertylistings SET viewcount = viewcount + 1 WHERE ListingId = %s;"
        try:
            cursor.execute(query, (id,))
            results = cursor.fetchall()
            print("called")
            cursor.execute(query2, (id,))
            connection.commit()
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

    @classmethod
    def displayPropertyListings(cls,username)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT * FROM csit314.PropertyListings WHERE agentUser = %s or sellerUser = %s;"
        try:
            cursor.execute(query,(username,username))
            results = cursor.fetchall()
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
     
    

    @classmethod
    def displaySoldPropertyListings(cls)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT * FROM csit314.PropertyListings WHERE status = 'Sold';"
        try:
            cursor.execute(query)
            results = cursor.fetchall()
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

    @classmethod
    def displayUnsoldPropertyListings(cls)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT * FROM csit314.PropertyListings WHERE status = 'Available';"
        try:
            cursor.execute(query)
            results = cursor.fetchall()
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

    @classmethod
    def favouritePropertyListing(cls, username, listingId):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "Insert into csit314.favourites (buyerUser,listing_id) VALUES (%s,%s)"
        query2 = "UPDATE csit314.propertylistings SET favcount = favcount + 1 WHERE ListingId = %s;"
        try:
            cursor.execute(query, (username, listingId))
            # Commit the transaction to apply changes to the database
            connection.commit()
            cursor.execute(query2,(listingId,))
            connection.commit()
            
        except mysql.connector.Error as err:
            print("Error:",err)
            # If there was an error, rollback the transaction to avoid partial changes
            connection.rollback()

    @classmethod
    def displaySoldFavouritePropertyListings(cls, username)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT PropertyListings.* FROM PropertyListings INNER JOIN Favourites ON PropertyListings.ListingID = Favourites.Listing_ID INNER JOIN users ON Favourites.buyerUser = users.username WHERE users.username = %s AND PropertyListings.status = 'sold';"
        try:
            cursor.execute(query,(username,))
            results = cursor.fetchall()
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

    @classmethod
    def displayUnsoldFavouritePropertyListings(cls, username)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT PropertyListings.* FROM PropertyListings INNER JOIN Favourites ON PropertyListings.ListingID = Favourites.Listing_ID INNER JOIN users ON Favourites.buyerUser = users.username WHERE users.username = %s AND PropertyListings.status = 'Available';"
        try:
            cursor.execute(query,(username,))
            results = cursor.fetchall()
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

    @classmethod
    def displayPropertyListingsForSeller(cls,username)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT * FROM csit314.PropertyListings WHERE agentUser = %s or sellerUser = %s;"
        try:
            cursor.execute(query,(username,username))
            results = cursor.fetchall()
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


class Review():
    def __init__(self,reviewerUser,agentUser,review):
        self.reviewerUser = reviewerUser
        self.agentUser = agentUser
        self.review = review

    @classmethod
    def viewReviews(cls,agentUser)->list:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT * FROM csit314.reviews WHERE agentUser = %s;" 
        try:
            cursor.execute(query, (agentUser,))
            results = cursor.fetchall()
            reviews = []
            for result in results:
                reviewer = result[1]
                agent = result [2]
                review = result[3]
                reviews.append((reviewer,agent,review))

            return reviews
            
        except mysql.connector.Error as err:
            print("Error:", err)

    def createReview(self):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "INSERT into csit314.reviews(reviewerUser,agentUser,reviewText) VALUES (%s,%s,%s);"
        try:
            cursor.execute(query, (self.reviewerUser,self.agentUser,self.review))
            connection.commit()
            
            return None
        except mysql.connector.Error as err:
            print("Error:", err)
            return err

class Rating():
    def __init__(self,ratingUser,agentUser,rating):
        self.ratingUser = ratingUser
        self.agentUser = agentUser
        self.rating = rating


    @classmethod
    def viewRating(cls,agentUser)->float:
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "SELECT AVG(ratings) FROM csit314.ratings WHERE agentUser = %s;" 
        try:
            cursor.execute(query, (agentUser,))
            result = cursor.fetchone()
            if result:
                final_rating = round(float(result[0]),2)
                return final_rating
            else:
                return None
            
        except mysql.connector.Error as err:
            print("Error:", err)

    def createRating(self):
        connection = mysql.connector.connect(
                host="127.0.0.1",
                user="username",
                password="password",
                database="csit314"
            )
        cursor = connection.cursor()
        query = "INSERT into csit314.ratings(ratingUser,agentUser,ratings) VALUES (%s,%s,%s);"
        try:
            cursor.execute(query, (self.ratingUser,self.agentUser,self.rating))
            connection.commit()
            
            return None
        except mysql.connector.Error as err:
            print("Error:", err)
            return err

