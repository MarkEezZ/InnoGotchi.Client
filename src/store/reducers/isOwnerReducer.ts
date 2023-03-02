const defaultState: boolean = false;

type isOwnerActionType = {
    type: string,
    payload: boolean
}

export const isOwnerReducer  = (state: boolean = defaultState, action: isOwnerActionType) => {
    switch (action.type) {
        case "SET_ISOWNER":
            return action.payload;            
        default:
            return state;
    }
}