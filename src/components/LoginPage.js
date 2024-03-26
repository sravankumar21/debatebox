import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS file
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3333/admins/login', formData);
  
      // Log response data for debugging
      console.log('Response:', response.data);
  
      // Assuming the server responds with a status code and role upon successful login
      if (response.status === 200) {
        const { role } = response.data;
        console.log('Role:', role);
  
        if (role.role === 'user') { // Access the 'role' property of the 'role' object
          console.log('Redirecting to user dashboard...');
          navigate('/userdashboard'); // Redirect to userdashboard
        } else if (role.role === 'admin') { // Access the 'role' property of the 'role' object
          console.log('Redirecting to admin dashboard...');
          navigate('/admindashboard'); // Redirect to admindashboard
        } else {
          console.log('Unknown role:', role.role); // Access the 'role' property of the 'role' object
        }
      }
    } catch (error) {
      console.error('Login Error:', error);
      // Handle login error
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container" style={{ marginTop: '15rem' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 border-primary text-center">
            <h1 className="mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
