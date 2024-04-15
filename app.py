from Users import User, System_Admin, Real_Estate_Agent, Buyer, Seller

# the connector doesnt work for me but im just leaving this here for now
# import mysql.connector

# import sql into dictionaries/arrays/lists
# can be split into multiple import methods if its better but for now just 1 massive import for efficiency(assuming sql data is all in 1 file)
def importSQL(): 
    pass

# method to authenticate login, idk if it will clash with the class methods
def authenticateUser(userType, username, password) -> bool:
    pass

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
        
        if authenticateUser(choice, username, password):
            print("Welcome, " + username)
            break  # Exit the loop if login successful
        else:
            print("Invalid credentials, please try again")

    
# remove comment for main if want to test
if __name__ == "__main__":
    #main()
    pass
