import { GuestInfo } from "../../../../Types/Types";
import "./GuestRecord.css";

interface IGuestRecordProps {
    guest: GuestInfo;
    isInvited: boolean;
    buttonClick: (isInvited: boolean, guest: GuestInfo) => void;
}

const GuestRecord: React.FC<IGuestRecordProps> = ({ guest, isInvited, buttonClick }) => {
    return (
        <div className="guest_record">
            <div className="guest_avatar" style={
                    guest.avatarFileName === "ava_default.png" ? {backgroundImage: `url(assets/ava_default.png)`} : {backgroundImage: `url(${guest.avatarFileName})`}
                }>
            </div>
            <div className="guest_text_wrapper">
                <div>
                    <h3>{guest.login}</h3>
                </div>
                {guest.age &&
                    <p>
                        {guest.age} y.o.
                    </p>
                }
                <div className="guest_name">
                    <h4>{guest.name}</h4>
                    <h4>{guest.surname}</h4>
                </div>
            </div>
            <div className="guest_button_wrapper">
                {isInvited ? 
                <button className="invite_guest_button" onClick={() => buttonClick(isInvited, guest)}></button> : 
                <button className="remove_guest_button" onClick={() => buttonClick(isInvited, guest)}></button>}
            </div>
        </div>
    );
}

export default GuestRecord;