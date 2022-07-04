import {appReducer, RequestStatusType} from '../bll/reducers/app-reducer';
import {InitialStateType} from '../bll/reducers/app-reducer';

let testState: InitialStateType;

beforeEach(() => {
    testState = {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitializeApp: false,
    };
});

test('APP is initialized successfully', () => {

    let newState = appReducer(testState, {type: 'APP/initialized', value: true});

    expect(newState.isInitializeApp).toBe(true);
    expect(newState).not.toEqual(testState);
});

test('APP status is changed successfully', () => {

    let newState = appReducer(testState, {type: 'APP/app-status', status: 'succeeded'});

    expect(newState).not.toEqual(testState);
    expect(newState.status).toBe('succeeded');
});

test('error is output successfully', () => {

    let newState = appReducer(testState, {type: 'APP/app-error', error: 'succeeded'});

    expect(newState).not.toEqual(testState);
    expect(newState.error).toBe('succeeded');
});


