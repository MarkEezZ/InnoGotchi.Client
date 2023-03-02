import { useState, useEffect} from "react";
import { BodyPartTypesEnum } from "../../../../Enums/Enums";
import "./SelectPartButton.css";

interface ISelectPartButtonProps {
    fileName?: string;
    partClick: () => void;
    type?: string;
    size?: number;
}

const SelectPartButton : React.FC<ISelectPartButtonProps> = ({ partClick, fileName, type, size }) => {

    return (
        <button onClick={partClick} className="item">
            {fileName !== undefined ?
                <img src={`assets/${type}/${fileName}`} alt="body_part" style={{height: `${size}vw`}}/> :
                <div className="no_nose">No nose</div>
            }
        </button>
    );
}

export default SelectPartButton