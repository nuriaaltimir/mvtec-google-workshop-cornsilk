<script>
    export let x;
    export let y;
</script>

<div class='circle' style="top: {y}px; left: {x}px;">
</div>
<style>
    .circle {
        position:absolute;
        width:2.4rem;
        height:2.4rem;
        border-radius: 1.2rem;
        border:3px solid #FFF;
        box-shadow: 0 0 1.5rem #00000055;
        pointer-events: none;
        margin-left:-1.2rem;
        margin-top:-1.2rem;
    }
</style>