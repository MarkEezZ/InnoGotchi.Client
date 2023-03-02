import StatsBar from "../StatsBar/StatsBar";
import { useEffect, useState } from "react";
import { PetForFarm, Stats } from "../../Types/Types";
import "./Pet.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Api";
import { RootState } from "../../store";

interface IPetProps {
    petDto: PetForFarm;
    showButton: boolean;
    isViewPanel?: boolean;
    petClick?: () => void;
    setPetForRecord?: (pet: PetForFarm) => void;
    setStatsForRecord?: (stats: Stats) => void;
}

const Pet : React.FC<IPetProps> = ({ petDto, showButton, petClick, isViewPanel, setPetForRecord, setStatsForRecord }) => {
    const [pet, setPet] = useState<PetForFarm>(petDto);
    const [stats, setStats] = useState<Stats | undefined>();

    const [showStatsButton, setStatsButton] = useState<boolean>(false);
    const [isStatsBarOpened, setStatsBarOpened] = useState<boolean>(false);

    const currentFarm = useSelector((state: RootState) => state.farmRecordReducer.currentFarmRecord);
    const dispatch = useDispatch();

    let timeout: NodeJS.Timeout;

    useEffect(function () {
        if (pet.isDead == true) {
            setStatsBarOpened(false);
        }
        if (setPetForRecord) {
            setPetForRecord(pet);
        }

        refreshStats();

        let interval = setInterval(() => {
            refreshStats();
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [pet]);

    useEffect(() => {
        setPet(petDto);
    }, [petDto]);

    async function refreshStats() {
        let dayInMilliseconds = 86400000;
        let periodForEat = dayInMilliseconds * 1;
        let periodForDrink = dayInMilliseconds * 1;
        let periodForHealth = dayInMilliseconds * 1;
        let periodForMood = dayInMilliseconds * 1;

        let foodL = Math.round(100 - ((Date.now() - Date.parse(pet.lastEatTime)) / periodForEat * 100));
        let drinkL = Math.round(100 - ((Date.now() - Date.parse(pet.lastDrinkTime)) / periodForDrink * 100));
        let moodL = Math.round(100 - ((Date.now() - Date.parse(pet.lastMoodTime)) / periodForMood * 100));
        let healthL = Math.round(100 - ((Date.now() - Date.parse(pet.lastHealthTime)) / periodForHealth * 100));

        if (healthL <= 0 && pet.isDead == false) {
            setStatsBarOpened(false);

            let deadPet = Object.assign(pet);
            deadPet.isDead = true;
            setPet(deadPet);
            
            clearTimeout(timeout);
            dispatch({type: "SET_ISMESSAGE", payload: false});
    
            let url = `https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/pets/${pet.name}/dead`;
            await api.patch(url)
            .then((response) => {
                dispatch({type: "UPDATE_PET", payload: [response.data]})
            })
            .catch((ex) => {
                dispatch({type: "SET_MESSAGE", payload: ex.response.data});
                dispatch({type: "SET_ISMESSAGE", payload: true});
    
                timeout = setTimeout(function () {
                    dispatch({type: "SET_ISMESSAGE", payload: false});
                }, 3000);
            });
        }
        
        let countedStats: Stats = {
            foodLevel: foodL,
            drinkLevel: drinkL,
            moodLevel: moodL,
            healthLevel: healthL,
        };

        if (setStatsForRecord) {
            setStatsForRecord(countedStats);
        }

        setStats(countedStats);
    }

    function deletePet() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = `https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/pets/delete`;
        api.delete(url, {data: pet})
        .then((response) => {
            console.log(response.data);
            dispatch({type: "DELETE_PET", payload: [pet]})
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    function resurrectPet() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = `https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/pets/${pet.name}/resurrect`;
        api.patch(url)
        .then((response) => {
            dispatch({type: "UPDATE_PET", payload: [response.data]})
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
        <>
            {stats && isStatsBarOpened &&
                <div className="stats_bar_wrapper">
                    <StatsBar pet={pet} stats={stats}></StatsBar>                    
                </div>
            }
            {(showStatsButton || isStatsBarOpened) && showButton && !pet.isDead &&
                <button className='stats_bar_button' onClick={() => setStatsBarOpened(!isStatsBarOpened)} onMouseOver={() => setStatsButton(true)} onMouseLeave={() => setStatsButton(false)}></button>
            }
            {pet.isDead && showButton && showStatsButton &&
                <>
                    <button onClick={() => deletePet()} onMouseOver={() => setStatsButton(true)} onMouseLeave={() => setStatsButton(false)} title="Delete Pet" className='delete_button'></button>
                    <button onClick={() => resurrectPet()} onMouseOver={() => setStatsButton(true)} onMouseLeave={() => setStatsButton(false)} title="Resurrect Pet" className='resurrect_button'></button>
                </>
            }
            <div className="pet_body" style={
                pet.isDead ?
                (isViewPanel ? {backgroundImage: `url(assets/bodies/${pet.body.fileName})`} : {backgroundImage: `url(assets/bodies/ash.png)`}) :
                {backgroundImage: `url(assets/bodies/${pet.body.fileName})`}
            }
                onMouseOver={() => setStatsButton(true)} 
                onMouseLeave={() => setStatsButton(false)} 
                onMouseDown={() => setStatsButton(false)} 
                onMouseUp={() => setStatsButton(true)}
                onClick={petClick}>
                {(!pet.isDead || isViewPanel) &&
                    <div className="pet_eyes" style={{backgroundImage: `url(assets/eyes/${pet.eyes.fileName})`}}></div>
                }
                {pet.nose && (!pet.isDead || isViewPanel) &&
                    <div className="pet_nose" style={{backgroundImage: `url(assets/noses/${pet.nose.fileName})`}}></div>
                }
                {(!pet.isDead || isViewPanel) &&
                    <div className="pet_mouth" style={{backgroundImage: `url(assets/mouths/${pet.mouth.fileName})`}}></div>
                }
            </div>
        </>
    );
}

export default Pet;