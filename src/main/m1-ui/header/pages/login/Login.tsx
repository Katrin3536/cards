import {Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import React from 'react';
import style from './Login.module.css'
import {useFormik} from "formik";
import {PATH} from "../../../routes/RoutesConstants";
import {NavLink} from "react-router-dom";

function Login() {

    const formik = useFormik({
        validate: (value) => {
            if (!value.password) {
                return {
                    password: 'Password is required'
                }
            }
            if (value.password.length <= 5) {
                return {
                    password: 'Password should be > 5'
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
            /*rememberMe: false*/
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <div className={style.loginContainer}>
            <Container fixed>
                <Grid container justifyContent={'center'}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <FormLabel>
                                    <h1>IT-INCUBATOR</h1>
                                    <h2>Sign in</h2>
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
{/*                                    <FormControlLabel
                                        label={'Remember me'}
                                        control={<Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />}
                                    />*/}
                                    <Button type={'submit'} variant={'contained'} color={'primary'}>
                                        Login
                                    </Button>
                                    <p>Don`t have an account?</p>
                                        <NavLink to={PATH.REGISTRATION}>Sign Up</NavLink>
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

                {/*<SpacingGrid />*/}




            </Container>
        </div>
    );
}

export default Login;