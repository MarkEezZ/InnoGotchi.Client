import Stat from "./Stat/Stat";
import api from "../../Api";
import { PetForFarm, Stats } from "../../Types/Types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "./StatsBar.css";

interface IStatsBarProps {
    pet: PetForFarm;
    stats: Stats;
    setPetForRecord?: (pet: PetForFarm) => void;
    setStatsForRecord?: (stats: Stats) => void;
}

const StatsBar : React.FC<IStatsBarProps> = ({ pet, stats, setPetForRecord, setStatsForRecord }) => {
    const [currentStats, setCurrentStats] = useState<Stats>(stats);
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        setCurrentStats(stats);
    }, [stats]);

    async function updateStats(action: string) {
        clearTimeout(timeout)
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = `https://localhost:5177/innogotchi/farms/pets/${pet.name}/${action}`;
        
        await api.patch(url)
        .then((response) => {
            dispatch({type: "UPDATE_PET", payload: [response.data]});
            if (setPetForRecord) {
                setPetForRecord(response.data);
            }

            let newStats: Stats = Object.assign(currentStats);
            switch (action) {
                case "water":
                    newStats.drinkLevel = 100;
                    break;
                case "feed":
                    newStats.foodLevel = 100;
                    break;
                case "cure":
                    newStats.healthLevel = 100;
                    break;
                case "cheer-up":
                    newStats.moodLevel = 100;
                    break;
            }
            if (setStatsForRecord) {
                setStatsForRecord(newStats);
            }
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    return (
        <div className="stats_bar">
            <div>
                <div className="stat" id="food_stat">
                    {currentStats && currentStats!.foodLevel > 0 && <Stat color="yellow" length={currentStats!.foodLevel}></Stat>}
                </div>
                <button className="fill_stat_button food" onClick={() => updateStats("feed")}></button>
            </div>
            <div>
                <div className="stat" id="drink_stat">
                    {currentStats && currentStats!.drinkLevel > 0 && <Stat color="rgb(50, 200, 20)" length={currentStats!.drinkLevel}></Stat>}
                </div>
                <button className="fill_stat_button drink" onClick={() => updateStats("water")}></button>
            </div>
            <div>
                <div className="stat" id="health_stat health">
                    {currentStats && currentStats!.healthLevel > 0 && <Stat color="rgb(250, 0, 39)" length={currentStats!.healthLevel}></Stat>}
                </div>
                <button className="fill_stat_button health" onClick={() => updateStats("cure")}></button>
            </div>
            <div>
                <div className="stat" id="mood_stat">
                    {currentStats && currentStats!.moodLevel > 0 && <Stat color="rgb(101, 9, 223)" length={currentStats!.moodLevel}></Stat>}
                </div>
                <button className="fill_stat_button mood" onClick={() => updateStats("cheer-up")}></button>
            </div>
        </div>
    );
}

export default StatsBar;