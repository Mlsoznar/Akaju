import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
// import Stations from './components/Stations';
import Orders from './components/Orders';
import Users from './components/Users';
import Products from './components/Products';
import Navbar from './components/Navbar';
import NotificationList from './components/NotificationList';
import Roles from './components/Roles';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/stations" element={<Stations />} /> */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/notificationList" element={<NotificationList />} />
          <Route path="/roles" element={<Roles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;