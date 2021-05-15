<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import Text from './components/Text.svelte'
	import Knit from './components/Knit.svelte'
	import Blanket from './components/Blanker.svelte'
	import Footer from './components/common/Footer.svelte'

	export let content;
</script>

<main>
	{#each content as block}

		{#if block.type === 'header'}
		<Header {...block} />
		{:else if block.type === 'overview'}
		<ScatterKnots {...block} />
		{:else if block.type === 'text'}
		<Text {...block} />
		{:else if block.type === 'chart'}
		<Knit {...block} />
		{:else if block.type === 'blanket'}
		<Blanket {...block} />
		{/if}
	{/each}
	
	<Footer>
		<div slot="about">
			I could not but remark the striking difference of his attention, and that of Lord Orville: the latter has such gentleness of manners, such delicacy of conduct, and an air so respectful, that, when he flatters most, he never distresses; and when he most confers honour, appears to receive it! The former obtrudes his attention, and forces mine; it is so pointed, that it always confuses me, and so public, that it attracts general notice. Indeed I have sometimes thought that he would rather wish, than dislike to have his partiality for me known, as he takes great care to prevent my being spoken to by any but himself.
		</div>
		<div slot="data">
			He bowed, expecting me to go;-and then, with quick steps, but a heavy heart, I came to my own room. His question, I am sure, meant Sir Clement Willoughby; and had I not imposed upon myself the severe task of avoiding, flying Lord Orville, with all my power, I would instantly have satisfied him of my ignorance of Sir Clement's journey. And yet more did I long to say something of the assembly, since I found he depended upon my spending the evening at home.
		</div>
		<div slot="team">
			Student, student, student ...
		</div>
	</Footer>
</main>

<style>
	main {
		padding: 1em;
		padding-bottom: 0;
		margin: 0 auto;
	}
</style>