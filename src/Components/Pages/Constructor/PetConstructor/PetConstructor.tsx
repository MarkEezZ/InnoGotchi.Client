import { useEffect } from 'react';
import { BodyFromDbDto, BodyPartFromDbDto } from "../../../../Types/Types";
import "./PetConstructor.css";

interface IPetConstructorProps {
    body: BodyFromDbDto | undefined,
    eyes: BodyPartFromDbDto | undefined,
    nose: BodyPartFromDbDto | undefined,
    mouth: BodyPartFromDbDto | undefined
}

const PetConstructor : React.FC<IPetConstructorProps> = ({ body, eyes, nose, mouth }) => {
    return (
        <div className="pet_body" style={ body !== undefined ? {backgroundImage: `url(assets/bodies/${body.fileName})`} : {backgroundImage: "none"} }>
            <div className="pet_eyes" style={ eyes !== undefined ? {backgroundImage: `url(assets/eyes/${eyes.fileName})`} : {backgroundImage: "none"} }></div>
            <div className="pet_nose" style={ nose !== undefined ? {backgroundImage: `url(assets/noses/${nose.fileName})`} : {backgroundImage: "none"} }></div>
            <div className="pet_mouth" style={ mouth !== undefined ? {backgroundImage: `url(assets/mouths/${mouth.fileName})`} : {backgroundImage: "none"} }></div>
        </div>
    );
}

export default PetConstructor;