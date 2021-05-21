<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import ScatterKnots_Mobile from './components/ScatterKnots_Mobile.svelte'
	import Text from './components/Text.svelte'
	import Texth1 from './components/Texth1.svelte'
	import Ai2html from './components/Ai2HTML.svelte'
	import Knit from './components/Knit.svelte'
	import FullBlanket from './components/FullBlanket.svelte'
	import Blanket from './components/Blanket.svelte'
	import {groups} from 'd3-array'
	import Footer from './components/common/Footer.svelte'
	import { Select, MaterialApp } from 'svelte-materialify';

	export let content;
	export let oval_data;
	export let oval_dataMbl;

	let oval_data2 = oval_data.map(d => {return {
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
        };}
		);
		
	let topics = [...new Set(oval_data2.map((d) => d.name))];
	let groupedData = groups(oval_data2, d => d.name)

	let value = [];
	value = ['Depression', 'ADHD', 'Addiction', 'Alcoholism', 'Grief', 'Breakup'];

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
		{:else if block.type === 'aichart'}
		<Ai2html file={`ai2html-output/${block.file}`}/>
		<!-- <Blanket data={selected}/> -->
		{:else if block.type === 'blanket'}
		<div class = "custom-select"> 
		</div>	
		<div class='col-text select'>
		<MaterialApp>
			<Select activeClass="gray" bind:value chips multiple outlined items={topics}>Pick a topic</Select>
		</MaterialApp>
		
		</div>
		{#key value}
		<FullBlanket data={groupedData.filter(d=> value.includes(d[0]))}/>
		<!-- <FullBlanket data={dataNew}/> -->
		{/key}
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