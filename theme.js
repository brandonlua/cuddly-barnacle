(function(){
  var saved=null;
  try{saved=localStorage.getItem("asaplimo_theme");}catch(e){}
  if(!saved&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)saved="dark";
  if(saved&&!document.documentElement.hasAttribute("data-theme"))document.documentElement.setAttribute("data-theme",saved);
})();
