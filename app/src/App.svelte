<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import ScatterKnots_Mobile from './components/ScatterKnots_Mobile.svelte'
	import Text from './components/Text.svelte'
	import Texth1 from './components/Texth1.svelte'
	import FirstChart from './components/Ai2HTML.svelte'
	import Knit from './components/Knit.svelte'
	import FullBlanket from './components/FullBlanket.svelte'
	import Blanket from './components/Blanket.svelte'
	import Footer from './components/common/Footer.svelte'
	import { Select, MaterialApp } from 'svelte-materialify';

	export let content;
	export let oval_data;
	export let oval_data2;
	export let oval_dataMbl;


	oval_data2 = oval_data.map(d => {
		return {
      // cx:d.order, // time in months
      cx:d.month, // time in months
      // cy:d.index, // subjects ordered
      cy: Math.ceil(d.cx/12), // subjects ordered
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
    };
	});

	console.log('compute min max for blanket data---------')
	console.log(oval_data2.sort((a,b)=>b.rminor-a.rminor)[0].rminor)
	console.log(oval_data2.sort((a,b)=>b.rminor-a.rminor)[oval_data2.length-1].rminor)
	console.log(oval_data2.sort((a,b)=>b.rminorR-a.rminorR)[0].rminorR)
	console.log(oval_data2.sort((a,b)=>b.rminorR-a.rminorR)[oval_data2.length-1].rminorR)

	let topics = [...new Set(oval_data2.map((d) => d.name))];
	var i;
  let dataNew = [];
  for (i = 0; i < topics.length; i++) {
		var innerObj = {};
		innerObj['name'] = topics[i]
    innerObj['value'] = oval_data2.filter( d=>d.name === topics[i])
    dataNew.push(innerObj)
	}
	// let dataNew2 = [];
    // for (i = 0; i < topics.length; i++) {
    //     dataNew2.push(oval_data2.filter(d=>d.name === topics[i]))
	// }
	// dataNew = [{name:'All topics', value: [dataNew[0].value]}, ...dataNew]

	// dataMap = dataNew.reduce((acc,d) => {
	// 	acc[d.name]
	// 	return acc;
	// }, {})

	$:console.log('DATA NEW', dataNew)

	let value = ['All topics']; // dataNew.map(d => d.name); // [dataNew[0].name, dataNew[1].name];
	let dataNew2 = dataNew;
	//dataNew.push({'name': 'All topics', 'value': dataNew2})
	// console.log(dataNew2)
	$:console.log('value=-=============')
	$:console.log(value)

	//
</script>

<main>
	{#each content as block}
		{#if block.type === 'head'}
		<Header {...block}/>
		{:else if block.type === 'overview'}
		<div class="desktopChart">
			<ScatterKnots {...block} data={oval_data}/>
		</div>
		<div class="MobileChart">
			<ScatterKnots_Mobile {...block} data={oval_dataMbl}/>
		</div>
		{:else if block.type === 'text'}
		<Text {...block} />
		{:else if block.type === 'texth1'}
		<Texth1 {...block} />
		{:else if block.type === 'chart'}
		<Knit {...block} />
		{:else if block.type === 'FirstChart'}
		<FirstChart file="ai2html-output/graph1.html"/>
		<!-- <Blanket data={selected}/> -->
		{:else if block.type === 'blanket'}
		<div class = "custom-select">
		</div>
		<div class='col-text select'>
		<MaterialApp>
			<Select activeClass="gray" bind:value chips multiple outlined items={[{name:'All topics', value:'All topics'}, ...dataNew.map(d => ({name: d.name, value: d.name}))]}>Pick a topic</Select>
		</MaterialApp>

		</div>

		<FullBlanket data={dataNew.filter(d => value.indexOf(d.name) > -1 || (value[0] === 'All topics' && value.length === 1)).map(d => d.value)}/>

		<!-- <FullBlanket data={dataNew}/> -->

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
	.select {
		margin-top: 3rem;
		margin-bottom: 3rem;
	}
</style>
