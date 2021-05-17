<script>
    import Blanket from './Blanket.svelte'
    export let data;
    let repetition = [...Array(5).keys()]

    const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
    const selectedTopics = uniqify(data, 'name').map( d => d.name)
    // console.log(selectedTopics[0])
    // console.log(data.filter( d=>d.name === selectedTopics[0]))

    // var i;
    // let dataNew = [];
    // for (i = 0; i < selectedTopics.length; i++) {
    //     var innerObj = {};
    //     innerObj[selectedTopics[i]] = data.filter( d=>d.name === selectedTopics[i])
    //     dataNew.push(innerObj)         
    // }
    // console.log("full---")
    // console.log(dataNew["Depression"]);
    console.log(selectedTopics)
</script>

<div class=full>
    {#each selectedTopics as t, i}
        {t}
        <Blanket data={data[i]['values']}/>
        <!-- {data[i]['name']} -->
    {/each}
</div>