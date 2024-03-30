import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage'; 
import Aboutus from './components/Aboutus';
import RulesPage from './components/Rulespage';
import Teampage from './components/Teampage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import Userpage from './components/UserPage';
import AdminDashboard from './components/AdminPage';
import ManageTeamsPage from './components/ManageTeams';
import FixMatchPage from './components/Fixmatch';
import AddDebateTopic from './components/AddDebateTopic';
import ChatRoomPage from './components/chatroom';
import ChatBox from './components/ChatBox';
import SeeTopic from './components/Seetopic';
import CheckNamePage from './components/CheckNamePage';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutus/>} />
        <Route path="/rules" element={<RulesPage/>} />
        <Route path="/team" element={<Teampage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/userdashboard" element={<Userpage/>} />
        <Route path="/admindashboard" element={<AdminDashboard/>} />
        <Route path="/manageteams" element={<ManageTeamsPage/>} />
        <Route path="/fixmatch" element={<FixMatchPage/>} />
        <Route path="/addtopic" element={<AddDebateTopic/>} />
        <Route path="/chatroom" element={<ChatRoomPage/>} />
        <Route path="/chatbox" element={<ChatBox/>} />
        {/* <Route path="/chatbox/:token" element={<ChatBox/>} /> */}
        <Route path="/chatbox/:name/:token" element={<ChatBox/>} />

        <Route path="/topic" element={<SeeTopic/>} />
        <Route path="/verify/:roomId" element={<CheckNamePage/>} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
