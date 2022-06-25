import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './Registration.module.css'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
// import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom'
// import {AppRootStateType} from '../../app/store';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    // const dispatch = useDispatch()
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:'',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 6) {
                errors.password = 'Invalid password';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.confirmPassword.length < 6) {
                errors.confirmPassword = 'Invalid password';
            }
            return errors;
        },

        onSubmit: values => {
            alert(JSON.stringify(values, null, 2))
            // dispatch(loginTC(values));
            formik.resetForm()
        },
    });
    // if(isLoggedIn) {
    //     return <Navigate to='/'/>
    // }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel className={style.label}>
                        <p>CARDS</p>
                        <p>Sign Up</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField id="outlined-Email" placeholder={'Enter email'}
                            label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
                        <TextField type="password" label="Confirm password"
                                   margin="normal"
                                   {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && <div>{formik.errors.confirmPassword}</div>}
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Register
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>;
};


