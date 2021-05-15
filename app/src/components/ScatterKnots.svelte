
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
    let frame;


    let dataMap = data.reduce((acc,d) => {
      acc[d.cy - 1] = acc[d.cy - 1] ?? [];
      acc[d.cy - 1][d.cx - 1] = d;
      return acc;
    }, [])

    let tooltipPosition = [-1,-1];

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 10, width - margin.right - margin.right]);

    $: stepX = (x.range()[1] - x.range()[0]) / dataMap[0].length;
    $: stepY = (y.range()[1] - y.range()[0]) / dataMap.length;

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

    function updateTooltip(x,y) {
      console.log(dataMap[y][x]);
    }

    function handleMousemove(event) {
      const row = Math.min(Math.max(0, Math.floor((event.clientY - (margin.top)) / stepY)), dataMap.length - 1);
      const col = Math.min(Math.max(0, Math.floor((event.clientX - (margin.left + 10)) / stepX)), dataMap[row].length - 1);

      // console.log(col,row,'->');
      // console.log(dataMap[row][col])
      if(tooltipPosition.col !== col || tooltipPosition.row !== row) {
        updateTooltip(col, row);
      }

  	}
    // LET'S USE THIS LATER TO IMPROVE THE PERFORMANCE
    function handleMouseenter() {
      console.log('ENTER');
      // (function loop() {
  		// 	frame = requestAnimationFrame(loop);
  		// 	// console.log(tooltipPosition);
  		// })();
    }
    function handleMouseleave() {
      console.log('LEAVE');
      // cancelAnimationFrame(frame);
    }

    const color = {
        "MH":{pink: '#F28095', blue: '#8CE6FF'},
        "H":{pink: '#F24968', blue: '#18C2E6'},
        "A":{pink: '#BF213E', blue: '#007AC2'},
        "P":{pink: '#A60321', blue: '#1262A1'},
        "N":{pink: '#A60321', blue: '#1262A1'}
    }

</script>
<div class='graphic overview' bind:clientWidth={width} bind:clientHeight={height}>
    <Canvas {width} {height} on:mousemove={handleMousemove} on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
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
                fill='#F24968'
                rotation={Math.PI * .25}
            />
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='#18C2E6'
                rotation={Math.PI * .75}
            />
            {:else}
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='#F24968'
                rotation={Math.PI * .25}
            />
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='#18C2E6'
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
