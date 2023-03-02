const defaultState: boolean = false;

type isMessageActionType = {
    type: string,
    payload: boolean
}

export const isMessageReducer  = (state: boolean = defaultState, action: isMessageActionType) => {
    switch (action.type) {
        case "SET_ISMESSAGE":
            return action.payload;            
        default:
            return state;
    }
}