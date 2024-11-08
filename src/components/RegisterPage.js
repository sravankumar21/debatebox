import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://debatebox-api.rka.li/admins/register', formData);

      // Registration successful, redirect to login page
      console.log('Registration successful:', response.data);
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Registration Error:', error.response.data);
      // Handle registration error (e.g., display error message to user)
    }
  };

  return (
    <div className="container" style={{ marginTop: '13rem' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 border-primary text-center">
            <h1 className="mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
            <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p> {/* Link to login page */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
