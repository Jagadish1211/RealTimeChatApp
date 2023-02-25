import React from "react";
import "./home.scss";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container home">
      <h1 className="home-header">TADAA</h1>
      <div className="home-buttons">
        <Button
          variant="outlined"
          className="button"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </Button>
        <Button
          variant="outlined"
          className="button"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Home;
