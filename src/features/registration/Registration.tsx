import React, {useState} from 'react';
import {useFormik} from 'formik';
import {Navigate, useNavigate} from 'react-router-dom';
import {isRegisteredSelect, registerTC} from '../../bll/reducers/register-reducer';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {PATH} from '../../components/common/routes/RoutesConstants';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import style from './Registration.module.css';
import commonStyle from '../../assets/styles/Common.module.css';
import {appStatusSelect} from '../../bll/reducers/app-reducer';
import {isLoggedInSelector} from '../../bll/reducers/auth-reducer';
import Link from '@mui/material/Link';

export const Registration: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const status = useAppSelector(appStatusSelect);
    const isRegistered = useAppSelector(isRegisteredSelect);
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
                errors.password = 'Less then 8 symbols';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords don\'t match';
            }
            return errors;
        },

        onSubmit: (values) => {
            if (values.password === values.confirmPassword) {
                dispatch(registerTC(values.email, values.password));
            }
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const disableBtn =
        status === 'loading'
        || Object.keys(formik.errors).length !== 0
        || Object.values(formik.values.email).length === 0
        || Object.values(formik.values.password).length === 0
        || Object.values(formik.values.confirmPassword).length === 0;

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>;
    }

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>;
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
                    <h3 className={commonStyle.subtitle}>Sign up</h3>
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
                                {...formik.getFieldProps('password')}
                                placeholder={'Enter password'}
                                type={showPassword ? 'text' : 'password'}
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

                        <FormControl
                            sx={{m: 1, width: '250px'}}
                            variant="outlined"
                            style={{marginBottom: '30px'}}
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                {...formik.getFieldProps('confirmPassword')}
                                placeholder={'Confirm your password'}
                                type={showPassword ? 'text' : 'password'}
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
                                label="Confirm password"
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword
                                ? (<div style={{color: 'red'}}>{formik.errors.confirmPassword}</div>)
                                : null}
                        </FormControl>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            style={{width: '60%', margin: 'auto'}}
                            color={'primary'}
                            disabled={disableBtn}
                        >
                            Register
                        </Button>

                        <span className={commonStyle.description}>
                            Already have an account?
                        </span>

                        <Link
                            onClick={() => navigate(PATH.LOGIN)}
                            style={{cursor: 'pointer'}}
                            className={commonStyle.bottomRedirect}
                        >
                            Sign In
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
    password?: string;
    confirmPassword?: string;
};