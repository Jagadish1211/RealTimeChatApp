import React from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import "./login.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import { authSuccess, authFailure, authRequest } from "../../Features/Authentication/AuthSlice";


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();

    const handleLogin = () => { 
      // alternative refactored logic for axios call and login 

        const options = {headers : {"Content-Type": "application/json"}}
        axios.post("http://localhost:5000/app/login", {
          email,
          password
        }, options).then(res => {
          dispatch(authRequest());
          if (res.status === 200 && res.data.message === "Login successful") {
            // create cookie
            const userData = {email : res.data.user.email}
            localStorage.setItem("userInfo", JSON.stringify(userData));
            localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
            dispatch(authSuccess(res.data)) && navigate("/chat");
          }
        }).catch(err => {
          console.log(err);
          dispatch(authFailure());
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
        <Button variant="outlined" className="button" onClick={handleLogin}>LOGIN</Button>
      </div>
    </div>
  );
};

export default Login;
