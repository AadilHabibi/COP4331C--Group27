import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./Login.scss";

function Login() {
  const [elevation, setElevation] = useState({
    email: 2,
    pw: 2,
    login: 2,
  });
  return (
    <div className="login-container">
      <div>
        <Typography variant="h4" style={{color:"#fb5b5a",fontWeight:"bolder"}} >LOGIN</Typography>
        <Paper
          style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
          elevation={elevation.email}
          onMouseEnter={() => setElevation({ ...elevation, email: 10 })}
          onMouseLeave={() => setElevation({ ...elevation, email: 2 })}
        >
          <input placeholder="Email..." className="styled-input"></input>
        </Paper>
        <Paper
          style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
          elevation={elevation.pw}
          onMouseEnter={() => setElevation({ ...elevation, pw: 10 })}
          onMouseLeave={() => setElevation({ ...elevation, pw: 2 })}
        >
          <input
            placeholder="Password..."
            className="styled-input"
            type="password"
          ></input>
        </Paper>
        <a style={{ cursor: "pointer", fontSize: "small" }}>Forgot Password?</a>
        <Paper
          style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
          elevation={elevation.login}
          onMouseEnter={() => setElevation({ ...elevation, login: 10 })}
          onMouseLeave={() => setElevation({ ...elevation, login: 2 })}
        >
          <input type="submit" value="Login" className="login-btn"></input>
        </Paper>
        <a style={{ cursor: "pointer", fontSize: "large" }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
