<script>
  import Legend from './Legend.svelte'
  import LegendMobile from './LegendMobile.svelte'

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
      <p style='top:0; left: 0; width:90%' class='label'>This thread is <span class='text-red'>people in need of help</span> ...</p>
      <p style='top:40%; left: 0; width:60%' class='label'>... and this one is <span class='text-blue'>people seeking to help someone</span> on Google, over time.</p>
      <p style='top:40%; left: 90%; width:60%' class='label'>Where <span class='text-black'>they meet in a big knot</span>, people are asking for help and offering it at the same month for the same issue</p>
      <Legend/></div>
    <div class='legend_mobile'>
      <p style='top:-10%; left: 0; width:60%; line-height: 20px;' class='label'>This thread is people <span class='text-red'>in need of help</span> ...</p>
      <p style='top:46%; left: 0; width:70%' class='label'>... and this one is <br><span class='text-blue'>people seeking to <br>help someone</span> <br>on Google, over time.</p>
      <p style='top:46%; left: 65%; width:50%' class='label'>Where <span class='text-black'>they meet in a big knot</span>, people are asking for help and offering it at the same quarter for the same issue</p>
      <LegendMobile/></div>
    
</section>
<style>
  .legend {
    position: relative;
    height: 100px;
    margin:0;
    margin-bottom: 5rem;
    
  }
  .legend_mobile {
    position: relative;
    height: 100px;
    margin:0 auto;
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