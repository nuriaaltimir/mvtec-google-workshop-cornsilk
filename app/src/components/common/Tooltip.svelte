<script>
	export let x;
	export let y;
	export let width;
	export let height;
	export let tip = 'No data available';
	export let visible = false;
    export let tooltipWidth = 160;
	$: tx = (x < width - tooltipWidth && x >= tooltipWidth / 2)
		? x - tooltipWidth / 2
		: (x < tooltipWidth / 2
		? 0
		: width - tooltipWidth - tooltipWidth / 2);

	$: ty = y + 30;

	$: dx = x > width / 2 ? -tooltipWidth/2 : 0;

</script>

<div class="tooltip" style="top: {y}px; left: {x + dx}px; opacity: {visible ? 1: 0}; width: {tooltipWidth}px">
	{@html tip}
</div>

<style>
	.tooltip {
		position:absolute;
		font-size: 0.75rem;
		background:rgba(255,255,255,.9);
        box-shadow: rgba(0,0,0,.2) 1px 1px 9px;
        padding:.5rem;
		transition: opacity .3s;
		pointer-events: none;
		transform:translate(50%,-85%);
		z-index: 1;
	}
</style>
