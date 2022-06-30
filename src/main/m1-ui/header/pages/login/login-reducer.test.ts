import {authReducer} from '../../../../m2-bll/reducers/auth-reducer';

let testState: { isLoggedIn: boolean}

beforeEach(()=>{
    testState = {
        isLoggedIn: false
    }
})

test('logged is successful', () => {
    let newState = authReducer(testState, {type: "AUTH/login", value: true})

    expect(newState).not.toBe(testState)
    expect(newState.isLoggedIn).toBe(true)
})