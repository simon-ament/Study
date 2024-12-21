<script lang="ts">
    import { Canvas } from "@threlte/core"
    import ThrelteContainer from "../components/ThrelteContainer.svelte";
    import SurfacePlot from "../components/SurfacePlot.svelte";
</script>

<svelte:options customElement="threlte-test" />

<ThrelteContainer>
    <Canvas>
        <SurfacePlot func={(x, y) => Math.sin(Math.sqrt(x**2 + y**2))} xMin={0} xMax={10} yMin={0} yMax={10} high={1} low={-1} />
    </Canvas>
</ThrelteContainer>
