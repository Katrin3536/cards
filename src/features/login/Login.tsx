import React, {memo, useCallback, useState} from 'react';
import {useFormik} from 'formik';
import {PATH} from '../../components/common/routes/RoutesConstants';
import {Navigate, useNavigate} from 'react-router-dom';
import {isLoggedInSelector, loginTC} from '../../bll/reducers/auth-reducer';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {appStatusSelect} from '../../bll/reducers/app-reducer';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import style from './Login.module.css';
import commonStyle from '../../assets/styles/Common.module.css';

export const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const status = useAppSelector(appStatusSelect);
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {

            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Password less then 8 symbols';
            }

            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values));
            formik.resetForm();
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const disableBtn =
        status === 'loading'
        || Object.keys(formik.errors).length !== 0
        || Object.values(formik.values.email).length === 0
        || Object.values(formik.values.password).length === 0;

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>;
    }

    return (
        <>
            {status === 'loading' && <LinearProgress/>}
            <Grid
                container
                justifyContent={'center'}
                className={commonStyle.container}
            >
                <div className={style.heading}>
                    <h2 className={commonStyle.title}>Training cards</h2>
                    <h3 className={commonStyle.subtitle}>Sign in</h3>
                </div>

                <form onSubmit={formik.handleSubmit} className={commonStyle.form}>
                    <FormGroup>
                        <FormControl sx={{m: 1, width: '250px'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                placeholder={'Enter email'}
                                label="Email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email
                                ? (<div style={{color: 'red'}}>{formik.errors.email}</div>)
                                : null}
                        </FormControl>

                        <FormControl sx={{m: 1, width: '250px'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                placeholder={'Enter password'}
                                type={showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            {formik.touched.password && formik.errors.password
                                ? (<div style={{color: 'red'}}>{formik.errors.password}</div>)
                                : null}
                        </FormControl>

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox value={formik.values.rememberMe}/>}
                            style={{paddingLeft: '10px', marginBottom: '20px'}}
                        />

                        <Link
                            onClick={() => navigate(PATH.PASSWORD_RECOVERING)}
                            style={{cursor: 'pointer', textAlign: 'right', marginBottom: '30px',}}
                        >
                            Forgot password
                        </Link>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            style={{width: '60%', margin: 'auto'}}
                            color={'primary'}
                            disabled={disableBtn}
                        >
                            Login
                        </Button>

                        <span className={commonStyle.description}>
                            Don`t have an account?
                        </span>

                        <Link
                            onClick={() => navigate(PATH.REGISTRATION)}
                            style={{cursor: 'pointer'}}
                            className={commonStyle.bottomRedirect}
                        >
                            Sign Up
                        </Link>

                    </FormGroup>
                </form>
            </Grid>
        </>
    );
}

// ==== TYPES ====

type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
};
