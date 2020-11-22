import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import PaperInput from "../../components/PaperInput";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirm_password: yup.string().min(8).max(16).required(),
});
function Forgot() {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState({
    msg: "",
    severity: "",
  });
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    AuthService.resetPwd(data)
      .then((res) => {
        setStatus({
          msg: res,
          severity: "success",
        });
        setOpen(true);
        history.push("/login");
        console.log(res);
      })
      .catch((err) => {
        setStatus({
          msg: err.response.data,
          severity: "error",
        });
        setOpen(true);
        console.log(err);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="edit-profile-container">
      <Typography
        variant="h4"
        style={{ color: "#fb5b5a", fontWeight: "bolder" }}
      >
        Reset Password
      </Typography>
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Email.."
              name="email"
              type="text"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>
          {errors.email?.message}
        </Typography>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Password"
              name="password"
              type="password"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>
          {errors.password?.message}
        </Typography>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Confirm Password"
              name="confirm_password"
              type="password"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>
          {errors.confirm_password?.message}
        </Typography>
        <PaperInput
          child={
            <input className="login-btn" type="submit" value="Change"></input>
          }
        />
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.severity}>
          {status.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Forgot;
