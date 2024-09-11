// Convert seconds to minutes and seconds
const formatTimeSecondsToMinutes = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default formatTimeSecondsToMinutes;