<script lang="ts">
    import { DoubleSide, PlaneGeometry, BufferAttribute, Color } from 'three'
    import { DEG2RAD } from 'three/src/math/MathUtils.js'
    import { T } from '@threlte/core'
    import { OrbitControls } from '@threlte/extras'
  import { onMount } from 'svelte'

    interface Props {
        func: (x: number, y: number) => number;
        xMin: number;
        xMax: number;
        yMin: number;
        yMax: number;
        high: number;
        low: number;
    }

    let { func, xMin, xMax, yMin, yMax, high, low }: Props = $props();

    const geometry = new PlaneGeometry(1, 1, 1000, 1000);
    const vertices = geometry.getAttribute('position').array;
    const colors = [];

    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] * (xMax - xMin); 
        const y = vertices[i + 1] * (yMax - yMin);
        vertices[i + 2] = (func(x, y) - low) / (high - low);
        const color = new Color();
        color.setHSL(vertices[i + 2] / 2 + 0.5, 1, 0.5);
        colors.push(color.r, color.g, color.b);
    }

    // needed for lighting
    geometry.computeVertexNormals()
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));
</script>

<T.PerspectiveCamera
    makeDefault
    position.y={2}
    position.z={1}
>
    <OrbitControls
        autoRotate={false}
        enableZoom={false}
        maxPolarAngle={DEG2RAD * 80}
    />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

<T.Mesh
    {geometry}
    rotation.x={DEG2RAD * -90}
    position={[0, -0.5, 0]}
>
    <T.MeshStandardMaterial vertexColors side={DoubleSide} />
</T.Mesh>
