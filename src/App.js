import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const Movies = lazy(() => import('./page/Movie/Movie'));
const Login = lazy(() => import('./page/Login/Login'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/movie" element={<PrivateRoute component={Movies} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

const PrivateRoute = ({ component: Component }) => {
  return sessionStorage.getItem('authToken') ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
