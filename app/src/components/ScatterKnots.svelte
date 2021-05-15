  
<script>
	//import Axis from '../common/Axis.svelte';
	//import Tooltip from '../common/Tooltip.svelte'
    import Ellipse from './Ellipse.svelte'
    import { Canvas } from 'svelte-canvas'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array';
    
    export let data;
    let margin = {top: 20, right: 5, bottom: 20, left: 5};
	let width, height;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left, width - margin.right - margin.left]);
	
	$: y = scaleLinear()
		.domain(extent(data, d => d.cy))
        .range([margin.top, height - margin.bottom - margin.top]);
        
    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 5])
        .nice();

    $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 12])
		.nice();
		
</script>
<div class='graphic overview' bind:clientWidth={width} bind:clientHeight={height}>
    <Canvas {width} {height}>
            {#each data as d,i}
            {#if i%2}
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy) - 3}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='red'
                rotation={Math.PI * .25}
            />
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy) - 3}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='blue'
                rotation={Math.PI * .75}
            />
            {:else}
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy) + 3}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='red'
                rotation={Math.PI * .25}
            />
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy) + 3}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='blue'
                rotation={Math.PI * .75}
            />
            {/if}
            {/each}
    </Canvas>

</div>
<style>
    .overview {
        height: 50vw;
    }
</style>