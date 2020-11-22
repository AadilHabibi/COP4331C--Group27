import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import "./Login.scss";
import { useForm } from "react-hook-form";
import PaperInput from "../../components/PaperInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
//
import AuthService from "../../services/AuthService";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
//
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
});
function Login() {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState({
    msg: "",
    severity: "",
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    AuthService.login(data)
      .then((res) => {
        setStatus({
          msg: "LoggedIn",
          severity: "success",
        });
        setOpen(true);
        history.push("/movies");
        console.log(res);
      })
      .catch((err) => {
        setStatus({
          msg: err.response.data,
          severity: "error",
        });
        setOpen(true);
        console.log(err.message);
      });
  };
  //

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //
  return (
    <div className="login-container">
      <div>
        <Typography
          variant="h4"
          style={{ color: "#fb5b5a", fontWeight: "bolder" }}
        >
          LOGIN
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PaperInput
            child={
              <input
                name="email"
                placeholder="Email..."
                className="styled-input"
                ref={register}
              ></input>
            }
          />
          {errors.email && (
            <Typography style={{ color: "red" }}>
              {errors.email?.message}
            </Typography>
          )}
          <PaperInput
            child={
              <input
                name="password"
                placeholder="Password..."
                className="styled-input"
                type="password"
                ref={register}
              ></input>
            }
          />
          {errors.password && (
            <Typography style={{ color: "red" }}>
              {errors.password?.message}
            </Typography>
          )}
          <PaperInput
            child={
              <input
                type="submit"
                value="Login"
                className="login-btn"
                ref={register}
              ></input>
            }
          />
        </form>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            style={{
              cursor: "pointer",
              fontSize: "small",
              textDecorationLine: "underline",
            }}
            onClick={() => history.push("/forgot")}
          >
            Forgot Password?
          </a>
          <a
            style={{ cursor: "pointer", fontSize: "large", marginLeft: "10px" }}
            onClick={() => history.push("/signup")}
          >
            Signup
          </a>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.severity}>
          {status.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
