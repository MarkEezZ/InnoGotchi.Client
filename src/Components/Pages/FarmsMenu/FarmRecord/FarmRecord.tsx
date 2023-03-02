import { useDispatch } from 'react-redux';
import { FarmRecordDto } from '../../../../Types/Types';
import './FarmRecord.css';

interface FarmRecordProps {
    farmRecord: FarmRecordDto;
    isOwner: boolean;
    farmClick: () => void;
}

const FarmRecord : React.FC<FarmRecordProps> = ({ farmRecord, farmClick, isOwner }) => {
    const dispatch = useDispatch();

    const setCurrentFarm = () => {
        dispatch({type: "SET_FARM", payload: farmRecord});
        dispatch({type: "SET_ISOWNER", payload: isOwner})
        farmClick();
    }

    return (
        <button className='farm_record_button' onClick={() => setCurrentFarm()}>
            <div>
                <div className='farm_icon'></div>
                <div className='owner_block'>
                    <h3>Farm:</h3>
                    <p>{farmRecord.farmName}</p>
                </div>
            </div>
            <div>
                <div className='user_icon'></div>
                <div className='owner_block'>
                    <h3>Owner:</h3>
                    <p>{farmRecord.farmOwnerLogin}</p>
                </div>
            </div>
        </button>
    );
}

export default FarmRecord;