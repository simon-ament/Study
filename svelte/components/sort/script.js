/* animation controls */
const timeBetweenFrames = 20; // in ms
const sortArraySize = 15;
const canvasPadding = 30;
const sortAlgorithms = []
/* ------------------ */

const nextFrame = () => {
    for (let sort of sortAlgorithms) {
        sort.sortStep();
    }

    setTimeout(() => {
        nextFrame()
    }, timeBetweenFrames);
}

nextFrame();

document.addEventListener("nav", () => {
    sortAlgorithms.length = 0;

    if (checkId('selection-sort-code') && checkId('selection-sort-canvas')) {
        sortAlgorithms.push(new SelectionSort(sortArraySize, 'selection-sort-code', 'selection-sort-canvas'));
    }

    if (checkId('insertion-sort-code') && checkId('insertion-sort-canvas')) {
        sortAlgorithms.push(new InsertionSort(sortArraySize, 'insertion-sort-code', 'insertion-sort-canvas'));
    }

    if (checkId('bubble-sort-code') && checkId('bubble-sort-canvas')) {
        sortAlgorithms.push(new BubbleSort(sortArraySize, 'bubble-sort-code', 'bubble-sort-canvas'));
    }

    if (checkId('shell-sort-code') && checkId('shell-sort-canvas')) {
        sortAlgorithms.push(new ShellSort(sortArraySize, 'shell-sort-code', 'shell-sort-canvas'));
    }

    if (checkId('merge-sort-code') && checkId('merge-sort-canvas')) {
        sortAlgorithms.push(new MergeSort(sortArraySize, 'merge-sort-code', 'merge-sort-canvas', 'merge-sort-canvas-2'));
    }

    if (checkId('quick-sort-code') && checkId('quick-sort-canvas')) {
        sortAlgorithms.push(new QuickSort(sortArraySize, 'quick-sort-code', 'quick-sort-canvas'));
    }
})

const checkId = (id) => {
    const el = document.getElementById(id);
    return el !== null;
}
