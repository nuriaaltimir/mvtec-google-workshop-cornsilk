<script>
	import { Layer } from 'svelte-canvas'

	export let x = 0;
	export let y = 0;
	export let rx = 1;
    export let ry = 1;
	export let fill = 'black'
    export let rotation = Math.PI;
	
	$: render = ({ context }) => {
		context.fillStyle = fill;
		context.beginPath();
		context.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
		context.fill();
	}
</script>

<Layer {render} />