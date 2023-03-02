import "./BackButton.css";

interface IBackButtonProps {
    backClick: () => void;
}

const BackButton : React.FC<IBackButtonProps> = ({ backClick }) => {
    return (
        <button className="back_button" onClick={backClick}></button>
    );
}

export default BackButton;