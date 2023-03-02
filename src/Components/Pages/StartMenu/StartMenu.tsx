import React from "react";
import "./StartMenu.css";

interface startMenuProps {
    startClick: () => void
}

const StartMenu : React.FC<startMenuProps> = ({ startClick }) => {   
    return (
        <section id="start_section" className="section_base padd_b_base">
            <h1>Innogotchi</h1>
            <button className="start_button" onClick={startClick}>Start</button>
        </section>
    );
}

export default StartMenu;