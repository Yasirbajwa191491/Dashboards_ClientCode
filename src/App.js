import React,{useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RegisterResident from './components/RegisterResident';
import ForgotPassword from './components/ForgotPassword';
import ResidentHome from './components/ResidentHome';
import Logout from './components/Logout';
import CommitteeMemberHome from './components/CommitteeMemberHome';
import ViewCommitteeMember from './components/ViewCommitteeMember';
import Rules from './components/Rules';
import Members from './components/Members';
import Positions from './components/Positions';
import VoteCasting from './components/VoteCasting';
import ViewArticle from './components/ViewArticle';
import { CreateArticle } from './components/CreateArticle';
import ResidentBulletin from './components/ResidentBulletin';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [Authenticated,setAuthenticated]=useState(false)
  let checkkey=localStorage.getItem("key")
  useEffect(()=>{
if(checkkey){
  console.log("yes i have key");
}
  },[checkkey,Authenticated])
  return (
    <BrowserRouter>
    <Routes>
      {checkkey ? (
        <>
          {/* Authenticated routes */}
          <Route path="/" element={<ResidentHome />} />
          <Route path="/ResidentHome" element={<ResidentHome />} />
          <Route path="/member" element={<Members />} />
          <Route path="/position" element={<Positions />} />
          <Route path="/votecasting" element={<VoteCasting />} />
          <Route path="/viewarticle" element={<ViewArticle />} />
          <Route path="/ResidentBulletin" element={<ResidentBulletin />} />
          <Route path="/insertarticle" element={<CreateArticle />} />
          <Route path="/ViewCommitteeMember" element={<ViewCommitteeMember />} />
          <Route path="/Rules" element={<Rules />} />
          <Route path="/CommitteeMemberHome" element={<CommitteeMemberHome />} />
          <Route path="/Logout" element={<Logout />} />
        </>
      ) : (
        // Unauthenticated users are redirected to /Login
        <Route path="/" element={<Navigate to="/Login" replace />} />
      )}

      {/* Public routes */}
      <Route path="/Login" element={<Login />} />
      <Route path="/RegisterResident" element={<RegisterResident />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />

      {/* Redirect to /Login for unmatched routes */}
      <Route path="/*" element={<Navigate to="/Login" replace />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
