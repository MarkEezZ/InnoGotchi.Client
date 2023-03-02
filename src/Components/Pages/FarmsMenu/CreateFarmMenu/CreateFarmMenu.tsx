import React, { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../../../Api";
import useInput from "../../../../CustomHooks/UseInput";
import { FarmRecordDto, FarmToCreate } from "../../../../Types/Types";
import "./CreateFarmMenu.css";

interface CreateFarmMenuProps {
    children: React.ReactNode;
    closeCreateMenu: () => void;
    setOwnFarm:(farmToRecord: FarmRecordDto) => void;
}

const CreateFarmMenu : React.FC<CreateFarmMenuProps> = ({ children, closeCreateMenu, setOwnFarm }) => {
    const farmName = useInput("", {isEmpty: true, isContainSpaces: false, maxLength: 50});
    const dispatch = useDispatch();
    let timeout: NodeJS.Timeout;

    async function farmSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        clearTimeout(timeout)
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let farmData: FarmToCreate = {
            name: farmName.value
        }

        let url = "https://localhost:5177/innogotchi/farms/create";
        api.post(url, farmData)
        .then((response) => {
            setOwnFarm(response.data);
            closeCreateMenu();
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
        <section id="create_farm_section" className="section_base">
            {children}
            <form id="create_farm_form" onSubmit={(e) => farmSubmit(e)}>
                <h2>Create Farm</h2>
                <div>
                    {(farmName.isDirty && farmName.isEmptyError) && <div>Farm name could not be empty.</div>}
                    {(farmName.isDirty && farmName.isContainSpaceError) && <div>Farm name could not contain spaces.</div>}
                    {(farmName.isDirty && farmName.isMaxLengthError) && <div>Farm name must be shorter than 50 characters.</div>}
                    <input onChange={(e) => farmName.onChange(e)} onBlur={(e) => farmName.onBlur(e)} value={farmName.value!} type="text" id="farm_name_input" placeholder="Enter a farm name..."/>
                </div>
                <input disabled={!farmName.isInputValid} type="submit" value="Create" id="create_farm_submit"/>
            </form>
        </section>
    );
}

export default CreateFarmMenu;