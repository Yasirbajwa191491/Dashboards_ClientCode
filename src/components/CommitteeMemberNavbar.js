import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../ResidentNavbar.css"; // Make sure you have a separate CSS file
import Logout from './Logout';

const CommitteeMemberNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  let checkrole=localStorage.getItem("role")

  return (
    <nav className={`navbar navbar-expand-lg navbar-background navbar-height`}>
      <div className="navbar-brand">
        <img src="/images/logo3.png" alt="Society Logo" height="70" />
      </div>
      <button className="navbar-toggler" onClick={toggleNav}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'nav-open' : ''}`}>
        <ul className="navbar-nav">
             
        <li className="nav-item">
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
                  <Link to="/CommitteeMemberScheduleEvent" className="dropdown-item">
                    Schedule Event
                  </Link>
                  <Link to="/CommitteeMemberViewScheduleEvent" className="dropdown-item">
                    View Scheduled Event
                  </Link>
                  <Link to="/CommitteeMemberViewAllScheduleEvent" className="dropdown-item">
                    View All Scheduled Event
                  </Link>
                  <Link to="/ViewBookedSlots" className="dropdown-item">
                    View Booked Slots
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
                  <Link to="/CommitteeMemberViewAllComplaint" className="dropdown-item">
                    View Complaints
                  </Link>
                  <Link to="/CommitteeMemberViewAllComplaintReply" className="dropdown-item">
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
                  <Link to="/CommitteeMemberViewAllSuggestions" className="dropdown-item">
                    View Suggestions
                  </Link>
                  <Link to="/CommitteeMemberViewAllSuggestionReply" className="dropdown-item">
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
                  <Link to="/CommitteeMemberMakeBill" className="dropdown-item">
                    Make Bill
                  </Link>
                  <Link to="/CommitteeMemberViewAllBill" className="dropdown-item">
                    View Bill
                  </Link>
                </div>
              </li>
              

              <li className="nav-item dropdown ">
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
                  <Link to="/CommitteeMemberViewProfile" className="dropdown-item">
                    Manage Profile
                  </Link>
                  <Link to="/CommitteeMemberHome" className="dropdown-item">
                    Home
                  </Link>
                </div>
              </li>
                   
              <li className="nav-item">
                <Logout />
              </li>
        </ul>
      </div>
    </nav>
  );
};

export default CommitteeMemberNavbar;
