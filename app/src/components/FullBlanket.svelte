<script>
    import Blanket from './Blanket.svelte'
    export let data;
    let repetition = [...Array(data.length).keys()]

    // const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
    // const selectedTopics = uniqify(data, 'name').map( d => d.name)
    // console.log(selectedTopics[0])
    // console.log(data.filter( d=>d.name === selectedTopics[0]))

</script>

<div class=full>
    {#each repetition as i}
        <!-- {t} -->
        <Blanket data={data[i]['value']}/>
    {/each}
</div>