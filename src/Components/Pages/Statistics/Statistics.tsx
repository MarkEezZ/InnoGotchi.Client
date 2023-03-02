import { StatisticsDto } from "../../../Types/Types";
import { useState, useEffect } from "react";
import "./Statistics.css";

type StatisticsProps = {
    children: React.ReactNode,
}

const Statistics : React.FC<StatisticsProps> = ({ children }) => {
    const statisticsBase: StatisticsDto = {
        AlivePetsCount: 5,
        DeadPetsCount: 2,
        AverageFeedingPeriod: 0,
        AverageThirstPeriod: 0,
        AverageHappinessPeriod: 0,
        AverageAge: 0
    }
    const [statistics, setStatistics] = useState<StatisticsDto>(statisticsBase);

    useEffect(() => {
        let pie_chart = document.getElementById("pie_chart") as HTMLCanvasElement;
        let ctx = pie_chart!.getContext('2d');

        let pie_chart_rect = pie_chart.getBoundingClientRect();

        let x = Math.round(pie_chart_rect.width / 2);
        let y = Math.round(pie_chart_rect.height / 2);
        let r = Math.round(pie_chart_rect.width / 2);
        
        let start_point = 0;
        let end_point = Math.PI * 2;
        let intersection = Math.round((360 / (statistics.AlivePetsCount + statistics.DeadPetsCount)) * statistics.AlivePetsCount) * Math.PI / 180;

        ctx!.clearRect(0, 0, pie_chart_rect.width, pie_chart_rect.height);
        ctx!.setLineDash([6, 3]);
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = "black";

        ctx!.beginPath();
        ctx!.fillStyle = "rgb(33, 154, 224)";
        ctx!.moveTo(x, y);
        ctx!.lineTo(x, y);
        ctx!.arc(x, y, r - 5, start_point, intersection);
        ctx!.lineTo(x, y);
        ctx!.fill();
        ctx!.closePath();

        ctx!.beginPath();
        ctx!.fillStyle = "rgb(60, 66, 68)";
        ctx!.moveTo(x, y);
        ctx!.lineTo(x, y);
        ctx!.arc(x, y, r - 5, intersection, end_point);
        ctx!.lineTo(x, y);
        ctx!.fill();
        ctx!.closePath();

        ctx!.beginPath();
        ctx!.arc(x, y, r - 5, start_point, end_point);
        ctx!.stroke();
        ctx!.closePath();
    }, []);

    return (
        <section id="statistics_section" className="section_base padd_b_base">
            {children}
            <h2 className="black_rounded_h">Farm statistics</h2>
            <div>
                <article>
                    <div>
                        <h3>Alive pets count:</h3>
                        <h3>Dead pets count: </h3>
                        <h3>Average feeding period: </h3>
                        <h3>Average thirst period:</h3>
                        <h3>Average happiness period:</h3>
                        <h3>Average age:</h3>
                    </div>
                    <div>
                        <p>{statistics?.AlivePetsCount}</p>
                        <p>{statistics?.DeadPetsCount}</p>
                        <p>{statistics?.AverageFeedingPeriod}</p>
                        <p>{statistics?.AverageThirstPeriod}</p>
                        <p>{statistics?.AverageHappinessPeriod}</p>
                        <p>{statistics?.AverageAge}</p>
                    </div>
                </article>
                <div>
                    <h3 className="pie_chart_h3">Life pie chart:</h3>
                    <div className="pointer">
                        <div>
                            <div className="color_2"></div>
                            <p> - dead pets</p>
                        </div>
                        <div>
                            <div className="color_1"></div>
                            <p> - alive pets</p>
                        </div>
                    </div>
                    <canvas id="pie_chart" width="340" height="340"></canvas>
                </div>
            </div>
        </section>
    );
}

export default Statistics;