import {profileReducer} from '../bll/reducers/profile-reducer';
import {LoginResponseType} from '../api/authorization-api';

let testState: LoginResponseType;

beforeEach(() => {
    testState = {
        created: '',
        email: 'Sergey_M@gmail.com',
        isAdmin: '',
        name: 'Sergey',
        avatar: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: '',
    };
});

test('user name is changed successfully', () => {

    let newState = profileReducer(testState, {type: 'PROFILE/set-user-name', name: 'Egor'});

    expect(newState.name).not.toBe(testState.name);
    expect(newState.name).toBe('Egor');
});

test('user avatar is changed successfully', () => {

    let newState = profileReducer(testState, {
        type: 'PROFILE/set-user-avatar',
        avatar: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg'
    });

    expect(newState.avatar).not.toBe(testState.avatar);
    expect(newState.avatar).toBe('https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg');
    expect(newState.name).toBe('Sergey');
});

test('profile information is set successfully', () => {

    let newState = profileReducer({} as LoginResponseType, {type: 'PROFILE/set-profile-info', payload: testState});

    expect(newState.name).toBe('Sergey');
    expect(newState.email).toBe('Sergey_M@gmail.com');

});


