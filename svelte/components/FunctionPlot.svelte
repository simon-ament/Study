<script lang="ts">
    import functionPlot from 'function-plot';
    import { type Axis } from '../types';

    interface Props {
        func: string;
        xAxis: Axis;
        yAxis: Axis;
        id: string;
    }

    const { func, xAxis, yAxis, id }: Props = $props();

    let span: HTMLSpanElement;

    $effect(() => {
        functionPlot({
            target: span,
            width: 400,
            height: 400,
            grid: true,
            data: [{
                fn: func,
                range: [xAxis.min, xAxis.max],
                /*sampler: 'builtIn',
                graphType: 'polyline'*/
            }],
            xAxis: {
                label: xAxis.name,
                domain: [xAxis.min, xAxis.max]
            },
            yAxis: {
                label: yAxis.name,
                domain: [yAxis.min, yAxis.max]
            }
        })
        console.log('FunctionPlot rendered')
    })
</script>

<span id={id} bind:this={span}></span>
