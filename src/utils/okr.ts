export const okr = (x: number, tolerance: number): number => {
    let i = 0;
    let newTolerance = tolerance;

    while (newTolerance < 1) {
        i++;
        newTolerance *= 10;
    }

    const okr = Math.pow(10, i);
    const result = (x * okr + 0.5) / okr;

    return result;
};
