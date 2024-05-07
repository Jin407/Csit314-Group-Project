from Users import User, System_Admin, Real_Estate_Agent, Buyer, Seller
# install the connector in terminal: pip install mysql-connector-python
import mysql.connector
#pip install flask
from flask import Flask,request,jsonify,make_response
#pip install flask-cors
from flask_cors import CORS

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

                admin = System_Admin("username","password")
                            
                createAccount_success = admin.createNewUserAccount(username,password,userType)
                
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


        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/view-user-details', methods=['POST'])
        def viewUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin("username","password")
               
                user_details = admin.viewUserDetails(username)
                print(user_details)

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

                admin = System_Admin("username","password")
               
                user_details = admin.viewUserActions(username)

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
                newprofileName = data.get('profileName')
                print(newprofileName)
                
                admin = System_Admin("username","password")
                
                updateProfile_success = admin.updateUserProfile(newprofileName,profileName)
                
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
        #method to receive what user entered for username and password in frontend
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
    

if __name__ == '__main__':
    app = Flask(__name__)
    LoginController(app)
    CreateAccountController(app)
    CreateProfileController(app)
    ViewUserDetailsController(app)
    SearchUserAccountController(app)
    UpdateUserDetailsController(app)
    UpdateUserProfileController(app)
    SuspendUserAccountController(app)
    SuspendUserProfileController(app)
    app.run(debug=True)
