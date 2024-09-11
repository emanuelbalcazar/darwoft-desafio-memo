export default function getLevelDifficulty(level) {
    const levels = {
        veryEasy: 2,
        easy: 4,
        normal: 6,
        hard: 8
    };

    return levels[level];
}