export type ValidationsType = {
    isEmpty?: boolean,
    isNull?: boolean,
    isContainSpaces?: boolean,
    isEmail?: boolean
    isNumber?: boolean,
    minLength?: number,
    maxLength?: number,
    minValue?: number,
    maxValue?: number,
}

export type PetDtoType = {
    Name: string,
    BodyId: number | undefined,
    EyesId: number | undefined,
    NoseId: number | undefined,
    MouthId: number | undefined
}

export type PetForFarm = {
    id: number,
    name: string,
    age: number,
    body: BodyDto,
    eyes: BodyPartDto,
    nose: BodyPartDto | null,
    mouth: BodyPartDto,
    timeOfCreating: string,
    lastEatTime: string,
    lastDrinkTime: string,
    lastHealthTime: string,
    lastMoodTime: string,
    positionX: number,
    positionY: number,
    isDead: boolean
}

export type StatsBarPosition  = {
    position_x: number,
    position_y: number 
}

export type BodySizeType  = {
    width: number,
    height: number 
}

type BodyDto = {
    type: string,
    name: string,
    fileName: string
}
type BodyPartDto = {
    name: string,
    fileName: string
}

export type BodyFromDbDto = {
    id: number,
    type: string,
    name: string,
    fileName: string
}
export type BodyPartFromDbDto = {
    id: number,
    name: string,
    fileName: string
}

export type StatisticsDto = {
    AlivePetsCount: number,
    DeadPetsCount: number,
    AverageFeedingPeriod: number,
    AverageThirstPeriod: number,
    AverageHappinessPeriod: number,
    AverageAge: number
}

export type Stats = {
    foodLevel: number,
    drinkLevel: number,
    healthLevel: number,
    moodLevel: number
}

export type GuestInfo = {
    login: string,
    name: string,
    surname: string,
    age: number | undefined,
    avatarFileName: string
}

export type UserInfoDto = {
    login: string,
    name: string,
    surname: string,
    email: string,
    password: string | null, 
    newPassword?: string | null,
    age: number,
    avatarFileName: string,
    isInGame: boolean,
    isMusic: boolean
}

export type UserInfoDtoWithoutPassword = {
    login: string,
    name: string,
    surname: string,
    email: string,
    age: number,
    avatarFileName: string,
    isInGame: boolean,
    isMusic: boolean
}

export type UserForRegistrationDto = {
    login: string,
    email: string,
    password: string,
    passwordConfirm: string,
    name: string,
    surname: string,
    age: number
}

export type UserForAuthorizationDto = {
    login: string,
    password: string,
}

export type FarmRecordDto = {
    farmName: string,
    farmOwnerLogin: string
}

export type FarmToCreate = {
    name: string,
}

export type CoordinatesDto = {
    positionX: number,
    positionY: number
}