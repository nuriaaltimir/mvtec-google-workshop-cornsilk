<script>
    import Blanket from './Blanket.svelte'
    export let data;
    // let repetition = [...Array(data.length).keys()]
    $: console.log(data)
</script>

<div class=fullblanket-container>
        {#each data as d}
            <Blanket data={d[1]} topic={d[0]}/>
        {/each}
 
    <!-- {#if repetition.length > 0}
        {#each repetition as i}
            <Blanket data={data[i]} topic={data[i][0]['name']}/>
        {/each}
    {:else}
    <div>
        Please select topics!
    </div>
    {/if} -->
</div>