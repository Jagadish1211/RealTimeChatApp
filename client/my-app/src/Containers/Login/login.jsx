import React from "react";
import "./login.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => { 
        console.log({email, password})
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
