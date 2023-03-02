import PetRecord from './PetRecord/PetRecord';

import { useState, useEffect } from 'react';
import { PetForFarm } from '../../../Types/Types';
import './FarmReview.css';

type FarmReviewProps = {
    children: React.ReactNode,
    petList: PetForFarm[],
    setCurrentPet: (pet: PetForFarm) => void
}

const FarmReview : React.FC<FarmReviewProps> = ({ children, petList, setCurrentPet }) => {
    return (
        <section id='farm_review' className='section_base'>
            {children}
                <h2 className='black_rounded_h'>Farm Review</h2>
                <div id="pet_list_section" className='list_section'>
                    {petList?.map((pet) => <PetRecord key={pet.id} petDto={pet} petRecordClick={() => setCurrentPet(pet)}></PetRecord>)}
                </div>
        </section>
    );
}

export default FarmReview;