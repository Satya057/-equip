// Function to register a new user by storing user data in localStorage
export const registerUser = (userData) => {
    // Retrieve existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Add the new user to the array
    users.push(userData);
    
    // Save the updated array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
  };
  
  // Function to authenticate a user based on mobile number and password
  export const loginUser = (mobileNumber, password) => {
    // Retrieve existing users or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user with the matching mobile number and password
    const user = users.find(user => user.mobileNumber === mobileNumber && user.password === password);
    
    // If the user is found, store the user's data in localStorage
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    }
    
    // Return the user object if found, otherwise return null
    return user;
  };
  
  // Function to retrieve the currently logged-in user's data from localStorage
  export const getUserData = () => {
    // Retrieve the logged-in user's data from localStorage
    const data = localStorage.getItem('loggedInUser');
    
    // Return the parsed data or null if no data is found
    return data ? JSON.parse(data) : null;
  };
  
  // Function to log out the current user by clearing their data from localStorage
  export const logoutUser = () => {
    // Remove the logged-in user's data from localStorage
    localStorage.removeItem('loggedInUser');
  };
  