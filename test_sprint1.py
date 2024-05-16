# run in terminal: pip install pytest
import pytest
import mysql.connector
from unittest.mock import MagicMock, patch
from Users import System_Admin, Real_Estate_Agent, Buyer, Seller

# MagicMock uses a mock database to isolate functions from dependencies so the tests dont actually touch the sql database
# This test file tests all the methods used in sprint 1 user stories

#########################################################
#                     authLogin()                       #
#########################################################

# fixtures for each user type, acts as default user for tests
@pytest.fixture
def admin_user():
    user = System_Admin("username", "password")
    user.cursor = MagicMock()  # Mock the cursor
    return user

@pytest.fixture
def rea_user():
    user = Real_Estate_Agent("rea1", "password")
    user.cursor = MagicMock()  # Mock the cursor
    return user

@pytest.fixture
def buyer_user():
    user = Buyer("buyer1", "password")
    user.cursor = MagicMock()  # Mock the cursor
    return user

@pytest.fixture
def seller_user():
    user = Seller("seller1", "password")
    user.cursor = MagicMock()  # Mock the cursor
    return user

# Tests admin login
@patch('Users.mysql.connector.connect')
def test_authLogin_admin(mock_connect, admin_user):
    # Mock the connection and cursor
    mock_cursor = admin_user.cursor
    mock_connect.return_value.cursor.return_value = mock_cursor

    # Mock fetchone to return admin's credentials
    mock_cursor.fetchone.return_value = ("username", "password")

    # Assert admin login
    assert admin_user.authLogin(admin_user.username, admin_user.password, admin_user.userType) == True

# Tests real estate agent login
@patch('Users.mysql.connector.connect')
def test_authLogin_REA(mock_connect, rea_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = rea_user.cursor
    rea_user.cursor.fetchall.return_value = [("REA1", "password", "Real estate agent")]
    assert rea_user.authLogin(rea_user.username, rea_user.password, rea_user.userType) == True

    # Empty list simulate no matching entry in database for credentials entered
    rea_user.cursor.fetchall.return_value = []
    assert rea_user.authLogin(rea_user.username, rea_user.password, rea_user.userType) == False

# Tests buyer login
@patch('Users.mysql.connector.connect')
def test_authLogin_buyer(mock_connect, buyer_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = buyer_user.cursor
    buyer_user.cursor.fetchall.return_value = [("buyer1", "password", "Buyer")]
    assert buyer_user.authLogin(buyer_user.username, buyer_user.password, buyer_user.userType) == True

    # Empty list simulate no matching entry in database for credentials entered
    buyer_user.cursor.fetchall.return_value = []
    assert buyer_user.authLogin(buyer_user.username, buyer_user.password, buyer_user.userType) == False

# Tests seller login
@patch('Users.mysql.connector.connect')
def test_authLogin_seller(mock_connect, seller_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = seller_user.cursor
    seller_user.cursor.fetchall.return_value = [("seller1", "password", "Seller")]
    assert seller_user.authLogin(seller_user.username, seller_user.password, seller_user.userType) == True

    # Empty list simulate no matching entry in database for credentials entered
    seller_user.cursor.fetchall.return_value = []
    assert seller_user.authLogin(seller_user.username, seller_user.password, seller_user.userType) == False

# Tests for invalid user
@patch('Users.mysql.connector.connect')
def test_authLogin_invalid_user(mock_connect, buyer_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = buyer_user.cursor
    buyer_user.cursor.fetchall.return_value = []
    assert buyer_user.authLogin(buyer_user.username,buyer_user.password,buyer_user.userType) == False

# Tests if sql error catcher is working
@patch('Users.mysql.connector.connect')
def test_authLogin_db_error(mock_connect, buyer_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = buyer_user.cursor

    # Mocking the execute method to raise error
    buyer_user.cursor.execute.side_effect = mysql.connector.Error
    assert buyer_user.authLogin(buyer_user.username, buyer_user.password, buyer_user.userType) == False


#########################################################
#                createNewUserAccount()                 #
#########################################################

@patch('Users.mysql.connector.connect')
def test_createNewUserAccount_success(mock_connect, admin_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = admin_user.cursor

    # Mocking execute to simulate successful insertion
    admin_user.cursor.execute.return_value = None

    # Call the method and assert the return value
    assert admin_user.createNewUserAccount("new_user", "new_password", "Buyer") == True

    # Ensure that execute was called with the correct query and parameters
    admin_user.cursor.execute.assert_called_once_with(
        "INSERT INTO csit314.Users (Username, Password, UserType) VALUES (%s, %s, %s);",
        ("new_user", "new_password", "Buyer")
    )

@patch('Users.mysql.connector.connect')
def test_createNewUserAccount_failure(mock_connect, admin_user):
    # Mock the connection and cursor
    mock_connect.return_value.cursor.return_value = admin_user.cursor

    # Mocking execute to simulate failure
    admin_user.cursor.execute.side_effect = mysql.connector.Error("Database error")

    # Call the method and assert the return value
    assert admin_user.createNewUserAccount("new_user", "new_password", "Buyer") == False

    # Ensure that execute was called with the correct query and parameters
    admin_user.cursor.execute.assert_called_once_with(
        "INSERT INTO csit314.Users (Username, Password, UserType) VALUES (%s, %s, %s);",
        ("new_user", "new_password", "Buyer")
    )