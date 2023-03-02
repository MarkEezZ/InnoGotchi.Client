import { useState } from "react";
import "./GameButton.css";

type GameButtonPropsType = {
    className: string,
    text?: string
    isDisabled?: boolean | undefined;
    onClick: () => void;
}

const GameButton = (props: GameButtonPropsType) => {

    let {className, text, isDisabled, onClick} = props;

    return (
        <button className={`game_button ${className}`} onClick={onClick} disabled={isDisabled}>{text}</button>
    );
}

export default GameButton;