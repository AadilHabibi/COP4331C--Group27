import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./Login.scss";
import { useForm } from "react-hook-form";

function Login() {
  const [elevation, setElevation] = useState({
    email: 2,
    pw: 2,
    login: 2,
  });
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className="login-container">
      <div>
        <Typography
          variant="h4"
          style={{ color: "#fb5b5a", fontWeight: "bolder" }}
        >
          LOGIN
        </Typography>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.email}
            onMouseEnter={() => setElevation({ ...elevation, email: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, email: 2 })}
          >
            <input
              name="email"
              placeholder="Email..."
              className="styled-input"
              ref={register({ required: true })}
            ></input>
          </Paper>
          {errors.email && <Typography style={{ color: "red" }} >Email is required</Typography>}
          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.pw}
            onMouseEnter={() => setElevation({ ...elevation, pw: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, pw: 2 })}
          >
            <input
              name="password"
              placeholder="Password..."
              className="styled-input"
              type="password"
              ref={register({ required: true })}
            ></input>
          </Paper>
          {errors.password && <Typography style={{ color: "red" }} >Password is required</Typography>}
          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.login}
            onMouseEnter={() => setElevation({ ...elevation, login: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, login: 2 })}
          >
            <input
              type="submit"
              value="Login"
              className="login-btn"
              ref={register}
            ></input>
          </Paper>
        </form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            style={{
              cursor: "pointer",
              fontSize: "small",
              textDecorationLine: "underline",
            }}
          >
            Forgot Password?
          </a>
          <a
            style={{ cursor: "pointer", fontSize: "large", marginLeft: "10px" }}
          >
            Signup
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
