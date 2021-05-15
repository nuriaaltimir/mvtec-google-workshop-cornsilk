<script>
	import { Layer } from 'svelte-canvas'
	
    export let data;
	export let scale, 
			tickSize = 7, 
			margin, 
			type = "x";
	
	$: render = ({ context, width, height }) => {
		context.beginPath();
		
    data.forEach(d => {
			if (type === "x") {
                context.beginPath();
				context.moveTo(scale(d.cx),margin.bottom);
				context.lineTo(scale(d.cx), height - margin.bottom + tickSize);
                context.strokeStyle = "lightgrey";
                context.lineWidth = 2;
                context.stroke();
			} else if (type === "y") {
                context.beginPath();
				context.moveTo(width, scale(d.cy) - 1.5 );
				context.lineTo(margin.left - tickSize, scale(d.cy) - 1.5);
                context.strokeStyle = "#26B0E6";
                context.lineWidth = 2;
                context.stroke();

                context.beginPath();
                context.moveTo(width, scale(d.cy) + 1.5);
				context.lineTo(margin.left - tickSize, scale(d.cy)+ 1.5);
                context.strokeStyle = "#F16680";
                context.lineWidth = 2;
                context.stroke();

			}
    });
		


    context.textAlign = type === "x" ? "center" : "right";
    context.textBaseline = type === "x" ? "top" : "middle";
		
    data.forEach(d => {
			if (type === "x") {
			} else if (type === "y") {
                context.font="0.9em Roboto";
                if (d.cy === 33) {
                    context.fillText("Crisis", margin.left - tickSize - 1, scale(d.cy));
                context.fillStyle = "rgba(189, 189, 189)";  
                } else {
				context.fillText(d.lable, margin.left - tickSize - 1, scale(d.cy));
                context.fillStyle = "rgba(189, 189, 189)";
                }


			}
    });
	}
</script>

<Layer {render} />