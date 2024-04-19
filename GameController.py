from Users import User, System_Admin, Real_Estate_Agent, Buyer, Seller

# install the connector in terminal: pip install mysql-connector-python
import mysql.connector
#pip install flask
from flask import Flask,request,jsonify
#pip install flask-cors
from flask_cors import CORS

#control class in BCE framework
class AppController:
    #constructor for control class
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.register_routes()

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

                # This logic can be moved to User's login method
                if username == "username" and password == "password":
                    # Authentication successful
                    return jsonify({'message': 'Authentication successful'})
                else:
                    # Authentication failed
                    return jsonify({'message': 'Invalid username or password'})
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
    
    # import sql into dictionaries/arrays/lists
    # can be split into multiple import methods if its better but for now just 1 massive import for efficiency(assuming sql data is all in 1 file)
    def importSQL(): 
        pass

    # method to authenticate login, idk if it will clash with the class methods
    def authenticateUser(userType, username, password) -> bool:
        return True
    
    def run(self):
        self.app.run(debug=True)

    def main():
        while True:
            print()
            print("Choose account type")
            print("-------------------------")
            print("1. System admin")
            print("2. Real estate agent")
            print("3. Buyer")
            print("4. Seller")
            try:
                choice = int(input())
                if choice < 1 or choice > 4:
                    raise ValueError
            except ValueError:
                print("Invalid input. Please enter a number between 1 and 4.")
                continue
            
            print()
            print("Enter login credentials")
            print("-------------------------")
            username = input("Enter username: ")
            password = input("Enter password: ")
            
            """
            if authenticateUser(choice, username, password):
                print()
                print("Welcome, " + username)
                break  # Exit the loop if login successful
            else:
                print("Invalid credentials, please try again")
            """

        
# remove comment for main if want to test
if __name__ == '__main__':
    controller = AppController()
    controller.run()
