import React, {useCallback} from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {styled} from '@mui/material/styles';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {logoutTC} from '../../../bll/reducers/auth-reducer';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import {profileSelect, updateUserAvatarTC, updateUserNameTC} from '../../../bll/reducers/profile-reducer';
import defaultImage from '../../../assets/img/def-avatar.png';
import classes from './ProfileInfo.module.css';

const Input = styled('input')({
    display: 'none',
});

export const ProfileInfo: React.FC = () => {
    const {name, avatar, email, publicCardPacksCount} = useAppSelector(profileSelect);

    const dispatch = useAppDispatch();

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC());
    }, []);

    const onChangeValueHandler = (newName: string) => {
        dispatch(updateUserNameTC(newName));
    };

    // @ts-ignore
    const encodeImageFileAsURL = ({target}: any) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);

        fileReader.onloadend = function () {
            dispatch(updateUserAvatarTC(fileReader.result));
        };
    };

    const finalAva = {backgroundImage: `url(${avatar ? avatar : defaultImage}`};

    return (
        <div className={classes.wrapper}>
            <div className={classes.userAvatar} style={finalAva}/>
            <label htmlFor="icon-button-file">
                <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={encodeImageFileAsURL}
                />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera/>
                </IconButton>
            </label>

            <LogoutIcon onClick={logoutHandler} className={classes.logoutBtn}/>

            <div className={classes.userInfo}>
                <div className={classes.userName}>
                    <EditableSpan value={name} onChange={onChangeValueHandler}/>
                </div>
                <p>email: {email}</p>
                <span className={classes.numberCards}>
                     Cards: {publicCardPacksCount}
                </span>
            </div>
        </div>
    );
};

