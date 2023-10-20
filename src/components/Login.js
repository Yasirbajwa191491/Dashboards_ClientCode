import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      // const response = await axios.post("http://localhost:8083/app/login", {   because of proxy
      const response = await axios.post("/app/login", {
        email,
        password,
        role
      });

      if (response.status === 200) {
        const key = response.data;
        localStorage.setItem("key", key);
        localStorage.setItem("role", role);
        localStorage.setItem("itemCount", 0);

        toast.success(`Login successful. Welcome ${role}`);

        setTimeout(() => {
            if (role === "committeemember") {
              window.location.reload();
                navigate("/CommitteeMemberHome");

              } else if (role === "resident") {
              window.location.reload();
                navigate("/ResidentHome");
              }
            }, 1500);
      } else {
        setError("Invalid email / password");
      }
    } catch (error) {
      setError("Invalid email / password");
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setError("");
  };

  const handleSignup = () => {
    navigate("/RegisterResident");
  };

  const handleForgotPassword = () => {
    navigate("/ForgotPassword");
  };

  let checkkey=localStorage.getItem("key")
  let checkrole=localStorage.getItem("role")

  useEffect(()=>{
    if(checkkey){
      if (checkrole === "committeemember") {
        navigate("/CommitteeMemberHome",{ replace: true });
      } else if (checkrole === "resident") {
        navigate("/ResidentHome",{ replace: true });
      }
    }
      },[])
  return (
    <div className="login-body" >
    <div className="form-container">
      <div className="loginbox">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email ID"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password Eg: Diwa1968"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="radio-container">
            <label className="radio">
              <input
                type="radio"
                name="role"
                value="committeemember"
                checked={role === "committeemember"}
                onChange={handleRoleChange}
              />
              <span className="radio-label">Committee Member</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="role"
                value="resident"
                checked={role === "resident"}
                onChange={handleRoleChange}
              />
              <span className="radio-label">Resident</span>
            </label>
          </div><br/>
        {error && <p className="error">{error}</p>}
        <p className="forgot-password" onClick={handleForgotPassword}>
              Forgot Password?
            </p>
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button> &nbsp; &nbsp;
          <button className="login-button" onClick={handleSignup}>
            Signup
          </button>
          
        </div>
        <ToastContainer />
      </div>
    </div>
  </div>
  );
};

export default Login;
