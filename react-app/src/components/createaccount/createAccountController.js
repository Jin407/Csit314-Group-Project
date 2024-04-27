class createAccountController {
    fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData.message;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    //method name need to change to create account, remember to change for createaccount.js when calling this method as well
    login = async (userType, username, password, cpassword) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/create-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userType, username, password, cpassword})
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const responseData = await response.json();
            return responseData.message;
        } catch (error) {
            console.error('Error logging in:', error);
            return null;
        }
    };
}

export default createAccountController;