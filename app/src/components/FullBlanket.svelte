<script>
    import Blanket from './Blanket.svelte'
    export let data;
    let repetition = [...Array(data.length).keys()]

    // const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
    // const selectedTopics = uniqify(data, 'name').map( d => d.name)
    // console.log(selectedTopics[0])
    // console.log(data.filter( d=>d.name === selectedTopics[0]))
    $: console.log(data)
</script>

<div class=fullblanket-container>
        {#each repetition as i}
            <Blanket data={data[i]} topic={data[i][0]['name']}/>
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