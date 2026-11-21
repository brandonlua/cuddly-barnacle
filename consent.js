(function(){
  var KEY="asaplimo_consent",VER="2026-11-14",TOKEN="asaplimo_session_token";
  try{
    var saved=JSON.parse(localStorage.getItem(KEY)||"null");
    if(saved&&saved.v===VER)return;
  }catch(e){}

  var css=
    "#consent{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(0,0,0,.6);font:15px/1.6 Inter,-apple-system,'Segoe UI',sans-serif}"+
    "#consent .cbox{width:100%;max-width:420px;background:var(--panel,#f6f5f2);color:var(--text,#1f1e1d);border:1px solid var(--line,#e2dfd6);border-radius:20px;padding:28px 24px 20px;text-align:center;box-shadow:0 24px 80px rgba(0,0,0,.45)}"+
    "#consent h3{font:500 24px 'Source Serif 4',Georgia,serif;margin:0 0 10px}"+
    "#consent p{color:var(--dim,#66645d);font-size:14.5px;margin:0 0 16px}"+
    "#consent label{display:flex;align-items:flex-start;gap:12px;text-align:left;padding:12px 14px;border:1px solid var(--line,#e2dfd6);border-radius:14px;background:var(--bg,#fff);cursor:pointer;font-size:14px;color:var(--text,#1f1e1d);line-height:1.5}"+
    "#consent input[type=checkbox]{width:18px;height:18px;margin-top:2px;flex-shrink:0;accent-color:var(--accent,#4f5fe0);cursor:pointer}"+
    "#consent label a{color:var(--accent,#4f5fe0);text-decoration:underline}"+
    "#consent .cgo{width:100%;margin-top:14px;padding:12px 16px;border-radius:22px;border:1px solid var(--line,#e2dfd6);background:#fff;color:#000;font:inherit;font-weight:600;cursor:pointer}"+
    "#consent .cgo:hover:not(:disabled){background:#ececea}"+
    "#consent .cgo:disabled{opacity:.45;cursor:not-allowed}"+
    "#consent .cno{width:100%;margin-top:6px;padding:10px;border:0;background:none;color:var(--faint,#99968d);font:inherit;font-size:14px;cursor:pointer}"+
    "#consent .cno:hover{color:var(--text,#1f1e1d)}"+
    "#consent .cfine{margin:12px 0 0;font-size:12.5px;color:var(--faint,#99968d)}";

  function build(){
    var st=document.createElement("style");
    st.textContent=css;
    document.head.appendChild(st);

    var o=document.createElement("div");
    o.id="consent";
    o.setAttribute("role","dialog");
    o.setAttribute("aria-modal","true");
    o.setAttribute("aria-label","Terms and cookies");
    o.innerHTML=
      '<div class="cbox">'+
        '<h3>Before you continue</h3>'+
        '<p>Please review and accept our terms to use asaplimo.</p>'+
        '<label for="consent-check"><input type="checkbox" id="consent-check"><span>I am 13 or older and I agree to the <a href="terms" target="_blank" rel="noopener">Terms of Service</a>, and I accept the <a href="cookies" target="_blank" rel="noopener">Cookie Policy</a> and <a href="privacy" target="_blank" rel="noopener">Privacy Policy</a>.</span></label>'+
        '<button type="button" class="cgo" id="consent-go" disabled>Agree and continue</button>'+
        '<button type="button" class="cno" id="consent-no">Decline</button>'+
        '<p class="cfine">We only store your login and display choices in your browser. No ads or tracking cookies.</p>'+
      '</div>';
    document.body.appendChild(o);
    document.documentElement.style.overflow="hidden";

    var chk=document.getElementById("consent-check"),go=document.getElementById("consent-go");
    chk.addEventListener("change",function(){go.disabled=!chk.checked});
    go.addEventListener("click",function(){
      if(!chk.checked)return;
      try{localStorage.setItem(KEY,JSON.stringify({v:VER,t:Date.now()}))}catch(e){}
      o.remove();
      st.remove();
      document.documentElement.style.overflow="";
    });
    document.getElementById("consent-no").addEventListener("click",function(){
      try{localStorage.removeItem(TOKEN);localStorage.removeItem(KEY)}catch(e){}
      location.href="about";
    });
    chk.focus();
  }

  if(document.body)build();else document.addEventListener("DOMContentLoaded",build);
})();
