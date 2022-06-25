import {Container,Grid} from '@mui/material';
import React from 'react';
import style from './Login.module.css'

function Login() {
    return (
        <div className={style.login}>
            <Container fixed>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

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