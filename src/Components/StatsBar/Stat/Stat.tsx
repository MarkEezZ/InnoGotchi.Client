import { useEffect } from 'react';
import "./Stat.css";

interface IStatProps {
    color: string,
    length: number,
}

const Stat: React.FC<IStatProps> = ({color, length}) => {
    useEffect(() => {}, [length]);
    return (
        <div className="stat_solo" style={{backgroundColor: `${color}`, width: `${length}%`}}></div>
    );
}

export default Stat;