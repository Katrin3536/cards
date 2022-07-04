import {InitialStateType, registerReducer} from '../bll/reducers/register-reducer';

let testState: InitialStateType;

beforeEach(() => {
    testState = {
        email: '',
        password: '',
        isRegistered: false,
    };
});

test('user added successfully', () => {

    let newState = registerReducer(testState, {
        type: 'REGISTRATION/add-user',
        email: 'Egor@mail.ru'
    });

    expect(newState.email).toBe('Egor@mail.ru');
    expect(newState).not.toEqual(testState);
});

test('user registered successfully', () => {

    let newState = registerReducer(testState, {type: 'REGISTRATION/set-is-registered', value: true});

    expect(newState).not.toEqual(testState);
    expect(newState.isRegistered).toBe(true);
});


