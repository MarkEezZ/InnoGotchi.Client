import { legacy_createStore as createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { farmRecordReducer } from "./reducers/farmRecordReducer";
import { isMessageReducer } from "./reducers/isMessageReducer";
import { isOwnerReducer } from "./reducers/isOwnerReducer";
import { messageReducer } from "./reducers/messageReducer";
import { petListReducer } from "./reducers/petListReducer";

const rootReducer = combineReducers({
    farmRecordReducer,
    petListReducer,
    message: messageReducer,
    isMessage: isMessageReducer,
    isOwner: isOwnerReducer
});

export const store = createStore(rootReducer, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;