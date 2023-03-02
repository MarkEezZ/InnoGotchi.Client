import { FarmRecordDto } from "../../Types/Types";
import { farmRecordStateType } from "./stateTypes";

export type FarmRecordActionType = {
    type: string,
    payload: FarmRecordDto | undefined
}

const defaultState: farmRecordStateType = {
    currentFarmRecord: undefined
}

export const farmRecordReducer = (state = defaultState, action: FarmRecordActionType) => {
  switch (action.type) {
    case "SET_FARM":
      return {...state, currentFarmRecord: action.payload}
    default:
      return state;
  }
} 