import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import "./signup.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

    const handleSignUp = () => { 
      const options = {headers : {"Content-Type": "application/json"}}
      axios.post("http://localhost:5000/app/signup", {
        email,
        password
      }, options).then(res => {
        // dispatch(authRequest());
        if (res.status === 200 && res.data.message === "User registered successfully!") {
          // create login logic

          navigate("/login");
        }
      }).catch(err => {
        console.log(err.message);
        // dispatch(authFailure());
        // show error message
      } )
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 onClick={() => navigate("/")}> TADAA </h1>
        <TextField
          required
          id="outlined-required"
          label="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button variant="outlined" className="button" onClick={handleSignUp}>SIGN UP</Button>
      </div>
    </div>
  );
};

export default Signup;
