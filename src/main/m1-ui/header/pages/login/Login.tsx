import {Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import React from 'react';
import style from './Login.module.css'
import {useFormik} from "formik";

function Login() {

    const formik = useFormik({
        validate: (value) => {
            if (!value.password) {
                return {
                    password: 'Password is required'
                }
            }
            if (!value.email) {
                return {
                    email: 'Email is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <div className={style.login}>
            <Container fixed>
                <Grid container justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <FormLabel>
                                    <p>To log in get registered
                                        <a href={'https://social-network.samuraijs.com/'}
                                           target={'_blank'}> here
                                        </a>
                                    </p>
                                    <p>or use common test account credentials:</p>
                                    <p>Email: free@samuraijs.com</p>
                                    <p>Password: free</p>
                                </FormLabel>
                                <FormGroup>
                                    <TextField
                                        label="Email"
                                        margin="normal"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                                    <TextField
                                        type="password"
                                        label="Password"
                                        margin="normal"
                                        {...formik.getFieldProps('password')}
                                    />
                                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                                    <FormControlLabel
                                        label={'Remember me'}
                                        control={<Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />}
                                    />
                                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                                        Login
                                    </Button>
                                </FormGroup>
                            </FormLabel>
                        </FormControl>
                    </form>
                </Grid>
                {/*<Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>} />
                    <Route path="/login" element={<Login />} />

                    <Route path="*" element={<h1>404 ERROR</h1>} />
                    <Route path="/404" element={<Navigate to={'/404'} />} />
                </Routes>*/}
            </Container>
        </div>
    );
}

export default Login;