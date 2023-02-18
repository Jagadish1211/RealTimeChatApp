import React from "react";
import "./login.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1> LOGIN </h1>
        <TextField
          required
          id="outlined-required"
          label="Email"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined" className="button">Primary</Button>
      </div>
    </div>
  );
};

export default Login;
