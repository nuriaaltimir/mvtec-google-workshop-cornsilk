
<script>
	//import Axis from '../common/Axis.svelte';
	//import Tooltip from '../common/Tooltip.svelte'
    import Ellipse from './Ellipse.svelte'
    import { Canvas } from 'svelte-canvas'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array';
    import Grid from './Grid.svelte';

    export let data;
    let margin = {top: 20, right: 10, bottom: 20, left: 125};
	let width, height;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 10, width - margin.right - margin.right]);

	$: y = scaleLinear()
		.domain(extent(data, d => d.cy2))
        .range([margin.top + 15, height - margin.bottom - margin.top ]);

    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 6])
        .nice();

    $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 15])
		.nice();

</script>
<div class='graphic square' bind:clientWidth={width} bind:clientHeight={height}>
    <Canvas {width} {height}>
        <!-- <Grid type="x" scale={x} {data} {margin} />
        <Grid type="y" scale={y} {data} {margin} /> -->
            {#each data as d,i}
            {#if i%2}
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='#F26680'
                rotation={Math.PI * .75}
            />
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='#13B2ED'
                rotation={Math.PI * .25}
            />
            {:else}
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='#F24968'
                rotation={Math.PI * .75}
            />
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='#18C2E6'
                rotation={Math.PI * .25}
            />
            {/if}
            {/each}
    </Canvas>

</div>
