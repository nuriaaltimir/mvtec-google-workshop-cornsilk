<script>
    import Blanket from './Blanket.svelte'
    //import BlanketAll from './BlanketAll.svelte'

    export let data;
    let repetition = [...Array(data.length).keys()]
    // let allTopicsArray = [...Array(50).keys()]
    // const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
    // const selectedTopics = uniqify(data, 'name').map( d => d.name)
    // console.log(selectedTopics[0])
    // console.log(data.filter( d=>d.name === selectedTopics[0]))
    $: console.log('data in full blanket------')
    $: console.log(data[0])
    console.log(repetition);
    
</script>

<div class=fullblanket-container>
    {#each repetition as i}
        <Blanket data={data[i]} topic={data[i][0]['name']}/>
    {/each} 
    <!-- {#if data.length === 61}
        {#each repetition as i}
            <Blanket data={data[0][i]['value']}/>
        {/each}
    {:else}
        {#each repetition as i}
            <Blanket data={data[i]} topic={data[i][0]['name']}/>
        {/each} 
    {/if} -->

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