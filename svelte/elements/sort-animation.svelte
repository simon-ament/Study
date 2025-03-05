<svelte:options customElement={{
    tag: 'sort-animation',
    props: {
        algorithm: {type: 'String'},
    }
}} />

<script lang="ts">
    import SortAnimation from "../components/SortAnimation.svelte";

    let { algorithm } = $props();
</script>

<SortAnimation {algorithm}>
    <slot />
</SortAnimation>
