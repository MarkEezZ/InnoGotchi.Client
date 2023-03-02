import Pet from '../../Pet/Pet';
import StatsBar from '../../StatsBar/StatsBar';
import { PetForFarm, Stats } from '../../../Types/Types';
import './PetReview.css';
import { useState } from 'react';

type PetReviewProps = {
    children: React.ReactNode,
    pet: PetForFarm
}

const PetReview : React.FC<PetReviewProps> = ({ children, pet }) => {
    const [statsForRecord, setStatsForRecord] = useState<Stats | undefined>();
    const [petForRecord, setPetForRecord] = useState<PetForFarm>(pet);

    function setStats(stats: Stats) {
        setStatsForRecord(stats)
    }

    function setPet(pet: PetForFarm) {
        setPetForRecord(pet);
    }
    return (
        <section id='pet_review' className='section_base'>
            {children}
            <h2 className="black_rounded_h">Pet review</h2>
            <div className='id_data'>
                <h2 className="black_rounded_h">{`Name: ${pet.name}`}</h2>
                <h2 className="black_rounded_h">{`Id: ${pet.id}`}</h2>
                <h2 className="black_rounded_h">{`Age: ${Math.floor((Date.now() - Date.parse(pet.timeOfCreating)) / 86400000)} days`}</h2>
            </div>
            <div className="pet_scope">
                <div className="pet_regular_data">
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
        </section>
    );
}

export default PetReview;