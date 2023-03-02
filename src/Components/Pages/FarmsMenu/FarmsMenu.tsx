import FarmRecord from "./FarmRecord/FarmRecord";
import CreateFarmMenu from "./CreateFarmMenu/CreateFarmMenu";
import BackButton from "../../Buttons/BackButton/BackButton";
import React, { useEffect, useState } from "react";
import "./FarmsMenu.css";
import { FarmRecordDto } from "../../../Types/Types";
import api from "../../../Api";
import { useDispatch } from "react-redux";

interface FarmsMenuProps {
    children: React.ReactNode;
    farmClick: () => void;
}

const FarmsMenu : React.FC<FarmsMenuProps> = ({ children, farmClick }) => {
    const [isOpenedCreateFarm, setOpenedCreateFarm] = useState<boolean>(false);
    const [ownFarm, setOwnFarm] = useState<FarmRecordDto | undefined>();
    const [guestFarms, setGuestFarms] = useState<FarmRecordDto[]>([]);
    let timeout: NodeJS.Timeout;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = "https://localhost:5177/innogotchi/farms/own-farm";
        api.get(url)
        .then((response) => {
            setOwnFarm(response.data);
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }, [])

    function GuestFarmsClick() {
        clearTimeout(timeout);
        dispatch({type: "SET_ISMESSAGE", payload: false});

        let url = "https://localhost:5177/innogotchi/farms/guest-farms";
        api.get(url)
        .then((response) => {
            setGuestFarms(response.data);
        })
        .catch((ex) => {
            dispatch({type: "SET_MESSAGE", payload: ex.response.data});
            dispatch({type: "SET_ISMESSAGE", payload: true});

            timeout = setTimeout(function () {
                dispatch({type: "SET_ISMESSAGE", payload: false});
            }, 3000);
        });
    }

    function createFarmClick(farmToRecord: FarmRecordDto) {
        setOwnFarm(farmToRecord);
    }

    return (
        <section id="farms_section">
            {isOpenedCreateFarm && 
                <CreateFarmMenu closeCreateMenu={() => setOpenedCreateFarm(false)} setOwnFarm={createFarmClick}>
                    <BackButton backClick={() => setOpenedCreateFarm(false)}></BackButton>
                </CreateFarmMenu>
            }
            <div>
                <h2>Own Farm</h2>
                <button disabled={!(ownFarm === undefined)} className="farm_button" id="create_farm_button" onClick={() => setOpenedCreateFarm(true)}>Create Farm</button>
                <div className="list_section">
                    {ownFarm && <FarmRecord farmRecord={ownFarm} farmClick={farmClick} isOwner={true}></FarmRecord>}
                </div>
            </div>
            <div>
                <h2>Guest Farms</h2>
                <button className="farm_button" id="view_guest_farms_button" onClick={GuestFarmsClick}>View Guest Farms</button>
                <div className="list_section">
                    {guestFarms.map((record) =>
                        <FarmRecord key={record.farmName + "_" + record.farmOwnerLogin} farmRecord={record} farmClick={farmClick} isOwner={false}></FarmRecord>
                    )}
                </div>
            </div>
            {!isOpenedCreateFarm && children}
        </section>
    );
}

export default FarmsMenu;