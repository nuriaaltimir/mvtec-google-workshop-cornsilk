
<script>
	//import Axis from '../common/Axis.svelte';
	import Tooltip from './common/Tooltip.svelte'
  import Ellipse from './Ellipse.svelte'
  import { Canvas } from 'svelte-canvas'
	import {scaleSqrt, scaleLinear} from 'd3-scale';
  import { format } from 'd3-format';
  import { timeFormat } from 'd3-time-format';
	import {extent} from 'd3-array';
  import Grid from './Grid.svelte'
  import Focus from './Focus.svelte'

    export let data;
    let margin = {top: 30, right: 10, bottom: 20, left: 125};
	  let width, height;
    let frame;


    let dataMap = data.reduce((acc,d) => {
      acc[d.cy - 1] = acc[d.cy - 1] ?? [];
      acc[d.cy - 1][d.cx - 1] = d;
      return acc;
    }, [])

    let index;

    $: tooltipPosition = [-1,-1];
    $: tooltipTip = null;
    $: tooltipVisible = false;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 7, width - margin.right - margin.right - 3]);

    $: stepX = (x.range()[1] - x.range()[0]) / (dataMap[0].length - 1);
    $: stepY = (y.range()[1] - y.range()[0]) / (dataMap.length - 1);

	  $: y = scaleLinear()
		  .domain(extent(data, d => d.cy))
      .range([margin.top + 7, height - margin.bottom - margin.top ]);

    $: rx = scaleSqrt()
		.domain(extent(data, d => d.rminor))
		.range([0, 3])
    .nice();

    $: ry = scaleSqrt()
		.domain(extent(data, d => d.rmajor))
		.range([0, 7])
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

    function updateTooltip(col, row) {
      tooltipPosition = [col, row];
      const item = dataMap[row][col];
      index = data.indexOf(item);
      tooltipTip = `
        <b>${item.lable === 'Beirut' ? 'Crisis' : item.lable}</b>
        <br/>
        ${timeFormat('%B %Y')(new Date(item.year, item.month - 1, 1))}
        <br/><br/>
        <b>Help</b>
        <br/>
        Requested <span class="requested">${format(',.2~f')(item.value)}</span>
        &harr;
        <span class="offered">${format(',.2~f')(item.value2)}</span> Offered
      `
    }

    function handleMousemove(event) {
      // console.log(event)
      const position = getMousePos(event.target, event);
      // console.log(position);

      const row = Math.min(Math.max(0, Math.floor((position.y - (margin.top) - 15) / stepY)), dataMap.length - 1);
      const col = Math.min(Math.max(0, Math.floor((position.x - (margin.left + 10)) / stepX)), dataMap[row].length - 1);

      if(tooltipPosition.col !== col || tooltipPosition.row !== row) {
        updateTooltip(col, row);
      }

  	}
    // LET'S USE THIS LATER TO IMPROVE THE PERFORMANCE
    function handleMouseenter() {
      // console.log('ENTER');
      // console.log('width', width)
      // console.log('range', x.range())
      // console.log('stepX', stepX)
      // console.log('margins', margin)
      // console.log('data', dataMap)
      tooltipVisible = true;
      // (function loop() {
  		// 	frame = requestAnimationFrame(loop);
  		// 	// console.log(tooltipPosition);
  		// })();
      strokeHover = "white"
      strWidth = 1;
    }
    function handleMouseleave() {
      //console.log('LEAVE');
      tooltipVisible = false;
      // cancelAnimationFrame(frame);
      strWidth = 0;
    }

    

</script>
<div class='graphic overview' bind:clientWidth={width} bind:clientHeight={height}>
    <Canvas {width} {height} on:mousemove={handleMousemove} on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
        <Grid type="x" scale={x} {data} {margin}/>
        <Grid type="y" scale={y} {data} {margin}/>
            {#each data as d,i}
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminorR)}
                ry={ry(d.rmajorR)}
                fill='#f02b50'
                rotation={Math.PI * .75}
            />
            <Ellipse
                x={x(d.cx)}
                y={y(d.cy)}
                i={d.cy}
                rx={rx(d.rminor)}
                ry={ry(d.rmajor)}
                fill='#66AAD3'
                rotation={Math.PI * .25}
            />
            {/each}
    </Canvas>
    <Tooltip x={tooltipPosition[0] * stepX} y={stepY * tooltipPosition[1]} tooltipWidth={200} width={width} tip={tooltipTip} visible={tooltipVisible}/>
    <Focus x={tooltipPosition[0] * stepX + margin.left + 30} y={tooltipPosition[1] * stepY + margin.top + 15} />
</div>
<style>
.graphic {
	height:100vh;
	margin-bottom:3rem;
	width: 100%;
	margin: 0 auto;


}

</style>
