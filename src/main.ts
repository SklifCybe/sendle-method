import path from 'path';
import readline from 'readline/promises';

import { setChoice } from './modules/set-choice.js';
import { seidelSolve } from './modules/seidel-solve.js';
import { setTolerance } from './modules/set-tolerance.js';
import { setMatrixSize } from './modules/set-matrix-size.js';

const main = async (): Promise<void> => {
    process.stdout.write('\u001b[2J\u001b[0;0H');

    const commandLineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false,
    });
    const outputFilepath = path.join(path.resolve(), 'output.txt');

    console.log('Приложение для решения систем линейных уравнений методом Зейделя');

    const choice = await setChoice(commandLineInterface);
    const matrixSize = await setMatrixSize(commandLineInterface);
    const tolerance = await setTolerance(commandLineInterface);

    if (choice === 1) {
        console.log('Вы выбрали - "Работу через терминал"');

        await seidelSolve({ variant: 'terminal', commandLineInterface, matrixSize, tolerance, outputFilepath });
    }
    if (choice === 2) {
        console.log('Вы выбрали - "Работу через файл"');

        const inputFilepath = path.join(path.resolve(), 'input.txt');

        await seidelSolve({
            variant: 'file',
            commandLineInterface,
            matrixSize,
            tolerance,
            inputFilepath,
            outputFilepath,
        });
    }

    commandLineInterface.close();
};

try {
    await main();

    process.exit(0);
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
    process.exit(1);
}
