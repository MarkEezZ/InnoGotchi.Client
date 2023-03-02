import Pet from "../../../Pet/Pet";
import StatsBar from "../../../StatsBar/StatsBar";

import { PetForFarm, Stats } from "../../../../Types/Types";
import "./PetRecord.css";
import { useState } from "react";

interface PetRecordProps {
    petDto: PetForFarm,
    petRecordClick: () => void
}

const PetRecord : React.FC<PetRecordProps> = ({ petDto, petRecordClick }) => {
    const [statsForRecord, setStatsForRecord] = useState<Stats | undefined>();
    const [petForRecord, setPetForRecord] = useState<PetForFarm>(petDto);

    function setStats(stats: Stats) {
        setStatsForRecord(stats)
    }

    function setPet(pet: PetForFarm) {
        setPetForRecord(pet);
    }

    return (
        <div className='pet_record_button' onClick={petRecordClick}>
            <div className="pet_scope">
                <div className="pet_regular_data">
                    <h2 className="black_rounded_h">{petDto.name}</h2>
                    <div className="pet_view_panel_st">
                        <Pet petDto={petForRecord} showButton={false} setStatsForRecord={setStats} setPetForRecord={setPet}></Pet>
                    </div>
                </div>
                <div className="pet_regular_stats">
                    <div className="stats_text">
                        <p>Hunger:</p>
                        <p>Thirst:</p>
                        <p>Health:</p>
                        <p>Mood:</p>
                    </div>
                    <div className="pet_stats">
                        {statsForRecord && <StatsBar pet={petForRecord} stats={statsForRecord} setPetForRecord={setPet}></StatsBar>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetRecord;