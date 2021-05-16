<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import Text from './components/Text.svelte'
	import Knit from './components/Knit.svelte'
	import FullBlanket from './components/FullBlanket.svelte'
	import Footer from './components/common/Footer.svelte'
	import { Select, MaterialApp } from 'svelte-materialify';

	export let content;
	export let oval_data;
	export let oval_data2;
	let value = [];

	$: selected = oval_data2.filter(d => d.name === "Depression");

	const types = [...new Set(oval_data2.map((d) => d.name))];
	$:console.log(value)
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
		{:else if block.type === 'blanket'}
		<div class='col-text select'>
		<MaterialApp>
			<Select activeClass="gray" bind:value chips multiple outlined items={types}>Pick a topic</Select>
		</MaterialApp>
		</div>
		<FullBlanket data={selected}/>
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