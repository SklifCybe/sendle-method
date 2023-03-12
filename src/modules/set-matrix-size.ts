import type { Interface } from 'readline/promises';

export const setMatrixSize = async (commandLineInterface: Interface): Promise<number> => {
    const sizeString = await commandLineInterface.question('Введите размер матрицы: ');
    const size = Number(sizeString);

    if (Number.isNaN(size) || size <= 1) {
        throw new Error('Введёт неверный размер матрицы. Попробуйте использоваться положительные числа');
    }

    return size;
};
