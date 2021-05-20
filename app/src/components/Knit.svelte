<script>
    import rough from "roughjs/bin/rough";
    // npm i roughjs@4.0.4
    // https://roughjs.com/
    let roughSvg;
    
    function action(node) {
      roughSvg = rough.svg(node); 
      const rect = roughSvg.rectangle(100, 50, 100, 50, {  // x, y, width, height
        fill: "red"
      });
      node.appendChild(rect);
    }
  </script>
  
  <svg use:action />
  
  <style>
    svg {
      width: 300px;
      height: 150px;
      background-color: white;
    }
  </style>