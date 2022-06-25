import {testReducer} from './test-reducer';
import {applyMiddleware,combineReducers , legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'

let rootReducer = combineReducers({
    state: testReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))