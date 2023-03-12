export const diagonal = (matrix: number[][], size: number): boolean => {
    let flag = true;
    let sum = 0;

    for (let i = 0; i < size; i++) {
        sum = 0;

        for (let j = 0; j < size; j++) {
            sum += Math.abs(matrix[i][j]);
        }

        sum -= Math.abs(matrix[i][i]);

        if (sum > matrix[i][i]) {
            flag = false;

            console.log(`${matrix[i][i]} < ${sum}`);
        } else {
            console.log(`${matrix[i][i]} > ${sum}`);
        }
    }

    return flag;
};
