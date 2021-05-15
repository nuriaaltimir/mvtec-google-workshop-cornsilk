import App from './App.svelte';
import story from './data/story.json'
import OvalData from './data/OvalData.json'
import OvalData2 from './data/OvalData2.json' // blanket

const app = new App({
    target: document.body,
    props:{
        content:story.article,
        oval_data:OvalData,
        oval_data2:OvalData2
    } 
})

export default app;