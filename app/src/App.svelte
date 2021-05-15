<script>
	import Menu from './components/common/Menu.svelte'
	import Header from './components/Header.svelte'
	import ScatterKnots from './components/ScatterKnots.svelte'
	import Text from './components/Text.svelte'
	import Knit from './components/Knit.svelte'
	import Blanket from './components/Blanket.svelte'
	import Footer from './components/common/Footer.svelte'

	export let content;
	export let oval_data;
</script>

<main>
	
	{#each content as block}

		{#if block.type === 'header'}
		<Header {...block} />
		{:else if block.type === 'overview'}
		<div class="legend">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 685.76 83.29">
				<g style="isolation: isolate">
				  <g>
					<line y1="21.89" x2="674.49" y2="21.89" style="fill: none;stroke: #1ac1e5;stroke-miterlimit: 10;stroke-width: 2px"/>
					<line y1="30.62" x2="674.49" y2="30.62" style="fill: none;stroke: #ef4a68;stroke-miterlimit: 10;stroke-width: 2px"/>
					<text transform="translate(0 15.39)" style="font-size: 13px;fill: #231f20;font-family: OpenSans-Regular, Open Sans">This is people <tspan x="85.94" y="0" style="fill: #1ac1e5;font-family: OpenSans-Bold, Open Sans;font-weight: 700">asking for help</tspan><tspan x="183.33" y="0" xml:space="preserve"> on Google...</tspan></text>
					<text transform="translate(0.99 45.75)" style="font-size: 13px;fill: #231f20;font-family: OpenSans-Regular, Open Sans">and this is is people <tspan x="122.76" y="0" style="fill: #ef4a68;font-family: OpenSans-Bold, Open Sans;font-weight: 700">offering help</tspan><tspan x="206.1" y="0" style="fill: #1bc1e5"> </tspan><tspan x="209.48" y="0">on Google over time</tspan></text>
					<ellipse cx="428.15" cy="30.31" rx="15.47" ry="35.31" transform="translate(142.18 345.62) rotate(-52.27)" style="fill: #ef4968;mix-blend-mode: multiply"/>
					<ellipse cx="428.15" cy="30.31" rx="35.31" ry="15.47" transform="translate(79.68 276.15) rotate(-39.77)" style="fill: #1bc1e5;mix-blend-mode: multiply"/>
					<text transform="translate(469.15 48.56)" style="font-size: 13px;fill: #231f20;font-family: OpenSans-Regular, Open Sans">And this is a match: when people <tspan x="0" y="15.6">is asking for help and offering it </tspan><tspan x="0" y="31.2">at the same time for the same issue</tspan></text>
					<g>
					  <path d="M429.94,66.8c3.82,6.74,12.4,14.22,31.33,8.43" transform="translate(-0.01 -4.78)" style="fill: none;stroke: #3a3a3a;stroke-miterlimit: 10"/>
					  <polygon points="428.09 64.84 427 53.67 433.53 62.8 428.09 64.84" style="fill: #3a3a3a"/>
					</g>
				  </g>
				</g>
			  </svg>  
		</div>
		<ScatterKnots {...block} data={oval_data}/>
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
			Núria Altimir, Laura Aragó, Spe Chen and Ànnia Monreal.
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