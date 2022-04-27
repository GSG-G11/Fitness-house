import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css';
import { Dashboard, Home } from './layouts';

/**
 * Test Component For testing Routes { InnerComponent }
 */
function InnerComponent() {
  return (
    <div className="continer">
      <h1>Welcome To Inner Component</h1>
    </div>
  );
}

/**
 * Test Component For testing Routes {NotFound}
 */
function NotFound() {
  return (
    <div className="continer">
      <h1>Not Found</h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes For Site Views {login, gym filter,...} */}
      <Route path="/" element={<Home />}>
        <Route index element={<InnerComponent />} />
        <Route path="login" element={<InnerComponent />} />
        <Route path="register" element={<InnerComponent />} />
        <Route path="gym/login" element={<InnerComponent />} />
        <Route path="gym/register" element={<InnerComponent />} />
        {/* .... other Routes */}
      </Route>

      {/* Routes For dashboard Site Views {update gym data,...} */}
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<InnerComponent />} />
        <Route path="gym" element={<InnerComponent />} />

        {/* .... other Routes */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* .... other Routes */}

      {/* Routes For not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
