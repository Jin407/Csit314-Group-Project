from Users import User, System_Admin, Real_Estate_Agent, Buyer, Seller,PropertyListing, Review
# install the connector in terminal: pip install mysql-connector-python
import mysql.connector
#pip install flask
from flask import Flask,request,jsonify,make_response
#pip install flask-cors
from flask_cors import CORS
import json

#base class running flask app
class BaseController:
    #constructor for control class
    def __init__(self,app):
        self.app = app
        CORS(self.app)
        self.register_routes()

    def register_routes(self):
        raise NotImplementedError("Subclasses must implement register_routes method")

#control class in BCE framework
class LoginController(BaseController):
    
    def register_routes(self):
        #dummy method to return data to front end can be removed later on
        @self.app.route('/api/data')
        def get_data():
            data = {'message': 'Hello World!'}
            return jsonify(data)
        
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/login', methods=['POST'])
        def login():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')
                password = data.get('password')
                userType = data.get('userType')
                #user type is Buyer, Seller or REA only got 1 Admin
                
                user = User(username,password)

                login_success = user.authLogin(username,password,userType)
                print(username,password,login_success)
                
                return jsonify({'success': login_success})
            
                
            else:
                return jsonify({'error': 'Method not allowed'}), 405

class CreateAccountController(BaseController):

    def register_routes(self):
        
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/create-account', methods=['POST'])
        def createAccount():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')
                password = data.get('password')
                userType = data.get('userType')
                
                #user type is Buyer, Seller or REA only got 1 Admin
                if(userType == 'REA' or userType == "Real estate agent"):
                    user = Real_Estate_Agent(username,password)
                elif(userType == 'buyer' or userType == 'Buyer'):
                    user = Buyer(username,password)
                elif(userType == 'seller' or userType == 'Seller'):
                    user = Seller(username,password)
                
                createAccount_success = user.insert_into_database()

                return jsonify({'success': createAccount_success})
                
    
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
class CreateProfileController(BaseController):

    def register_routes(self):
        
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/create-profile', methods=['POST'])
        def createProfile():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                profileName = data.get('profileName')
                #user type is Buyer, Seller or REA only got 1 Admin

                admin = System_Admin("username","password")
                            
                createProfile_success = admin.createNewUserProfile(profileName)
                
                return jsonify({'success': createProfile_success})
                
    
            else:
                return jsonify({'error': 'Method not allowed'}), 405


class ViewUserDetailsController(BaseController):

    def register_routes(self):
        #method to preview users in system admin page
        @self.app.route('/api/display-users', methods=['POST'])
        def displayUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                usertype = data.get('usertype')

                admin = System_Admin("username","password")
                user_details = admin.displayUserDetails(usertype)

                if user_details:
                    return jsonify(user_details)
                else:
                    return jsonify({'error': 'No user details found'})
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
        #method to display usertypes in system admin page
        @self.app.route('/api/display-user-types', methods=['GET'])
        def displayUserTypes():
            if request.method == 'GET':
                
                # Assuming data contains username and password

                admin = System_Admin("username","password")
                usertype_details = admin.displayUserTypes()
                print(usertype_details)

                if usertype_details:
                    return jsonify(usertype_details)
                else:
                    return jsonify({'error': 'No user details found'})
            else:
                return jsonify({'error': 'Method not allowed'}), 405


        
        @self.app.route('/api/view-user-details', methods=['POST'])
        def viewUserDetails():
            if request.method == 'POST':
                data = request.json
                
                username = data.get('username')

                admin = System_Admin("username","password")
               
                user_details = admin.viewUserDetails(username)

                if user_details:
                    return jsonify(user_details)
                else:
                    return jsonify({'error': 'No user details found'})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
        @self.app.route('/api/view-user-actions', methods=['POST'])
        def viewUserActions():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin(username,"password")
               
                user_details = admin.viewUserActions(username)

                if user_details:
                    return jsonify(user_details)
                else:
                    return jsonify({'error': 'No user details found'})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
class ViewUserProfileController(BaseController):

    def register_routes(self):
        @self.app.route('/api/view-profile-details', methods=['POST'])
        def viewProfileDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                profilename = data.get('userType')
                
                admin = System_Admin("username","password")
               
                user_details = admin.viewUserProfile(profilename)

                if user_details:
                    return jsonify(user_details)
                else:
                    return jsonify({'error': 'No user details found'})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            

class SearchUserAccountController(BaseController):
    def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/search-user-account', methods=['POST'])
        def searchAccount():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')
                
                admin = System_Admin("username","password")
                
                searchAccount_success = admin.searchUserAccount(username)
                
                return jsonify({'success': searchAccount_success})
                
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405



class UpdateUserDetailsController(BaseController):
     def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/update-user-details', methods=['POST'])
        def updateUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')
                newPassword = data.get('newPassword')
                

                admin = System_Admin("username","password")
                
                updateAccount_success = admin.updateUserDetails(newPassword,username)
                
                return jsonify({'success': updateAccount_success})
                
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
        @self.app.route('/api/reactivate-user-account', methods=['POST'])
        def reactivateUserAccount():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin("username","password")

                reactivateAccount_success = admin.reactivateUserAccount(username)
                
                return jsonify({'success': reactivateAccount_success})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405

class UpdateUserProfileController(BaseController):
     def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/update-user-profile', methods=['POST'])
        def updateUserProfile():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                profileName = data.get('userType')
                requirements = data.get('requirements')
                newprofileName = data.get('profileName')
                
                admin = System_Admin("username","password")
                
                updateProfile_success = admin.updateUserProfile(newprofileName,requirements,profileName)
                
                return jsonify({'success': updateProfile_success})
                
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405        

class SuspendUserAccountController(BaseController):
    def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/suspend-user-account', methods=['POST'])
        def suspendUserAccount():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin("username","password")

                suspendAccount_success = admin.suspendUserAccount(username)
                
                return jsonify({'success': suspendAccount_success})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
class SuspendUserProfileController(BaseController):
    def register_routes(self):    
        @self.app.route('/api/suspend-user-profile', methods=['POST'])
        def suspendUserProfile():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                profileName = data.get('profileName')

                admin = System_Admin("username","password")

                suspendProfile_success = admin.suspendUserProfile(profileName)
                
                return jsonify({'success': suspendProfile_success})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
        
            
class CreatePropertyListingController(BaseController):
    def register_routes(self):
        @self.app.route('/api/create-property-listing', methods=['POST'])
        def createPropertyListing():
            if request.method == 'POST':

                data = request.json

                username = data.get('reausername')
                address = data.get('address')
                price = data.get('price')
                seller = data.get('sellerusername')

                property_data = PropertyListing(address=address,price=price,agent=username,seller=seller)
                property_data.createPropertyListing()

                # Inside the route handler
                return '', 200

            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class UpdatePropertyListingController(BaseController):
    def register_routes(self):
        @self.app.route('/api/update-property-listing', methods=['POST'])
        def updatePropertyListing():
            if request.method == 'POST':

                data = request.json

                id = data.get('listingid')
                address = data.get('address')
                price = data.get('price')
                seller = data.get('sellerusername')
                PropertyListing.updatePropertyListing(address,price,seller,id)
                

                return '', 200
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class DeletePropertyListingController(BaseController):
    def register_routes(self):
        @self.app.route('/api/delete-property-listing', methods=['POST'])
        def deletePropertyListing():
            if request.method == 'POST':

                data = request.json

                id = data.get('listingid')
                PropertyListing.deletePropertyListing(id)
                

                return '', 200
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class ViewPropertyListingController(BaseController):
    def register_routes(self):
        @self.app.route('/api/view-property-listing', methods=['POST'])
        def viewPropertyListing():
            if request.method == 'POST':

                data = request.json

                id = data.get('listingid')
                listing = PropertyListing.viewPropertyListing(id)
                
                if listing:
                    return jsonify(listing)
                else:
                    return jsonify({'error': 'No listings found'})
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class ViewReviewsController(BaseController):
    def register_routes(self):
        @self.app.route('/api/view-reviews', methods=['POST'])
        def viewReviews():
            if request.method == 'POST':
                data = request.json
                agent = data.get('username')
                reviews_data = Review.viewReviews(agent)
                reviews = []

                for review in reviews_data:
                    # Create a review object for each review data
                    reviewerUser, agent, reviewText, rating = review
                    review_object = Review(reviewerUser, agent, reviewText, rating)
                    reviews.append(review_object.__dict__)


                if(reviews):
                    
                    return jsonify(reviews)
                else:
                    return jsonify({'error': 'No reviews found'})
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class ViewRatingController(BaseController):
    def register_routes(self):
        @self.app.route('/api/view-rating', methods=['POST'])
        def viewRating():
            if request.method == 'POST':
                data = request.json
                agent = data.get('username')
                rating = Review.viewRating(agent)
                print(rating, type(rating))

                if(rating):
                    
                    return jsonify(rating)
                else:
                    return jsonify({'error': 'No rating found'})
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
class DisplayPropertyListingsController(BaseController):
     def register_routes(self):        
        @self.app.route('/api/display-property-listings', methods=['POST'])
        def displayPropertyListings():
            if request.method == 'POST':

                data = request.json

                username = data.get('username')

                property_listing = PropertyListing.displayPropertyListings(username)
                listings_data = ''
                
                if(property_listing):
                 # Convert each property listing object to its dictionary representation
                    listings_data = [listing.__dict__ for listing in property_listing]
                

                if listings_data:
                    return jsonify(listings_data)
                else:
                    return jsonify({'error': 'No property listings found'})
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405
            
        @self.app.route('/api/display-all-property-listings', methods=['POST'])
        def displayAllPropertyListings():
            if request.method == 'POST':

                data = request.json

                username = data.get('username')
                
                property_listing = PropertyListing.displayAllPropertyListings()
                
                 # Convert each property listing object to its dictionary representation
                listings_data = [listing.__dict__ for listing in property_listing]
                

                if listings_data:
                    return jsonify(listings_data)
                else:
                    return jsonify({'error': 'No property listings found'})
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405

class SubmitRatingAndReviewController(BaseController):
    def register_routes(self):
        @self.app.route('/api/submit-rating-review', methods=['POST'])
        def submitRatingAndReview():
            if request.method == 'POST':
                data = request.json
                reviewerUser = data.get('username1')
                agentUser = data.get('username2')
                reviewText = data.get('review')
                ratingText = data.get('rating')

                review = Review(reviewerUser,agentUser,reviewText,ratingText)

                review.createRatingAndReview()
                
                return '', 200
                
            
            else:
                 return jsonify({'error': 'Method not allowed'}), 405 

class FavouritePropertyListingController(BaseController):
        def register_routes(self):
            @self.app.route('/api/favourite-listing', methods=['POST'])
            def favouriteListing():
                if request.method == 'POST':
                    data = request.json
                    username = data.get('username')
                    listingId = data.get('listingId')

                    PropertyListing.favouritePropertyListing(username,listingId)

                   
                    return '', 200
                    
                
                else:
                    return jsonify({'error': 'Method not allowed'}), 405

            @self.app.route('/api/display-favourite-listings', methods=['POST'])
            def displayFavouriteListings():
                if request.method == 'POST':
                    data = request.json
                    username = data.get('username')
                    print("username",username)

                    property_listing = PropertyListing.displayFavouritePropertyListings(username)
                    listings_data = ''
                    
                    if(property_listing):
                    # Convert each property listing object to its dictionary representation
                        listings_data = [listing.__dict__ for listing in property_listing]
                    

                    if listings_data:
                        return jsonify(listings_data)
                    else:
                        return jsonify({'error': 'No property listings found'})
                                  
                else:
                    return jsonify({'error': 'Method not allowed'}), 405

    

if __name__ == '__main__':
    app = Flask(__name__)
    LoginController(app)
    CreateAccountController(app)
    CreateProfileController(app)
    ViewUserDetailsController(app)
    ViewUserProfileController(app)
    SearchUserAccountController(app)
    UpdateUserDetailsController(app)
    UpdateUserProfileController(app)
    SuspendUserAccountController(app)
    SuspendUserProfileController(app)
    ViewPropertyListingController(app)
    CreatePropertyListingController(app)
    UpdatePropertyListingController(app)
    DeletePropertyListingController(app)
    ViewReviewsController(app)
    ViewRatingController(app)
    DisplayPropertyListingsController(app)
    SubmitRatingAndReviewController(app)
    FavouritePropertyListingController(app)
    app.run(debug=True)
