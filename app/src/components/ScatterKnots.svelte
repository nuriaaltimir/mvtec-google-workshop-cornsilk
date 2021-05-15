  
<script>
	//import Axis from '../common/Axis.svelte';
	//import Tooltip from '../common/Tooltip.svelte'
    import Knot from 'Knot.svelte'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array';
    
    export let data;
	// export let margin = {top: 20, right: 5, bottom: 20, left: 5};
	let width, height;

    // const subjectamount=61;
    // const separation=height/subjectamount;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left, width - margin.right - margin.left]);
	
	$: y = scaleLinear()
		.domain(extent(data, d => d.cy))
        .range([height - margin.bottom - margin.top, margin.top]);
        
    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 7])
        .nice();

     $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 21])
		.nice();
		

</script>
<div class='graphic' bind:clientWidth={width} bind:clientHeight={height}>
    <svg xmlns:svg='https://www.w3.org/2000/svg' 
        viewBox='0 0 {width} {height}'
        {width}
        {height}>
    
        <g>
            {#each data as d}
            <ellipse 
                cx={x(d.cx)}
                cy={y(d.cy)}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill-opacity=.8
                fill='red'
                transform='rotate(45deg)'
            />
            <ellipse 
                cx={x(d.cx)}
                cy={y(d.cy)}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill-opacity=.8
                fill='blue'
                transform='rotate(-45deg)'
            />
            {/each}
        </g>
    </svg>

    </div>
