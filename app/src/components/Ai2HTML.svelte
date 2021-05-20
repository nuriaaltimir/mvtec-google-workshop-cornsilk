<script>
    export let file;
	$:html = '';
    
	fetch(`./${file}`)
        .then(resp => resp.text())
        .then(text => { html = text })
    
</script>

{@html html}