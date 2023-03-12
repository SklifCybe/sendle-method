import fs from 'fs/promises';
import path from 'path';

import { okr } from '../utils/okr.js';
import { diagonal } from '../utils/diagonal.js';
import { converge } from '../utils/converge.js';

import type { Interface } from 'readline/promises';

type Parameters =
    | {
          variant: 'terminal';
          commandLineInterface: Interface;
          matrixSize: number;
          tolerance: number;
          outputFilepath: string;
      }
    | {
          variant: 'file';
          commandLineInterface: Interface;
          inputFilepath: string;
          outputFilepath: string;
          matrixSize: number;
          tolerance: number;
      };

export const seidelSolve = async (params: Parameters) => {
    const { variant, matrixSize, tolerance } = params;

    let iterationCounter = 0;

    const matrix: number[][] = Array.from(Array(matrixSize), () => new Array(matrixSize));
    let vector: number[] = [];

    if (variant === 'terminal') {
        const { commandLineInterface } = params;

        console.log('Заполните матрицу: ');

        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                const answer = await commandLineInterface.question(`A[${i}][${j}] = `);
                matrix[i][j] = Number(answer);
            }
        }

        console.log('Ваша матрица: \n');
        for (let i = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++) {
                process.stdout.write(`${matrix[i][j]} `);
            }
            console.log('\n');
        }

        console.log('Заполните столбец свободных членов: ');

        for (let i = 0; i < matrixSize; i++) {
            const answer = await commandLineInterface.question(`B[${i + 1}] = `);

            vector.push(Number(answer));
        }
    } else {
        const { inputFilepath, commandLineInterface } = params;

        const inputFilename = path.basename(inputFilepath);

        console.log(
            `Заполните файл ${inputFilename}. Значения матрицу нужно вводить через пробел, затем нужно поставить знак запятой и ввести значения вектора`,
        );

        const answer = await commandLineInterface.question('Когда заполните файл. Введите yes: ');

        if (answer !== 'yes') {
            throw new Error('Ошибка подтверждения ввода в файл. Попробуйте ввести yes.');
        }

        const fileData = await fs.readFile(inputFilepath, 'utf-8');

        const [matrixString, vectorString] = fileData.split(',');

        const matrixSingle = matrixString.trim().split(' ').map(Number);
        vector = vectorString.trim().split(' ').map(Number);

        for (let i = 0, count = 0; i < matrixSize; i++) {
            for (let j = 0; j < matrixSize; j++, count++) {
                matrix[i][j] = matrixSingle[count];
            }
        }
    }

    const currentResult = Array(matrixSize).fill(1);
    const previousResult: number[] = [];

    console.log('Диагональное преобладание: ');

    if (diagonal(matrix, matrixSize)) {
        do {
            for (let i = 0; i < matrixSize; i++) {
                previousResult[i] = currentResult[i];
            }

            for (let i = 0; i < matrixSize; i++) {
                let temp = 0;

                for (let j = 0; j < matrixSize; j++) {
                    if (j !== i) {
                        temp += matrix[i][j] * currentResult[j];
                    }
                }

                currentResult[i] = (vector[i] - temp) / matrix[i][i];
            }

            iterationCounter++;
        } while (!converge(currentResult, previousResult, matrixSize, tolerance));

        let resultString = `Решение системы:\n`;

        for (let i = 0; i < matrixSize; i++) {
            resultString += `x${i} = ${okr(currentResult[i], tolerance)}\n`;
        }

        resultString += `Итераций: ${iterationCounter}`;

        console.log(resultString);
        await fs.writeFile(params.outputFilepath, resultString, 'utf-8');
    } else {
        throw new Error('Не выполняется преобладание диагоналей');
    }
};
