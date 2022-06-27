import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  LinearProgress,
  Link,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";
import { forgotPassTC } from "../../../../m2-bll/reducers/forgotPass-reducer";
import { useAppDispatch, useAppSelector } from "../../../../m2-bll/store";
import style from "./PasswordRecovering.module.css";

export const PasswordRecovering: React.FC = () => {
  const [email, setEmail] = useState("");

  const status = useAppSelector((state) => state.app.status);
  const successRecovery = useAppSelector((state) => state.recoveryPass.success);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  type FormikErrorType = {
    email?: string;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },

    onSubmit: (values) => {
      formik.resetForm();
      setEmail(values.email); // для передачи в компоненту CheckEmail
      dispatch(forgotPassTC(values.email));
    },
  });

  if (successRecovery) {
    return <Navigate to="/check-email" replace={true} state={email} />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Grid
        container
        justifyContent={"center"}
        direction={"column"}
        className={style.passwordRecovering}
      >
        <h3 className={style.title}>it-incubator</h3>
        <h3 className={style.subtitle}>Forgot your password?</h3>
        <Grid
          item
          justifyContent={"center"}
          style={{ marginTop: "30px", maxWidth: "260px", marginBottom: "68px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormGroup>
                <TextField
                  label="Email"
                  margin="normal"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: "red" }}>{formik.errors.email}</div>
                ) : null}

                <Button
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  style={{ marginTop: "100px" }}
                  disabled={
                    status === "loading" || formik.errors.email ? true : false
                  }
                >
                  Send instructions
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
        <span className={style.description}>
          Did you remember your password?
        </span>
        <Link
          className={style.tryLogin}
          onClick={() => navigate("/Login", { replace: true })}
          style={{ cursor: "pointer" }}
        >
          Try loggin in
        </Link>
      </Grid>
    </>
  );
};
