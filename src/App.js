import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './components/Auth/RegistrationPage';
// import LoginPage from './components/LoginPage';
import LoginPage from './components/Auth/LoginPage';
import WelcomePage from './components/Auth/WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
