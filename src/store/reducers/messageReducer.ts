const defaultState: string = "";

type messageActionType = {
    type: string,
    payload: string
}

export const messageReducer  = (state: string = defaultState, action: messageActionType) => {
    switch (action.type) {
        case "SET_MESSAGE":
            return action.payload;            
        default:
            return state;
    }
}