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
      <p style='top:0; left: 0; width:90%' class='label'>This thread is <span class='text-blue'>people in need of help</span> ...</p>
      <p style='top:40%; left: 0; width:60%' class='label'>... and this one is <span class='text-red'>people seeking to help someone</span> on Google, over time.</p>
      <p style='top:40%; left: 90%; width:60%' class='label'>Where <span class='text-black'>they meet in a big knot</span>, people are asking for help and offering it at the same time for the same issue</p>
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
    margin-bottom: 5rem;
  }
  .label {
    position: absolute;
  }
  .text-red, .text-blue, .text-black {
    font-weight: 800;
  }
  .text-red {
    color:#F26680;
  }
  .text-blue {
    color:#13B2ED;
  }
  .text-black {
    color:#222;
  }
</style>