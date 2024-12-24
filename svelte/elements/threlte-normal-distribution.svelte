<script lang="ts">
    import { Canvas } from "@threlte/core"
    import ThrelteContainer from "../components/ThrelteContainer.svelte";
    import SurfacePlot from "../components/SurfacePlot.svelte";

    const normalDistribution = (x, sigma) => {
        const mu = 0;
        return 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * ((x - mu) / sigma) ** 2);
    }
</script>

<svelte:options customElement="threlte-normal-distribution" />

<ThrelteContainer>
    <Canvas>
        <SurfacePlot 
            func={normalDistribution}
            xAxis={{name: 'x', min: -5, max: 5}}
            yAxis={{name: 'σ', min: 0.5, max: 3}}
            zAxis={{name: 'p(x)', min: -1, max: 1}} 
        />
    </Canvas>
</ThrelteContainer>
