export const converge = (xk: number[], xkp: number[], size: number, tolerance: number): boolean => {
    let norm = 0;

    for (let i = 0; i < size; i++) {
        norm += (xk[i] - xkp[i]) * (xk[i] - xkp[i]);
    }

    return Math.sqrt(norm) < tolerance;
};
