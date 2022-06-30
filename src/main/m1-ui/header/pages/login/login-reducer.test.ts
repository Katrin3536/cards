import { loginReducer } from "../../../../m2-bll/reducers/login-reducer"

let testState: { isLoggedIn: boolean}

beforeEach(()=>{
    testState = {
        isLoggedIn: false
    }
})

test('logged is successful', () => {
    let newState = loginReducer(testState, {type: 'login/SET-IS-LOGGED-IN', value: true})

    expect(newState).not.toBe(testState)
    expect(newState.isLoggedIn).toBe(true)
})