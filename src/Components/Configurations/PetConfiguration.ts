import { PetForFarm } from "../../Types/Types";

export const pets : PetForFarm[] = [
    {
        id: 1,
        name: "Chip",
        age: 0,
        body: {
            type: "oval",
            name: "White Oval",
            fileName: "egg_white.png"
        },
        eyes: {
            name: "Oblong Eyes",
            fileName: "eyes_tired_oval.png"
        },
        nose: {
            name: "Round Nose",
            fileName: "nose_round.png"
        },
        mouth: {
            name: "Small Smile",
            fileName: "mouth_small_smile.png"
        },
        timeOfCreating: "2023-01-26T19:21:00.6137021",
        lastEatTime: "2023-01-26T19:21:00.6137021",
        lastDrinkTime: "2023-01-26T19:21:00.6137021",
        lastHealthTime: "2023-01-26T19:21:00.6137021",
        lastMoodTime: "2023-01-26T19:21:00.6137021",
        positionX: 1006,
        positionY: 764,
        isDead: true
    },
    {
        id: 2,
        name: "Libstick",
        age: 0,
        body: {
            type: "pear",
            name: "White Pear",
            fileName: "pear_black.png"
        },
        eyes: {
            name: "Round Eyes",
            fileName: "eyes_round.png"
        },
        nose: {
            name: "Cat Nose",
            fileName: "nose_cat.png"
        },
        mouth: {
            name: "Cat Mouth",
            fileName: "mouth_cat.png"
        },
        timeOfCreating: "2023-01-26T19:40:11.9107623",
        lastEatTime: "2023-01-26T19:40:11.9107623",
        lastDrinkTime: "2023-01-26T19:40:11.9107623",
        lastHealthTime: "2023-01-26T19:40:11.9107623",
        lastMoodTime: "2023-01-26T19:40:11.9107623",
        positionX: 1136,
        positionY: 864,
        isDead: true
    },
    {
        id: 3,
        name: "Bibs",
        age: 0,
        body: {
            type: "square",
            name: "White Square",
            fileName: "square_white.png"
        },
        eyes: {
            name: "Vertical Oval Eyes",
            fileName: "eyes_vertical_oval.png"
        },
        nose: null,
        mouth: {
            name: "Cat Mouth",
            fileName: "mouth_cat.png"
        },
        timeOfCreating: "2023-01-30T19:50:14.7530907",
        lastEatTime: "2023-02-02T23:31:14.0820907",
        lastDrinkTime: "2023-02-03T09:21:16.0886221",
        lastHealthTime: "2023-02-03T10:10:10.3078648",
        lastMoodTime: "2023-02-03T13:05:00.4750300",
        positionX: 1156,
        positionY: 1064,
        isDead: true
    }
];