<script lang="ts">
    /* imports */
    import { DoubleSide, PlaneGeometry, BufferAttribute, Color, PerspectiveCamera } from 'three'
    import { DEG2RAD } from 'three/src/math/MathUtils.js'
    import { T } from '@threlte/core'
    import { OrbitControls, Grid, Text, Suspense } from '@threlte/extras'
    import { type TextMesh } from '@threlte/extras/dist/components/Text/types'

    /* props */
    interface Axis {
        name: string;
        min: number;
        max: number;
    }

    interface Props {
        func: (x: number, y: number) => number;
        xAxis: Axis;
        yAxis: Axis;
        zAxis: Axis;
    }

    let { func, xAxis, yAxis, zAxis }: Props = $props(); // zAxis is pointing upwards

    /* state */
    let texts: TextMesh[] = $state([]);
    let camera: PerspectiveCamera = $state();

    /* geometry */
    const geometry = new PlaneGeometry(1, 1, 1000, 1000);
    const vertices = geometry.getAttribute('position').array;
    const colors = [];
    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] * (xAxis.max - xAxis.min); 
        const y = vertices[i + 1] * (yAxis.max - yAxis.min);
        vertices[i + 2] = (func(x, y) - zAxis.min) / (zAxis.max - zAxis.min);
        const color = new Color();
        color.setHSL(vertices[i + 2] / 2 + 0.5, 1, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));

    geometry.computeVertexNormals() // needed for lighting

    /* components */
    const gridComponents: {
        position: [x: number, y: number, z: number],
        plane: 'xy' | 'xz' | 'zy'
    }[] = [
        { position: [0, 0, -0.5], plane: 'xy' },
        { position: [0, -0.5, 0], plane: 'xz' },
        { position: [-0.5, 0, 0], plane: 'zy' }
    ];

    const textComponents : {
        text: string;
        position: [x: number, y: number, z: number];
    }[] = [
        { text: `${xAxis.name}: [${xAxis.min}, ${xAxis.max}]`, position: [0.5, 0.6, -0.5] },
        { text: `${yAxis.name}: [${yAxis.min}, ${yAxis.max}]`, position: [-0.5, 0.6, 0.5] },
        { text: `${zAxis.name}: [${zAxis.min}, ${zAxis.max}]`, position: [-0.5, 0.6, -0.5] }
    ];
</script>

<!-- camera -->
<T.PerspectiveCamera
    bind:ref={camera}
    makeDefault
    position.y={1.4}
    position.z={1.4}
>
    <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-1}
        enableZoom={false}
        maxPolarAngle={DEG2RAD * 80}
        onchange={() => {
            texts.forEach(text => text.lookAt(camera.position));
        }}
    />
</T.PerspectiveCamera>

<!-- lights -->
<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<!-- surface plot -->
<T.Mesh
    {geometry}
    rotation.x={DEG2RAD * -90}
    position={[0, -0.5, 0]}
>
    <T.MeshStandardMaterial vertexColors side={DoubleSide} />
</T.Mesh>

<!-- grids -->
{#each gridComponents as { position, plane }}
    <Grid 
        position={position}
        cellSize={0.1}
        gridSize={[1, 1]}
        plane={plane}
        sectionColor={0x000000}
        sectionThickness={0}
    />
{/each}

<!-- texts -->
<Suspense>
    {#each textComponents as { text, position }, i}
        <Text
            bind:ref={texts[i]}
            text={text}
            fontSize={0.075}
            characters="0123456789.[]:"
            color={0x000000}
            position={position}
            anchorX="center"
            anchorY="middle"
            font={"/static/KaTeX_Main-Regular.ttf"}
        />
    {/each}
  
    <svelte:fragment slot="fallback">
        <!-- show fallback content while font data is loading -->
    </svelte:fragment>
</Suspense>
