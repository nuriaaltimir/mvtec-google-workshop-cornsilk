import App from './App.svelte';
import story from './data/story.json'

const app = new App({
    target: document.body,
    props:{
        content:story.article
    } 
})

export default app;