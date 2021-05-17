<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import Text from './components/Text.svelte'
	import Knit from './components/Knit.svelte'
	import FullBlanket from './components/FullBlanket.svelte'
	import Blanket from './components/Blanket.svelte'
	import Footer from './components/common/Footer.svelte'

	export let content;
	export let oval_data;
	// export let oval_data2;

	let oval_data2 = oval_data.map(d => {return {
        // cx:d.order, // time in months
        cx:d.month, // time in months
        // cy:d.index, // subjects ordered
        cy: Math.ceil(d.cx/12), // subjects ordered
        ////building the oval so that the value is the area
        rmajor: d.rmajor, 
        rminor: d.rminor,
        rmajorR: d.rmajorR, 
        rminorR: d.rminorR,
        type:d.type, 
		name:d.lable,  
		value: d.value,
		value2: d.value2,
		year: d.year, 
		month: d.month        
        };}
		);
	let selected = oval_data2.filter(d => d.type === "MH")
	let types = [...new Set(oval_data2.map((d) => d.name))];

	// blanket data transform
	// console.log(selected)
	const uniqify = (array, key) => array.reduce((prev, curr) => prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
    const selectedTopics = uniqify(selected, 'name').map( d => d.name)
  
	
	var i;
    let dataNew = [];
    for (i = 0; i < selectedTopics.length; i++) {
		var innerObj = {};
		innerObj['name'] = selectedTopics[i]
        innerObj['values'] = selected.filter( d=>d.name === selectedTopics[i])
        dataNew.push(innerObj)         
    }
	// console.log(dataNew[0]['values']);
	console.log(selected.filter(d=>d.name === "Addiction"))
	// blanket data check

	console.log("==========")
	console.log(oval_data)
	console.log(oval_data2)

</script>

<main>
	
	{#each content as block}
		{#if block.type === 'head'}
		<Header {...block}/>
		{:else if block.type === 'overview'}
		<ScatterKnots {...block} data={oval_data}/>
		{:else if block.type === 'text'}
		<Text {...block} />
		{:else if block.type === 'chart'}
		<Knit {...block} />
		<!-- <Blanket data={selected}/> -->
		{:else if block.type === 'blanket'}
		<div class = "custom-select"> 
		</div>	
		<FullBlanket data={dataNew}/>
		{:else if block.type === 'footer'}
		<Footer>
			<div slot="about">
				{#each block.about as text}
				{text.p}
				{/each}
			</div>
			<div slot="data">
				{#each block.data as text}
				{text.p}
				{/each}
			</div>
			<div slot="team">
				Núria Altimir, Laura Aragó, Spe Chen and Ànnia Monreal.
			</div>
		</Footer>
		{/if}
	{/each}
</main>

<style>
	main {
		padding: 1em;
		padding-bottom: 0;
		margin: 0 auto;
	}
	section {
		height: 90vh;
	}
</style>