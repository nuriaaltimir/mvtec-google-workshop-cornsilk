  
<script>
	//import Axis from '../common/Axis.svelte';
	//import Tooltip from '../common/Tooltip.svelte'
    import Ellipse from './Ellipse.svelte'
    import { Canvas } from 'svelte-canvas'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array';
    import Grid from './Grid.svelte'
    
    export let data;
    let margin = {top: 20, right: 10, bottom: 20, left: 40};
	let width, height;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 10, width - margin.right - margin.right]);
	
	$: y = scaleLinear()
		.domain(extent(data, d => d.cy))
        .range([margin.top, height - margin.bottom - margin.top ]);
        
    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 5])
        .nice();

    $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 12])
		.nice();

    const color = {
        "MH":{pink: '#F28095', blue: '#8CE6FF'},
        "H":{pink: '#F24968', blue: '#18C2E6'},
        "A":{pink: '#BF213E', blue: '#007AC2'},
        "P":{pink: '#A60321', blue: '#1262A1'},
        "N":{pink: '#A60321', blue: '#1262A1'}
    }
		
</script>
<div class='graphic overview' bind:clientWidth={width} bind:clientHeight={height}>
    <Canvas {width} {height}>
        <Grid type="x" scale={x} {data} {margin} />
        <Grid type="y" scale={y} {data} {margin} />
            {#each data as d,i}
            {#if i%2}
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill={color[d.type].pink}
                rotation={Math.PI * .25}
            />
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill={color[d.type].blue}
                rotation={Math.PI * .75}
            />
            {:else}
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill={color[d.type].pink}
                rotation={Math.PI * .25}
            />
            <Ellipse 
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill={color[d.type].blue}
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