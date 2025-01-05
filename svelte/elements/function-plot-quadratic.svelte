<script lang="ts">
    import Container from "../components/Container.svelte";
    import FunctionPlot from "../components/FunctionPlot.svelte";
</script>

<svelte:options customElement="function-plot-quadratic" />

<Container>
    <FunctionPlot
        func="x^2"
        xAxis={{name: 'x', min: -10, max: 10}}
        yAxis={{name: 'y', min: -10, max: 10}}
        id="quadratic"
    />
</Container>
