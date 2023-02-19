import React from "react";
import "./signup.scss";

import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Signup = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUsername] = React.useState("");

    const handleSignUp = () => { 
        console.log({email, password, username})
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1> TADAA </h1>
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
