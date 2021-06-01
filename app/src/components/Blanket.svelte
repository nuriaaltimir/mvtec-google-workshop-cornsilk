
<script>
	//import Axis from '../common/Axis.svelte';
    import Tooltip from './common/Tooltip.svelte'
    import Ellipse from './Ellipse.svelte'
    import { Canvas } from 'svelte-canvas'
    import {scaleSqrt, scaleLinear} from 'd3-scale';
    import { format } from 'd3-format';
    import { timeFormat } from 'd3-time-format';
    import {extent} from 'd3-array';
    import Grid from './GridBlanket.svelte'
    // import { RoughSVG } from 'rough-svelte';
    // import { RoughCanvas } from 'rough-svelte';


    export let data;
    export let topic;
    let margin = {top: 10, right: 10, bottom: 10, left: 10};
	  let width, height;
    let frame;
    console.log("data blanket-----------")
    console.log(data)
    let dataMap = data.reduce((acc,d) => {
      acc[d.cy - 1] = acc[d.cy - 1] ?? [];
      acc[d.cy - 1][d.cx - 1] = d;
      return acc;
    }, [])

    $: tooltipPosition = [-1,-1];
    $: tooltipTip = null;
    $: tooltipVisible = false;

    $: x = scaleLinear()
		.domain(extent(data, d => d.cx))
		.range([margin.left + 3 , width - margin.right]);

    $: stepX = (x.range()[1] - x.range()[0]) / dataMap[0].length;
    $: stepY = (y.range()[1] - y.range()[0]) / dataMap.length;

	$: y = scaleLinear()
		  .domain(extent(data, d => d.cy))
          .range([margin.top + 3, height - margin.bottom - margin.top ]);

  let responsive = ""
  $: width < 640 ? responsive=[5,8] : responsive=[6,15] // [rx, ry]

  $: console.log(responsive)

    $: rx = scaleSqrt()
        .domain([0,10.61032953945969]) //max rminor
        // .domain(extent(data, d => d.rminor))
        // .domain([0, d3.max(data, )])
    .range([0, responsive[0]])
        .nice();

    $: ry = scaleSqrt()
        .domain([0,10.61032953945969]) // max rmajor
		// .domain(extent(data, d => d.rmajor))
    .range([0, responsive[1]])
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
      tooltipTip = `
        On <b>${timeFormat('%B %Y')(new Date(item.year, item.month - 1, 1))}</b>
          there was an index of <span class="requested">${format(',.2~f')(item.value2)}</span> 
          searches asking for help for and <span class="offered">${format(',.2~f')(item.value)}</span> 
          offering it related to <b>${topic}</b>
        <br/>
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
    }
    function handleMouseleave() {
      //console.log('LEAVE');
      tooltipVisible = false;
      // cancelAnimationFrame(frame);
    }

</script>
<div class='graphic square' bind:clientWidth={width} bind:clientHeight={height}>

    <Canvas {width} {height} on:mousemove={handleMousemove} on:mouseenter={handleMouseenter} on:mouseleave={handleMouseleave}>
        <Grid type="x" scale={x} {data} {margin} />
        <Grid type="y" scale={y} {data} {margin} />
        <span class="blanket-topic">{topic}</span>

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
    <Tooltip x={tooltipPosition[0] * stepX} y={stepY * tooltipPosition[1]} tooltipWidth={200} width={width} tip={tooltipTip} visible={tooltipVisible}/>
</div>
