import React, { useState } from "react";
import { useFormik } from "formik";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { Navigate, useNavigate } from "react-router-dom";
import {
  forgotPassTC,
  successRecoverySelect,
} from "../../bll/reducers/forgotPass-reducer";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import style from "./PasswordRecovering.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { isLoggedInSelector } from "../../bll/reducers/auth-reducer";

export const PasswordRecovering: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const status = useAppSelector(appStatusSelect);
  const successRecovery = useAppSelector(successRecoverySelect);
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      setEmail(values.email); // для передачи в компоненту сheckEmail
      dispatch(forgotPassTC(values.email));
    },
  });

  const disableBtn =
    status === "loading" ||
    Object.keys(formik.errors).length !== 0 ||
    Object.values(formik.values.email).length === 0;

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />;
  }

  if (successRecovery) {
    return <Navigate to={PATH.CHECK_EMAIL} state={email} />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Grid
        container
        justifyContent={"center"}
        className={commonStyle.container}
      >
        <div className={style.heading}>
          <h2 className={commonStyle.title}>Training cards</h2>
          <h3 className={commonStyle.subtitle}>Forgot your password?</h3>
        </div>
        <form onSubmit={formik.handleSubmit} className={commonStyle.form}>
          <FormGroup>
            <FormControl
              sx={{ m: 1, width: "250px" }}
              variant="outlined"
              style={{ marginBottom: "100px" }}
            >
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                placeholder={"Enter email"}
                label="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email || formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </FormControl>

            <Button
              type={"submit"}
              variant={"contained"}
              color={"primary"}
              style={{ width: "80%", margin: "auto" }}
              disabled={disableBtn}
            >
              Send instructions
            </Button>

            <span className={commonStyle.description}>
              Did you remember your password?
            </span>

            <Link
              className={commonStyle.bottomRedirect}
              onClick={() => navigate(PATH.LOGIN)}
              style={{ cursor: "pointer" }}
            >
              Try loggin in
            </Link>
          </FormGroup>
        </form>
      </Grid>
    </>
  );
};

// ==== TYPES ====

type FormikErrorType = {
  email?: string;
};
