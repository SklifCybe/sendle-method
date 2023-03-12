import type { Interface } from 'readline/promises';

export const setTolerance = async (commandLineInterface: Interface): Promise<number> => {
    const toleranceString = await commandLineInterface.question('Введите точность вычислений: ');
    const tolerance = Number(toleranceString);

    if (Number.isNaN(tolerance) || tolerance > 1) {
        throw new Error('Введена неверная точность. Попробуйте использоваться число меньше 1');
    }

    return tolerance;
};
