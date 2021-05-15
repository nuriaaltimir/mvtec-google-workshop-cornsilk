<script>
	import { Layer } from 'svelte-canvas'
	
	export let scale, 
			tickSize = 7, 
			margin, 
			tickNumber = 0,
			type = "x";
	
	$: ticks = scale.ticks(tickNumber);
	
	$: render = ({ context, width, height }) => {
		context.beginPath();
		
    ticks.forEach(d => {
			if (type === "x") {
                context.beginPath();
				context.moveTo(scale(d),margin.bottom);
				context.lineTo(scale(d), height - margin.bottom + tickSize);
                context.strokeStyle = "lightgrey";
                context.lineWidth = 3;
                context.stroke();
			} else if (type === "y") {
                context.beginPath();
				context.moveTo(width, scale(d));
				context.lineTo(margin.left - tickSize, scale(d));
                context.strokeStyle = "blue";
                context.lineWidth = 1;
                context.stroke();

                context.beginPath();
                context.moveTo(width, scale(d) + 5);
				context.lineTo(margin.left - tickSize, scale(d)+ 5);
                context.strokeStyle = "red";
                context.lineWidth = 1;
                context.stroke();

			}
    });
		


    context.textAlign = type === "x" ? "center" : "right";
    context.textBaseline = type === "x" ? "top" : "middle";
		context.fillStyle = "black";
		
    ticks.forEach(d => {
			if (type === "x") {
			} else if (type === "y") {
				context.fillText(d, margin.left - tickSize - 1, scale(d));
			}
    });
	}
</script>

<Layer {render} />