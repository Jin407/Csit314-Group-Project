from Users import User, System_Admin, Real_Estate_Agent, Buyer, Seller
# install the connector in terminal: pip install mysql-connector-python
import mysql.connector
#pip install flask
from flask import Flask,request,jsonify,redirect,url_for
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
                cpassword = data.get('cpassword')
                #user type is Buyer, Seller or REA only got 1 Admin
                #check if password and cpassword match before creating account
                if (password != cpassword):
                    return jsonify({'message': 'The password confirmation does not match'})

                admin = System_Admin("username","password")
                            
                createAccount_success = admin.createNewUserAccount(username,password,userType)
                
                return jsonify({'success': createAccount_success})
                
    
            else:
                return jsonify({'error': 'Method not allowed'}), 405


class ViewUserDetailsController:

    def register_routes(self):
        #method to preview users in system admin page
        @self.app.route('/api/display-user-details', methods=['POST'])
        def displayUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin("username","password")

                return jsonify({'message': admin.viewUserDetails(username)})
            
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

                return jsonify({'message': admin.viewUserDetails(username)})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            

class UpdateUserDetailsController:
     def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/update-user-details', methods=['POST'])
        def updateUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')
                password = data.get('password')
                userType = data.get('userType')

                admin = System_Admin("username","password")

                if(admin.updateUserDetails(password,userType,username)):
                     return jsonify({'message': 'Account successfully updated'})
                else:
                    return jsonify({'message': 'User not found'})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            

class SuspendUserAccountController:
    def register_routes(self):    
        #method to receive what user entered for username and password in frontend
        @self.app.route('/api/suspend-user-account', methods=['POST'])
        def updateUserDetails():
            if request.method == 'POST':
                data = request.json
                # Assuming data contains username and password
                username = data.get('username')

                admin = System_Admin("username","password")

                if(admin.suspendUserAccount(username)):
                     return jsonify({'message': 'Account successfully suspended'})
                else:
                    return jsonify({'message': 'User not found'})
            
            else:
                return jsonify({'error': 'Method not allowed'}), 405
    

if __name__ == '__main__':
    app = Flask(__name__)
    LoginController(app)
    CreateAccountController(app)
    app.run(debug=True)
