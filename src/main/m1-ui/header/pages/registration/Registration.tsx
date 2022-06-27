import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './Registration.module.css';
import {useFormik} from 'formik';
import {Navigate} from 'react-router-dom';
import {registerTC} from '../../../../m2-bll/reducers/register-reducer';
import {AppRootStateType, useAppDispatch} from '../../../../m2-bll/store';
import {PATH} from '../../../routes/RoutesConstants';
import {useSelector} from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistered);


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = '';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = '';
            } else if (values.password.length <= 6) {
                errors.password = 'Invalid values => less then 7 symbols';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = '';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The passwords you typed do not match'
            }
            return errors;
        },

        onSubmit: values => {
            if (values.password === values.confirmPassword) {
                dispatch(registerTC(values.email, values.password));
            }
            formik.resetForm();
        },
    });
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                    <div>
                        <h1>CARDS</h1>
                        <h2>SIGN UP</h2>
                    </div>
                <FormGroup>
                    <TextField id="outlined-Email" placeholder={'Enter email'}
                               label="Email" margin="normal"
                               {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                    <FormControl sx={{m: 1, width: '250px'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            placeholder={'Enter password'}
                            id="outlined-adornment-password"
                            name={'password'}
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.password}
                            onChange={formik.handleChange}
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
                    </FormControl>
                    {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
                    <FormControl sx={{m: 1, width: '250px'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
                        <OutlinedInput
                            placeholder={'Confirm your password'}
                            id="outlined-adornment-password"
                            name={'confirmPassword'}
                            type={showPassword ? 'text' : 'password'}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
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
                    </FormControl>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div>{formik.errors.confirmPassword}</div>}
                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                        Register
                    </Button>
                </FormGroup>
            </form>
        </Grid>
    </Grid>;
};


