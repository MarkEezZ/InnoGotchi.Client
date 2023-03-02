import SelectPartButton from "./SelectPartButton/SelectPartButton";
import PetConstructor from "./PetConstructor/PetConstructor";

import React, { useEffect, useState } from "react";
import useInput from "../../../CustomHooks/UseInput";
import { BodyPartTypesEnum, BodyPartSizesEnum } from "../../../Enums/Enums";
import { BodyFromDbDto, BodyPartFromDbDto, PetDtoType } from "../../../Types/Types";
import { bodies_, eyes_, noses_, mouths_ } from "../../Configurations/BodyPartsConfiguration";
import "./Constructor.css";
import api from "../../../Api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IConstructorProps {
    children: React.ReactNode;
    createPetClick: () => void;
}

const Constructor: React.FC<IConstructorProps> = ({ children, createPetClick }) => {
    const [bodies, setBodies] = useState<BodyFromDbDto[]>([]);
    const [eyes, setEyes] = useState<BodyPartFromDbDto[]>([]);
    const [noses, setNoses] = useState<BodyPartFromDbDto[]>([]);
    const [mouths, setMouths] = useState<BodyPartFromDbDto[]>([]);
    
    const petName = useInput("", {isEmpty: true, isContainSpaces: false, maxLength: 50});
    const [petBody, setPetBody] = useState<BodyFromDbDto | undefined>(undefined);
    const [petEyes, setPetEyes] = useState<BodyPartFromDbDto | undefined>(undefined);
    const [petNose, setPetNose] = useState<BodyPartFromDbDto | undefined>(undefined);
    const [petMouth, setPetMouth] = useState<BodyPartFromDbDto | undefined>(undefined);

    const [currentPart, setCurrentPart] = useState<string>();
    const [isSubmitClicked, setSubmitClicked] = useState<boolean>(false);

    const currentFarm = useSelector((state: RootState) => state.farmRecordReducer.currentFarmRecord);
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        setBodies(bodies_);
        setEyes(eyes_);
        setNoses(noses_);
        setMouths(mouths_);
    }, []);

    function createPetSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});
        if (petBody !== undefined && petEyes !== undefined && petMouth !== undefined) {

            let newPet: PetDtoType = {
                Name: petName.value,
                BodyId: petBody.id,
                EyesId: petEyes.id,
                NoseId: petNose?.id,
                MouthId: petMouth.id
            }
            
            let url = `https://localhost:5177/innogotchi/farms/${currentFarm?.farmName}/pets/constructor`;
            api.post(url, newPet)
            .then((response) => {
                dispatch({type: "ADD_PET", payload: [response.data]})
            })
            .catch((ex) => {
                dispatch({type: "SET_MESSAGE", payload: ex.response.data});
                dispatch({type: "SET_ISMESSAGE", payload: true});
    
                timeout = setTimeout(function () {
                    dispatch({type: "SET_ISMESSAGE", payload: false});
                }, 3000);
            });

            createPetClick();
        }
    }

    return (
        <section id="constructor" className="section_base padd_b_base">
            {children}
            <h2 className="black_rounded_h">Constructor</h2>
            <div>
                <div className="pet_view_panel">
                    <PetConstructor body={petBody} eyes={petEyes} nose={petNose} mouth={petMouth}></PetConstructor>
                </div>
                <div className="control_panel">
                    <div className="constructor_buttons">
                        <div>
                            <button onClick={() => setCurrentPart(BodyPartTypesEnum.BODIES)}>Bodies</button>
                            <button onClick={() => setCurrentPart(BodyPartTypesEnum.EYES)}>Eyes</button>
                        </div>
                        <div>
                            <button onClick={() => setCurrentPart(BodyPartTypesEnum.NOSES)}>Noses</button>
                            <button onClick={() => setCurrentPart(BodyPartTypesEnum.MOUTHS)}>Mouths</button>
                        </div>
                    </div>
                    <div className="body_parts_grid">
                        {currentPart === undefined &&
                            <div className="fake_item"></div>
                        }
                        {currentPart === BodyPartTypesEnum.BODIES && 
                            <>
                                {
                                    bodies.map((body) =>
                                        <SelectPartButton key={body.id} type={currentPart} size={BodyPartSizesEnum.BODIES} partClick={() => setPetBody(body)} fileName={body.fileName}></SelectPartButton>
                                    )
                                }
                            </>
                        }
                        {currentPart === BodyPartTypesEnum.EYES && 
                            <>
                                {
                                    eyes.map((eyes) =>
                                        <SelectPartButton key={eyes.id} type={currentPart} size={BodyPartSizesEnum.EYES} partClick={() => setPetEyes(eyes)} fileName={eyes.fileName}></SelectPartButton>
                                    )
                                }
                            </>
                        }
                        {currentPart === BodyPartTypesEnum.NOSES && 
                            <>
                                {
                                    noses.map((nose) =>
                                        <SelectPartButton key={nose.id} type={currentPart} size={BodyPartSizesEnum.NOSES} partClick={() => setPetNose(nose)} fileName={nose.fileName}></SelectPartButton>
                                    )
                                }
                                <SelectPartButton partClick={() => setPetNose(undefined)}></SelectPartButton>
                            </>
                        }
                        {currentPart === BodyPartTypesEnum.MOUTHS && 
                            <>
                                {
                                    mouths.map((mouth) =>
                                        <SelectPartButton key={mouth.id} type={currentPart} size={BodyPartSizesEnum.MOUTHS} partClick={() => setPetMouth(mouth)} fileName={mouth.fileName}></SelectPartButton>
                                    )
                                }                                
                            </>
                        }                                                                        
                    </div>
                    <form id="create_pet_form" onSubmit={(e) => createPetSubmit(e)}>
                        {(petName.isDirty && petName.isEmptyError) && <div>Login could not be empty.</div>}
                        {(petName.isDirty && petName.isContainSpaceError) && <div>Login could not contain spaces.</div>}
                        {(petName.isDirty && petName.isMaxLengthError) && <div>Login must be shorter than 50 characters.</div>}
                        <input onChange={(e) => petName.onChange(e)} onBlur={(e) => petName.onBlur(e)} value={petName.value} type="text" id="pet_name_input" placeholder="Pet name..."/>
                        {(isSubmitClicked && petBody === undefined) && <div>Please, select a body.</div>}
                        {(isSubmitClicked && petEyes === undefined) && <div>Please, select an eyes.</div>}
                        {(isSubmitClicked && petMouth === undefined) && <div>Please, select a mouth.</div>}
                        <input onClick={() => setSubmitClicked(true)} disabled={!(petName.isInputValid)} id="create_pet_submit" value="Create" type="submit"/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Constructor;