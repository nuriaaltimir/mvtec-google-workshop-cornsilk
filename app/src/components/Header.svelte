<script>
  import Legend from './Legend.svelte'
  export let kicker;
  export let head;
  export let subhead;
</script>
<section class='col-text'>
    <h1>
      <span class='kicker'>{kicker}</span><br/>
      {head}
    </h1> 
    <h2>{subhead}</h2>
    <div class='legend'>
      <p style='top:0; left: 0; width:90%' class='label'>This thread is people asking for help ...</p>
      <p style='top:40%; left: 0; width:60%' class='label'>... and this one is people offering help on Google, over time.</p>
      <p style='top:40%; left: 90%; width:60%' class='label'>Where they meet in a big knot people are asking for help and offering it at the same time for the same issue</p>
      <Legend/>
    </div>
    
</section>
<style>
  .kicker {
    font-weight: 700 !important;
  }
  .legend {
    position: relative;
    height: 100px;
    margin:0;
  }
  .label {
    position: absolute;
  }
</style>