const initialState= "hello";

const ANY_CASE = 'ANY-CASE'
export const testReducer = (state:InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case ANY_CASE:
            return state
        default:
            return state;
    }
};

//actions
export const anyCaseAC = () => ({type: ANY_CASE} as const)

//types
export type anyCaseActionType = ReturnType<typeof anyCaseAC>
export type ActionsType = anyCaseActionType
export type InitialStateType = string

