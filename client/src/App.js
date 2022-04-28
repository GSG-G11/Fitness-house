import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css';
import { Dashboard, Home } from './layouts';
import { LoginPage, RegisterPage, LoginGymPage, GymPage, NotfoundPage } from './pages';

function App() {
  return (
    <Routes>
      {/* Routes For Site Views {login, gym filter,...} */}
      <Route path="/" element={<Home />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="gym/login" element={<LoginGymPage />} />

        {/* .... other Routes ... */}
      </Route>

      {/* Routes For dashboard Site Views {update gym data,...} */}
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<GymPage />} />
        <Route path="gym" element={<GymPage />} />

        {/* .... other Routes */}
        <Route path="*" element={<NotfoundPage />} />
      </Route>

      {/* .... other Routes */}

      {/* Routes For not Found Route */}
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
}

export default App;
