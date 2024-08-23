import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/localStorageService';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    password: '',
    profilePicture: null,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, mobileNumber, password, profilePicture } = formData;
    if (!firstName || !lastName || !mobileNumber || !password || !profilePicture) {
      setError('All fields are required.');
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Mobile number must be 10 digits.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        // Add the base64 string of the image to formData
        const updatedFormData = {
          ...formData,
          profilePicture: reader.result,
        };
        
        // Register the user with the form data
        registerUser(updatedFormData);
        navigate('/login');
      };

      // Read the file as a data URL
      if (formData.profilePicture) {
        reader.readAsDataURL(formData.profilePicture);
      } else {
        // If no profile picture, proceed directly
        registerUser(formData);
        navigate('/login');
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="form-container">
        <h2 className="form-heading">Create Your Account</h2>
        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              className="form-input"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              className="form-input"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="submit-button"
          >
            Register
          </button>
        </form>
      </div>
      <style jsx>{`
        .registration-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
          animation: backgroundAnimation 5s ease infinite;
        }
        
        .form-container {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
          animation: fadeIn 1s ease;
        }
        
        .form-heading {
          text-align: center;
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 1rem;
        }
        
        .error-message {
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 0.75rem 1.25rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          font-size: 0.875rem;
          color: #555;
          margin-bottom: 0.5rem;
        }
        
        .form-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          box-sizing: border-box;
        }
        
        .submit-button {
          width: 100%;
          padding: 0.75rem;
          border: none;
          border-radius: 0.25rem;
          background-color: #fbbf24;
          color: #ffffff;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .submit-button:hover {
          background-color: #f59e0b;
        }
        
        @keyframes backgroundAnimation {
          0% {
            background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
          }
          50% {
            background: linear-gradient(to right, #fda085 0%, #f6d365 100%);
          }
          100% {
            background: linear-gradient(to right, #f6d365 0%, #fda085 100%);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Registration;
