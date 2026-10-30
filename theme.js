(function(){
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(calm) return;

  var layer = document.createElement("div");
  layer.id = "hw-layer";
  document.body.appendChild(layer);

  function ember(){
    var el = document.createElement("span");
    var size = 2 + Math.random() * 3;
    var dur = 9 + Math.random() * 9;
    el.className = "hw-ember";
    el.style.width = el.style.height = size + "px";
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = dur + "s";
    el.style.setProperty("--sway", (Math.random() * 120 - 60) + "px");
    layer.appendChild(el);
    setTimeout(function(){ el.remove(); }, dur * 1000 + 200);
  }

  for(var i = 0; i < 8; i++) setTimeout(ember, i * 400);
  setInterval(ember, 1100);
})();
