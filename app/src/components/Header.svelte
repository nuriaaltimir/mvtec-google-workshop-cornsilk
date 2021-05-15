<script>
  import Legend from './Legend.svelte'
  export let head;
  export let subhead;
</script>
<section class='col-text'>
    <h1>{head}</h1> 
    <h2>{subhead}</h2> 
    <Legend/>
</section>