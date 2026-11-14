(function(){
  var saved=null;
  try{saved=localStorage.getItem("asaplimo_theme");}catch(e){}
  if(!document.documentElement.hasAttribute("data-theme"))document.documentElement.setAttribute("data-theme",saved||"dark");
})();
