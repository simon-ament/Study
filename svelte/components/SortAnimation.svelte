<script lang="ts">
    import { onMount } from "svelte"
    import algoMap from "./sort/algoMap"
    import { type Sort } from "./sort/sort"
    
    interface Props {
        algorithm: string;
    }

    const { algorithm }: Props = $props();

    const timeBetweenFrames = 20; // in ms
    const sortArraySize = 15;
    const canvasPadding = 30;

    let canvas: HTMLCanvasElement;
    let canvas2: HTMLCanvasElement;
    let code: HTMLParagraphElement;
    let buttonContainer: HTMLDivElement;
    let buttons: HTMLButtonElement[] = [];
    let sortAlgorithm: Sort;
    let container: HTMLDivElement;
    let lines: HTMLSpanElement[] = [];

    onMount(() => {
        let slot = container.children[0] as HTMLSlotElement;
        let figure = slot.assignedElements()[0] as HTMLElement;
        let linesCollection = figure.querySelector('code').children as HTMLCollection;
        lines = Array.from(linesCollection) as HTMLSpanElement[];

        buttons = Array.from(buttonContainer.children) as HTMLButtonElement[];
        sortAlgorithm = new algoMap[algorithm](sortArraySize, code, canvas, canvas2, lines, canvasPadding);

        const interval = setInterval(() => {
            sortAlgorithm.sortStep();
        }, timeBetweenFrames);

        return () => {
            clearInterval(interval);
        }
    })

    function onclick(event: MouseEvent) {
        let target = event.target as HTMLButtonElement;
        let ips = parseInt(target.dataset.ips);
        sortAlgorithm.ips = ips;
        for (let button of buttons) {
            button.style.backgroundColor = '';
        }
        target.style.backgroundColor = 'var(--lightgray)';
    }
</script>

<div class="sort-div top">
    <div class="speed-buttons" bind:this={buttonContainer}>
        <button { onclick } data-ips="0">Pause</button>
        <button { onclick } data-ips="1" style="background-color: var(--lightgray)">x1</button>
        <button { onclick } data-ips="2">x2</button>
        <button { onclick } data-ips="5">x5</button>
        <button { onclick } data-ips="10">x10</button>
        <button { onclick } data-ips="20">x20</button>
        <button { onclick } data-ips="50">x50</button>
    </div>

    <canvas bind:this={canvas} class="sort-canvas" width="1000" height="500"></canvas>

    {#if algorithm == 'merge-sort'}
        <canvas bind:this={canvas2} class="sort-canvas" width="1000" height="500"></canvas>
    {/if}
</div>

<div class="sort-div bottom">
    <p bind:this={code} class="sort-code"></p>
</div>

<div bind:this={container}>
    <slot/>
</div>

<style>
.sort-canvas {
    width: 100%;
}

.sort-code {
    font-family: var(--codeFont);
    font-size: .9em;
    padding: .5rem 1rem;
    margin: 0;
}

.sort-code span {
    color: #005CC5;
}

.sort-code span.comment {
    color: #6A737D;
}

.sort-div {
    width: 100%;
    margin-bottom: 0;
    margin-top: 0;
    border: 1px var(--lightgray) solid;
}

.sort-div.top {
    margin-top: 2.25rem;
    border-radius: 5px 5px 0 0;
}

.sort-div.bottom {
    border-radius: 0 0 5px 5px;
    margin-top: -1px;
}

.speed-buttons {
    display: flex;
    margin: 0.5rem;
}

.speed-buttons button {
    background-color: var(--light);
    border: 1px solid var(--lightgray);
    padding: 0.3rem 0.5rem;
}

.speed-buttons button:hover {
    background-color: var(--lightgray);
}

.speed-buttons button:first-child {
    border-radius: 5px 0 0 5px;
}

.speed-buttons button:not(:first-child) {
    border-left: none;
}

.speed-buttons button:last-child {
    border-radius: 0 5px 5px 0;
}
</style>
