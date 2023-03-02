import BackButton from '../../Buttons/BackButton/BackButton';
import GameButton from '../../Buttons/GameButton/GameButton';
import Constructor from '../Constructor/Constructor';
import Statistics from '../Statistics/Statistics';
import FarmReview from '../FarmReview/FarmReview';
import PetReview from '../PetReview/PetReview';
import InviteFriends from '../InviteFriends/InviteFriends';
import Settings from '../Settings/Settings';

import { bodySizes } from '../../Configurations/BodySizesConfiguration';

import React, { useState, useEffect } from 'react';
import { BodyTypesEnum, GameFieldWindows, Windows } from '../../../Enums/Enums';
import { PetForFarm, BodySizeType, CoordinatesDto, UserInfoDtoWithoutPassword, GuestInfo } from '../../../Types/Types';
import "./GameField.css";
import Pet from '../../Pet/Pet';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { RootState } from '../../../store';
import api from '../../../Api';

type GameFieldPropsType = {
    children: React.ReactNode;
    setMainWindow: (str: string) => void;
}

const GameField = ({ children, setMainWindow }: GameFieldPropsType) => {
    const [currentWindow, setCurrentWindow] = useState<string>(GameFieldWindows.GAME)
    const [currentPet, setCurrentPet] = useState<PetForFarm | undefined>();
    const [userInfo, setUserInfo] = useState<UserInfoDtoWithoutPassword | undefined>();
    const [farmGuests, setFarmGuests] = useState<GuestInfo[] | undefined>();
    const [farmUsersToInvite, setFarmUsersToInvite] = useState<GuestInfo[] | undefined>();

    const petList = useSelector((state: RootState) => state.petListReducer.petList)
    const currentFarm = useSelector((state: RootState) => state.farmRecordReducer.currentFarmRecord);
    const isOwner = useSelector((state: RootState) => state.isOwner);
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        GetPets();

        let game_field = document.getElementById('game_field');
        game_field!.addEventListener('click', (e) => {
            if (e.target == game_field) {
                setCurrentPet(undefined);
            }
        });
    }, []);

    useEffect(() => {
        if (currentWindow === GameFieldWindows.GAME) {
            setFieldToCenter();
        }
    }, [currentWindow]);

    function setFieldToCenter() {
        let game_field = document.getElementById('game_field');
        document.documentElement.scrollTop = (game_field!.offsetHeight - window.innerHeight) / 2;
        document.documentElement.scrollLeft = (game_field!.offsetWidth - window.innerWidth) / 2;
    }

    function GetPets() {
        clearTimeout(timeout)
        dispatch({type: "SET_ISMESSAGE", payload: false});

        if (currentFarm?.farmName !== undefined) {
            let url = `https://localhost:5177/innogotchi/farms/${currentFarm.farmName}/pets`;
            api.get(url)
            .then((response) => {
                dispatch({type: "SET_PETS", payload: response.data});
            })
            .catch((ex) => {
                dispatch({type: "SET_MESSAGE", payload: ex.response.data});
                dispatch({type: "SET_ISMESSAGE", payload: true});
    
                timeout = setTimeout(function () {
                    dispatch({type: "SET_ISMESSAGE", payload: false});
                }, 3000);
            });
        }
    }

    function petMouseDown(event: React.MouseEvent, name: string) {
        let petBlock = document.getElementById(`pet_${name}_wrapper`);

        let ShiftX = event.clientX - petBlock!.getBoundingClientRect().left;
        let ShiftY = event.clientY - petBlock!.getBoundingClientRect().top;

        moveAt(event.pageX, event.pageY);
      
        function moveAt(pageX: number, pageY: number): void {
            petBlock!.style.left = Math.round(pageX + (petBlock!.offsetWidth / 2) - ShiftX) + 'px';
            petBlock!.style.top = Math.round(pageY + (petBlock!.offsetHeight / 2) - ShiftY) + 'px';
        }
      
        function onMouseMove(event: MouseEvent) {
            moveAt(event.pageX, event.pageY);
        }
      
        async function petMouseUp() {            
            dispatch({type: "SET_ISMESSAGE", payload: false});

            let petPosition: CoordinatesDto = {
                positionX: Math.round(petBlock!.offsetLeft),
                positionY: Math.round(petBlock!.offsetTop)
            }

            let url = `https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/pets/${name}/moved`;
            await api.patch(url, petPosition)
            .catch((ex) => {
                dispatch({type: "SET_MESSAGE", payload: ex.response.data});
                dispatch({type: "SET_ISMESSAGE", payload: true});
    
                timeout = setTimeout(function () {
                    dispatch({type: "SET_ISMESSAGE", payload: false});
                }, 3000);
            });

            document.removeEventListener('mousemove', onMouseMove);
            petBlock!.removeEventListener('mouseup', petMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        petBlock!.addEventListener('mouseup', petMouseUp);
    };

    async function getUserInfo() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let promise = new Promise<UserInfoDtoWithoutPassword>((resolve, reject) => {
            api.get("https://localhost:5177/innogotchi/users/user-info")
            .then(response => {
                resolve(response.data);
            })
            .catch((ex) => {
                let startUserInfoMock: UserInfoDtoWithoutPassword = {
                    login: "",
                    name: "",
                    surname: "",
                    email: "",
                    age: 0,
                    avatarFileName: "ava_default.png",
                    isInGame: true,
                    isMusic: true
                }
                reject(startUserInfoMock);

                dispatch({type: "SET_MESSAGE", payload: ex.response.data});
                dispatch({type: "SET_ISMESSAGE", payload: true});

                timeout = setTimeout(function () {
                    dispatch({type: "SET_ISMESSAGE", payload: false});
                }, 3000);
            });
        });
        
        let result: UserInfoDtoWithoutPassword = await promise;
        setUserInfo(result);
        setCurrentWindow(GameFieldWindows.SETTINGS)
    };

    async function getGuests() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        await api.get(`https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/guests`)
        .then((response) => {
            setFarmGuests(response.data);
        })
        .catch((ex) => {
            setFarmGuests([]);

            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });

        await api.get(`https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/guests/users`)
        .then((response) => {
            setFarmUsersToInvite(response.data);
        })
        .catch((ex) => {
            setFarmUsersToInvite([]);

            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
        setCurrentWindow(GameFieldWindows.FRIENDS);
    }

    function Exit() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = "https://localhost:5177/innogotchi/users/log-out";
        api.put(url)
        .then((response) => {
            console.log(response.data);
            setMainWindow(Windows.START);
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    function setPetByReview(pet: PetForFarm) {
        setCurrentPet(pet);
        setCurrentWindow(GameFieldWindows.PET_REVIEW);
    }

    return(
        <>
            {currentWindow === GameFieldWindows.STATISTICS &&
                <Statistics>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </Statistics>
            }
            {currentWindow === GameFieldWindows.FARM_REVIEW &&
                <FarmReview petList={petList} setCurrentPet={setPetByReview}>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </FarmReview>
            }
            {currentWindow === GameFieldWindows.PET_REVIEW &&
                <PetReview pet={currentPet!}>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </PetReview>
            }
            {currentWindow === GameFieldWindows.FRIENDS &&
                <InviteFriends farmGuestsLocal={farmGuests!} usersToInviteLocal={farmUsersToInvite!}>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </InviteFriends>
            }
            {currentWindow === GameFieldWindows.SETTINGS && 
                <Settings userInfo={userInfo!} setGameWindow={() => setCurrentWindow(GameFieldWindows.GAME)}>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </Settings>
            }
            {currentWindow === GameFieldWindows.CONSTRUCTOR &&
                <Constructor createPetClick={() => setCurrentWindow(GameFieldWindows.GAME)}>
                    <BackButton backClick={() => setCurrentWindow(GameFieldWindows.GAME)}></BackButton>
                </Constructor>
            }
            <section id="game_field" style={currentWindow === GameFieldWindows.GAME ? {display: "block"} : {display: "none"}}>
                {children}
                {petList.map((pet) => {

                    let bodySize: BodySizeType;

                    if (pet.isDead) {
                        bodySize = {
                            width: 100,
                            height: 100
                        };
                    }
                    else {
                        switch(pet.body.type) {
                            case BodyTypesEnum.CIRCLE:
                                bodySize = bodySizes.circle
                                break;
                            case BodyTypesEnum.EGG:
                                bodySize = bodySizes.egg
                                break;
                            case BodyTypesEnum.SQUARE:
                                bodySize = bodySizes.square
                                break;
                            case BodyTypesEnum.PEAR:
                                bodySize = bodySizes.pear
                                break;
                            case BodyTypesEnum.OVAL:
                                bodySize = bodySizes.oval
                                break;
                            default:
                                bodySize = {
                                    width: 100,
                                    height: 100
                                };
                                break;
                        }
                    }
                    return (
                        <div key={pet.id} id={`pet_${pet.name}_wrapper`} className='pet_wrapper' onMouseDown={(e) => petMouseDown(e, pet.name)} onDragStart={() => false}
                            style = {
                                {
                                    top: `${pet.positionY}px`, left: `${pet.positionX}px`,
                                    width: `${bodySize.width}px`, height: `${bodySize.height}px`,
                                }
                            }>
                            <Pet key={pet.id} petDto={pet} showButton={true} petClick={() => setCurrentPet(pet)}></Pet>
                        </div>
                    );
                })}

                {currentPet &&
                    <div className="pet_regular_data_gameField">
                        <h2 className="black_rounded_h">{currentPet.name}</h2>
                        <div className="pet_view_panel_st">
                            <Pet petDto={currentPet} isViewPanel={true} showButton={false}></Pet>
                        </div>
                    </div>
                }
                <GameButton className="constructor_button" onClick={() => {setCurrentWindow(GameFieldWindows.CONSTRUCTOR)}} isDisabled={!isOwner}></GameButton>
                <GameButton className="view_pet_button" onClick={() => setCurrentWindow(GameFieldWindows.PET_REVIEW)} isDisabled={currentPet === undefined ? true : false}></GameButton>
                <GameButton className="statistics_button" onClick={() => setCurrentWindow(GameFieldWindows.STATISTICS)}></GameButton>
                <GameButton className="farm_review_button" onClick={() => setCurrentWindow(GameFieldWindows.FARM_REVIEW)}></GameButton>
                <GameButton className="invite_friends_button" onClick={() => getGuests()} isDisabled={!isOwner}></GameButton>
                <GameButton className="settings_button" onClick={() => getUserInfo()}></GameButton>
                <GameButton className="exit_button" text="Exit" onClick={() => Exit()}></GameButton>
            </section>
        </>
    );
}

export default GameField;