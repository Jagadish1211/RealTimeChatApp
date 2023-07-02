import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import "./login.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {useCookies} from 'react-cookie';

import { authSuccess, authFailure, authRequest } from "../../Features/Authentication/AuthSlice";


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    const dispatch = useDispatch();

    const handleLogin = () => { 
        const options = {headers : {"Content-Type": "application/json"}}
        axios.post("http://localhost:5000/app/login", {
          email,
          password
        }, options).then(res => {
          dispatch(authRequest());
          if (res.status === 200 && res.data.message === "Login successful") {
            // create cookie
            const cookieData = {email : res.data.user.email, accessToken : res.data.accessToken}
            setCookie('accountDetails', cookieData)
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
