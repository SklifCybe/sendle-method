import type { Interface } from 'readline/promises';

export const setChoice = async (commandLineInterface: Interface): Promise<1 | 2> => {
    console.log('Выберите вариант работы программы.');
    console.log('1. Работа через терминал');
    console.log('2. Работа через файлы');

    const choiceString = await commandLineInterface.question('Ваш выбор: ');
    const choice = Number(choiceString);

    if (Number.isNaN(choice) || (choice !== 1 && choice !== 2)) {
        throw new Error('Введите корректную цифру. 1 или 2');
    }

    return choice;
};
