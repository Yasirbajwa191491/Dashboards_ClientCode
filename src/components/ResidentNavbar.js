import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../ResidentNavbar.css";
import Logout from './Logout';



const ResidentNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
const navigate=useNavigate();
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  let checkrole=localStorage.getItem("role")
  return (
    <nav className={`navbar navbar-expand-lg navbar-background navbar-height ${isNavOpen ? 'nav-open' : ''}`}>
      <div className="navbar-brand" >
        <img src="/images/logo.png" alt="Society Logo" height="70" onClick={()=>{
          checkrole==="committeemember"? navigate("/CommitteeMemberHome"):navigate("/ResidentHome")
        }} />
      </div>
      <button className="navbar-toggler" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className={`navbar-nav nav-margin-auto ${isNavOpen ? 'nav-open' : ''}`} >
              
              <li className="nav-item nav-margin">
                <Link to="/insertarticle" className="nav-link navbar-text-white">
                  Bulletin
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Voting
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                  checkrole==="committeemember"&&  <Link to="/position" className="dropdown-item">
                    Position
                  </Link>
                }
                  <Link to="/votecasting" className="dropdown-item">
                    Vote Casting
                  </Link>
                
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Event
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/schedule" className="dropdown-item">
                    Schedule Event
                  </Link>
                  <Link to="/viewscheduleEvent" className="dropdown-item">
                    View Scheduled Event
                  </Link>
                 
                </div>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Complaint
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/MakeComplaint" className="dropdown-item">
                    Make Complaint
                  </Link>
                  <Link to="/ViewComplaint" className="dropdown-item">
                    View Complaint
                  </Link>
                  <Link to="/ViewComplaintReply" className="dropdown-item">
                    View Complaint Reply
                  </Link>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Suggestion Box
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/DropSuggestion" className="dropdown-item">
                    Drop Suggestion
                  </Link>
                  <Link to="/ViewSuggestion" className="dropdown-item">
                    View Suggestion
                  </Link>
                  <Link to="/ViewSuggestionReply" className="dropdown-item">
                    View Suggestion Reply
                  </Link>
                </div>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Accounting
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/ResidentViewMyBill" className="dropdown-item">
                    View Bill
                  </Link>
                  <Link to="/ResidentViewMyPreviousBill" className="dropdown-item">
                    Previous Bill
                  </Link>
                </div>
              </li>
              

              <li className="nav-item dropdown nav-margin-left">
                <a
                  className="nav-link dropdown-toggle navbar-text-white"
                  href="/#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Section
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/ResidentViewProfile" className="dropdown-item">
                    Manage Profile
                  </Link>
                  <Link to="/ResidentHome" className="dropdown-item">
                    Home
                  </Link>
                </div>
              </li>
                   
              <li className="nav-item">
                <Logout />
              </li>

            {/* </ul> */}
      </ul>
    </nav>
  );
};

export default ResidentNavbar;
