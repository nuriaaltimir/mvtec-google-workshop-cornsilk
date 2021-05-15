<script>
	import { Layer } from 'svelte-canvas'

	export let x = 0;
	export let y = 0;
	export let i = 0
	export let rx = 1;
    export let ry = 1;
	export let fill = 'black'
    export let rotation = Math.PI;

	let last = 20
	
	$: render = ({ context }) => {
		context.strokeStyle = fill;
		context.lineWidth = 3.6;
		context.beginPath();
		if (i < 33) {
			context.ellipse(x, y, rx, ry, rotation, Math.PI * .1, Math.PI * 1.9);
		} else {
			context.ellipse(x, y, rx * last/10, ry * last/10, rotation, Math.PI * .1, Math.PI * 1.9);
		}	
		context.globalCompositeOperation = 'multiply';
		context.stroke();

		// context.strokeStyle = fill;
		// context.lineWidth = 2.4;
		// context.beginPath();
		// context.ellipse(x, y + last, rx * last/10, ry * last/10, rotation, 0, Math.PI * 2);
		// context.globalAlpha = 0.6;
		// context.globalCompositeOperation = 'soft-light';
		// context.stroke();
	}

</script>

<Layer {render} />