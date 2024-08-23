import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/localStorageService';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = loginUser(formData.mobileNumber, formData.password);
    if (user) {
      navigate('/welcome');
    } else {
      setError('Invalid mobile number or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-heading">Login to Your Account</h2>
        {error && (
          <div className="error-message" role="alert">
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="mobileNumber" className="input-label">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              className="input-field"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(to right, #e2e2e2, #ffffff);
          animation: backgroundAnimation 10s ease infinite;
        }

        .login-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
          animation: fadeIn 1.5s ease;
        }

        .login-heading {
          font-size: 2rem;
          color: #333;
          margin-bottom: 1rem;
        }

        .error-message {
          background-color: #fdd;
          border: 1px solid #fbb;
          color: #d8000c;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          animation: fadeIn 1s ease;
        }

        .input-group {
          margin-bottom: 1rem;
        }

        .input-label {
          display: block;
          font-size: 0.875rem;
          color: #555;
          margin-bottom: 0.5rem;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          font-size: 1rem;
          color: #333;
          transition: border-color 0.3s ease;
        }

        .input-field:focus {
          border-color: #fbbf24;
          outline: none;
          box-shadow: 0 0 0 1px #fbbf24;
        }

        .login-button {
          background-color: #fbbf24;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .login-button:hover {
          background-color: #f59e0b;
        }

        @keyframes backgroundAnimation {
          0% {
            background: linear-gradient(to right, #e2e2e2, #ffffff);
          }
          50% {
            background: linear-gradient(to right, #ffffff, #e2e2e2);
          }
          100% {
            background: linear-gradient(to right, #e2e2e2, #ffffff);
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

export default LoginPage;
