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
        #list of users
        self.users = {}
        

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

                #loop through users dict to authenticate user
                for user in self.users[userType]:
                    if(user.authLogin(username,password)):
                        return jsonify({'message': 'Authentication successful'})
                    else:
                        return jsonify({'message': 'Invalid username or password'})

                """
                for userType, userList in users.items():                # iterate through all users
                    if userType == uType:                               # checks if userType matches selected option
                        for username, password in userList:             # iterates through users of matched type
                            if username == uName and password == uPass:
                                return jsonify({'message': 'Authentication successful'})                            # authentication successful if username and password matches
                else:
                    return jsonify({'message': 'Invalid username or password'})
                """
                    
                
            else:
                return jsonify({'error': 'Method not allowed'}), 405
            
    
    # import UserDatabase SQL into dictionary
    def importUserDatabase(self): 
        # Connect to the MySQL database
        connection = mysql.connector.connect(
            host="127.0.0.1",
            #host="darrenhkx",
            user="username",
            password="password",
            database="UserDatabase"
        )

        # Create a cursor object
        cursor = connection.cursor()

        # SQL query to retrieve user information
        #had to change database name to UserDatabase from csit314
        query = "SELECT UserType, Username, Password FROM UserDatabase.Users"

        # Execute the SQL query
        cursor.execute(query)

        # Fetch all rows
        rows = cursor.fetchall()

        # Create a dictionary to store user information
        for row in rows:
            usertype, username, password = row
            user = User(username,password)
            if usertype not in self.users:
                self.users[usertype] = []
            self.users[usertype].append(user)

        # Close cursor and connection
        cursor.close()
        connection.close()

        # return dictionary with user info
        return self.users
    
    ''' To test if users loaded
    users = importUserDatabase()
    for user in users.items():
        print(user)
    '''
    # method to authenticate login
    def authenticateUser(self, uType, uName, uPass) -> bool:
        # retrieve user info
        users = controller.importUserDatabase()
        for userType, userList in users.items():                # iterate through all users
            if userType == uType:                               # checks if userType matches selected option
                for username, password in userList:             # iterates through users of matched type
                    if username == uName and password == uPass:
                        return True                             # authentication successful if username and password matches
        return False                              
    
    def run(self):
        self.importUserDatabase()
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

            if controller.authenticateUser(userType, username, password):
                print()
                print("Welcome, " + username)
                break  # Exit the loop if login successful
            else:
                print("Invalid credentials, please try again")
        
if __name__ == '__main__':
    controller = AppController()
    #controller.main()
    controller.run()
