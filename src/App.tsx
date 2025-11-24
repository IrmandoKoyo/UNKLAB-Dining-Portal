import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DigitalCard from './pages/DigitalCard';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';
import About from './pages/About';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="card" element={<DigitalCard />} />
          <Route path="profile" element={<Profile onLogout={() => setIsLoggedIn(false)} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;