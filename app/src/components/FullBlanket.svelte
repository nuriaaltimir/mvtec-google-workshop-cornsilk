<script>
    import Blanket from './Blanket.svelte'
    export let data;
    let repetition = [...Array(20).keys()]

</script>

<div class=full>
    <Blanket {data} />
</div>