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
                userType = data.get('userType')
                #user type is Buyer, Seller or REA only got 1 Admin
    
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
    # try to use sqldump to import csit314database to use stored procedures
    # open cmd prompt, cd to mysql bin and use: mysql -u [username] -p [database_name] < csit314Database.sql
    # if it doesnt work lmk, i'll try to move everything here instead
    # Method to authenticate user
    def authenticateUser(self, uName, uType, uPass):
        try:
            # Connect to the MySQL database (change according to your settings)
            connection = mysql.connector.connect(
                host="darrenhkx",
                user="username",
                password="password",
                database="csit314"
            )

            # Create a cursor object
            cursor = connection.cursor()

            # SQL query to call the stored procedure
            query = """
                CALL AuthenticateUser(%s, %s, %s, @success);
            """

            # Execute query
            cursor.execute(query, (uName, uType, uPass))

            # Fetch output of procedure
            cursor.execute("SELECT @success;")
            success = bool(cursor.fetchone()[0])

            # Close cursor and connection
            cursor.close()
            connection.close()

            return success

        except mysql.connector.Error as error:
            print("Error while authenticating user:", error)
            return False
    
    def run(self):
        #run flask server
        self.app.run(debug=True)    

    # for testing purposes
    def main(self):
        while True:
            print()
            print("Choose account type")
            print("-------------------------")
            print("1. System admin")
            print("2. Real estate agent")
            print("3. Buyer")
            print("4. Seller")
            print("5. Quit")
            try:
                choice = int(input())
                if choice < 1 or choice > 5:
                    raise ValueError
                if choice == 5:
                    exit()
            except ValueError:
                print()
                print("Invalid input. Please enter a number between 1 and 5.")
                continue
            print()
            print("Enter login credentials")
            print("-------------------------")
            username = input("Enter username: ")
            password = input("Enter password: ")
            
            # convert choice into user types
            if choice == 1:
                userType = 'Admin'
            elif choice == 2:
                userType = 'REA'
            elif choice == 3:
                userType = 'Buyer'
            elif choice == 4:
                userType = 'Seller'

            if controller.authenticateUser(username, userType, password):
                print()
                print("Welcome, " + username)
                break  # Exit the loop if login successful
            else:
                print()
                print("Invalid credentials, please try again")
        
if __name__ == '__main__':
    controller = AppController()
    #controller.main()
    controller.run()
