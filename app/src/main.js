import App from './App.svelte';
import story from './data/story.json'
import OvalData from './data/OvalData.json'
import OvalData2 from './data/OvalData2.json' // blanket
import ovalDataMbl from './data/OvalDataMbl.json' // mobile


const app = new App({
    target: document.body,
    props:{
        content:story.article,
        oval_data:OvalData,
        oval_dataMbl:ovalDataMbl
    } 
})

export default app;