<script lang="ts">
    import { Canvas } from "@threlte/core"
    import ThrelteContainer from "../components/ThrelteContainer.svelte";
    import SurfacePlot from "../components/SurfacePlot.svelte";
</script>

<svelte:options customElement="threlte-test" />

<ThrelteContainer>
    <Canvas>
        <SurfacePlot 
            func={(x, y) => Math.sin(Math.sqrt(x**2 + y**2))}
            xAxis={{name: 'x', min: 0, max: 10}}
            yAxis={{name: 'y', min: 0, max: 10}}
            zAxis={{name: 'z', min: -1, max: 1}} 
        />
    </Canvas>
</ThrelteContainer>
