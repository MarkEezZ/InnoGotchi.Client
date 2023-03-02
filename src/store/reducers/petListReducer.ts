import { PetForFarm } from "../../Types/Types";
import { petsStateType } from "./stateTypes";

type petListActionType = {
  type: string,
  payload: PetForFarm[]
}

const defaultState: petsStateType = {
    petList: []
}

export const petListReducer = (state = defaultState, action: petListActionType) => {
  switch (action.type) {
    case "UPDATE_COORDS":
      for (let i = 0; i < state.petList.length; i++) {
        if (state.petList[i].id === action.payload[0].id) {
          state.petList[i].positionX = action.payload[0].positionX;
          state.petList[i].positionY = action.payload[0].positionY;
          break;
        }
      };
      return state;
    case "UPDATE_PET":
      return {...state, petList: state.petList.map(pet => {
        if (pet.id === action.payload[0].id) {
          return action.payload[0];
        }
        return pet;
      })}
    case "SET_PETS":
      return {...state, petList: action.payload}
    case "ADD_PET":
      return {...state, petList: [...state.petList, action.payload[0]]}
    case "DELETE_PET":
      return {...state, petList: state.petList.filter(pet => pet.id !== action.payload[0].id)}
    default:
      return state;
  }
} 