import React from 'react';
import {useAppSelector} from '../../bll/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../components/common/routes/RoutesConstants';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import style from './Profile.module.css';
import LinearProgress from '@mui/material/LinearProgress';
import {isLoggedInSelector} from '../../bll/reducers/auth-reducer';
import {appStatusSelect} from '../../bll/reducers/app-reducer';

const Profile: React.FC = () => {
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const status = useAppSelector(appStatusSelect);

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>;
    }

    return (
        <>
            {status === 'loading' && <LinearProgress/>}
            <div className={style.profile}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        {/* <Paper style={{ padding: "10px" }}> */}
                        <ProfileInfo/>
                        {/* </Paper> */}
                    </Grid>
                    <Grid item xs={9}>
                        <Paper style={{padding: '10px'}}>Cards</Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Profile;
