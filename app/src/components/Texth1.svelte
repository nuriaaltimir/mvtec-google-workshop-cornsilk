<script>
   
	 export let texth1;
</script>

<section class='col-texth1 texth1'>
  {#each texth1 as p}
      <h4>{@html p.p}</h4>
  {/each}
</section>
   