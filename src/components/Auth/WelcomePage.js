import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, logoutUser } from '../../services/localStorageService';

const WelcomePage = () => {
  const userData = getUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear the stored data
    navigate('/login'); // Redirect to login page
  };

  if (!userData) {
    navigate('/login'); // Redirect to login if no user data is found
    return null;
  }

  const { firstName, lastName, mobileNumber, profilePicture } = userData;

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning';
    } else if (hours < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-heading">
          {getGreeting()}, {firstName} {lastName}
        </h1>
        {profilePicture && (
          <img
            src={profilePicture} // Assume profilePicture is a base64 string
            alt="Profile"
            className="profile-picture"
          />
        )}
        <p className="welcome-info">Mobile: {mobileNumber}</p>
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Log Out
        </button>
      </div>
      <style jsx>{`
        .welcome-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #e2e2e2 0%, #ffffff 100%);
          animation: backgroundAnimation 10s ease infinite;
        }
        
        .welcome-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          animation: fadeIn 1.5s ease;
        }
        
        .welcome-heading {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1rem;
        }
        
        .profile-picture {
          border-radius: 50%;
          width: 8rem;
          height: 8rem;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 2px solid #fbbf24;
          animation: rotate 10s linear infinite;
        }
        
        .welcome-info {
          font-size: 1.25rem;
          color: #555;
          margin-bottom: 1rem;
        }
        
        .logout-button {
          background-color: #f87171;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .logout-button:hover {
          background-color: #ef4444;
        }
        
        @keyframes backgroundAnimation {
          0% {
            background: linear-gradient(to right, #e2e2e2 0%, #ffffff 100%);
          }
          50% {
            background: linear-gradient(to right, #ffffff 0%, #e2e2e2 100%);
          }
          100% {
            background: linear-gradient(to right, #e2e2e2 0%, #ffffff 100%);
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
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
