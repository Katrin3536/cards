import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../bll/store';
import {Navigate, useParams} from 'react-router-dom';
import {createNewPassTC, passIsChangedSelect} from '../../bll/reducers/forgotPass-reducer';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {appStatusSelect} from '../../bll/reducers/app-reducer';
import {PATH} from '../../components/common/routes/RoutesConstants';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import OutlinedInput from '@mui/material/OutlinedInput';
import style from './NewPassword.module.css';
import commonStyle from '../../assets/styles/Common.module.css';
import {isLoggedInSelector} from '../../bll/reducers/auth-reducer';

export const NewPassword: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const status = useAppSelector(appStatusSelect);
    const passIsChanged = useAppSelector(passIsChangedSelect);
    const isLoggedIn = useAppSelector(isLoggedInSelector);
    const dispatch = useAppDispatch();
    const {token} = useParams();

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validate: (values) => {

            const errors: FormikErrorType = {};

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length <= 7) {
                errors.password = 'Less then 8 symbols';
            }
            return errors;
        },
        onSubmit: ({password}) => {
            formik.resetForm();
            dispatch(createNewPassTC(password, token));
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
        || Object.values(formik.values.password).length === 0;

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>;
    }

    if (passIsChanged) {
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
                    <h3 className={commonStyle.subtitle}>Create new password</h3>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className={commonStyle.form}
                    style={{width: '250px'}}
                >
                    <FormGroup>
                        <FormControl sx={{m: 1, width: '250px'}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                label="Password"
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
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password
                                ? (<div style={{color: 'red'}}>{formik.errors.password}</div>)
                                : null}
                        </FormControl>

                        <span className={commonStyle.description} style={{marginBottom: '70px'}}>
                            Create new password and we will send you future instructions to email
                        </span>

                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            style={{width: '80%', margin: '30px auto'}}
                            disabled={disableBtn}
                        >
                            Set password
                        </Button>
                    </FormGroup>
                </form>
            </Grid>
        </>
    );
};

// ==== TYPES ====

type FormikErrorType = {
    password?: string;
};