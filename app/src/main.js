import App from './App.svelte';
import story from './data/story.json'
import OvalData from './data/OvalData.json'

const app = new App({
    target: document.body,
    props:{
        content:story.article,
        oval_data:OvalData
    } 
})

export default app;