import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import style from './Registration.module.css'
import {useFormik} from 'formik';
import {Navigate} from 'react-router-dom'
import { registerTC } from '../../../../m2-bll/reducers/register-reducer';
import {AppRootStateType, useAppDispatch} from '../../../../m2-bll/store';
import {PATH} from '../../../routes/RoutesConstants';
import {useSelector} from 'react-redux';
import {ErrorSnackbar} from '../../../../common/с4-errorSnackbar/ErrorSnackbar';

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const dispatch = useAppDispatch()
    const isRegistered = useSelector<AppRootStateType, boolean>(state=>state.registration.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:'',
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
            } else if (values.password.length <= 7) {
                errors.password = 'Invalid password';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = '';
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Invalid confirm password';
            }
            return errors;
        },

        onSubmit: values => {
            if(values.password ===values.confirmPassword) {
                dispatch(registerTC(values.email, values.password));
            }
            formik.resetForm()
        },
    });
    if(isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

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


