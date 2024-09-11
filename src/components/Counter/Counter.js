import { useEffect } from "react"
import formatTimeSecondsToMinutes from "../../utils/FormatTime";

export default function Counter({ seconds, setSeconds, isActive }) {
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    return (
        <div>
            Tiempo transcurrido: {formatTimeSecondsToMinutes(seconds)}
        </div>
    )
}