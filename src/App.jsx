    import React from 'react';
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import StaffDashboard from './pages/StaffDashboard';
    import StudentDashboard from './pages/StudentDashboard';
    import Login from './pages/Login';
    import AdminDashboard from './pages/AdminDashboard'; // Import the new page

    function App() {
      return (
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/staff" element={<StaffDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} /> {/* Add the admin route */}
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </BrowserRouter>
      );
    }

    export default App;
    