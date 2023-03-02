import { FarmRecordDto, PetForFarm } from "../../Types/Types"

export type farmRecordStateType = {
    currentFarmRecord: FarmRecordDto | undefined
}

export type petsStateType = {
    petList: PetForFarm[]
}