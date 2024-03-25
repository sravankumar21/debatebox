import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS file
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai'; // Import user account icon
import debatemainImage1 from '../images/debate pic.jpeg';

const Homepage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <BiCommentDetail style={{ marginRight: '20px', marginLeft: '45px' }} />DebateBox
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto" style={{ marginRight: '20px' }}>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/team">Team</a>
              </li>
            </ul>
                <div className="dropdown">
                  <button className="btn btn-outline-dark me-md-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiOutlineUser size={38} style={{ marginRight: '12px' }} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li><a className="dropdown-item" href="/register">Register</a></li>
                    <li><a className="dropdown-item" href="/login">Login</a></li>
                  </ul>
                </div>
          </div>
        </div>
      </nav>
      <div className="container mt-4 text-center" style={{ paddingTop: '1.2%' }}>
        <h1 style={{ fontFamily: 'Inter', fontSize: 38, fontWeight: 'bold' }}>IGNITE YOUR VOICE</h1>
        <h4 style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 'normal', color: '#828282' }}>Empowering Dynamic Discourse for a Connected World</h4>
        <div className="btn-group mt-3 mx-3">
          <button className="btn btn-outline-dark me" onClick={() => window.location.href = '/rules'}>Rules & Regs</button>
        </div>
        <div className="btn-group mt-3 mx-3">
          <button type="button" className="btn btn-outline-dark " onClick={() => window.location.href = '/register'}>Create a Team</button>
        </div>
      </div>
      <div className="text-center" style={{ paddingTop: '2%' }}>
        <img src={debatemainImage1} className="img-fluid" alt='' style={{ maxWidth: '50%', maxHeight: '50%', position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', zIndex: '-1' }} />
      </div>
    </div>
  );
}

export default Homepage;
