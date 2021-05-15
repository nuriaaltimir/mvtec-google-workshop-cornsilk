
<script>
	//import Axis from '../common/Axis.svelte';
	import Tooltip from './common/Tooltip.svelte'
  import Ellipse from './Ellipse.svelte'
  import { Canvas } from 'svelte-canvas'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
	import {extent} from 'd3-array';
    import Grid from './Grid.svelte'

    export let data;
    let margin = {top: 20, right: 10, bottom: 20, left: 125};
	  let width, height;
    let frame;


    let dataMap = data.reduce((acc,d) => {
      acc[d.cy - 1] = acc[d.cy - 1] ?? [];
      acc[d.cy - 1][d.cx - 1] = d;
      return acc;
    }, [])

    $: tooltipPosition = [-1,-1];

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 10, width - margin.right - margin.right]);

    $: stepX = (x.range()[1] - x.range()[0]) / dataMap[0].length;
    $: stepY = (y.range()[1] - y.range()[0]) / dataMap.length;

	$: y = scaleLinear()
		.domain(extent(data, d => d.cy))
        .range([margin.top + 15, height - margin.bottom - margin.top ]);

    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 6])
        .nice();

    $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 15])
		.nice();

    function  getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
          scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

      return {
        x: (evt.clientX - rect.left),   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top)     // been adjusted to be relative to element
      }
    }

    function updateTooltip(position) {
      tooltipPosition = [...position];
    }

    function handleMousemove(event) {
      // console.log(event)
      const position = getMousePos(event.target, event);
      // console.log(position);

      const row = Math.min(Math.max(0, Math.floor((position.y - (margin.top)) / stepY)), dataMap.length - 1);
      const col = Math.min(Math.max(0, Math.floor((position.x - (margin.left + 10)) / stepX)), dataMap[row].length - 1);

      // const row = Math.round(position.y / stepY);
      // const col = Math.round(position.x / stepX);
      // console.log(position.x, stepX, width)
      // console.log(col,row,'->');
      // console.log(dataMap[row][col])
      if(tooltipPosition.col !== col || tooltipPosition.row !== row) {
        updateTooltip([col, row]);
      }

  	}
    // LET'S USE THIS LATER TO IMPROVE THE PERFORMANCE
    function handleMouseenter() {
      console.log('ENTER');
      console.log('width', width)
      console.log('range', x.range())
      console.log('stepX', stepX)
      console.log('margins', margin)
      // (function loop() {
  		// 	frame = requestAnimationFrame(loop);
  		// 	// console.log(tooltipPosition);
  		// })();
    }
    function handleMouseleave() {
      console.log('LEAVE');
      // cancelAnimationFrame(frame);
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
    <Tooltip x={tooltipPosition[0] * stepX} y={stepY * tooltipPosition[1]} width={100} height={100} tip={tooltipPosition.join('x')} visible={true}/>
</div>
<style>
    .overview {
        height: 60vw;
    }
</style>
