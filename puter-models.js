(function(){
  var realApi=window.api;
  var JH={"Content-Type":"application/json"};

  function isPuter(){return typeof cur==="string"&&cur.indexOf("puter:")===0}
  function respond(status,data){return new Response(JSON.stringify(data),{status:status,headers:JH})}
  function textOf(c){
    if(typeof c==="string")return c;
    if(Array.isArray(c))return c.map(function(p){return p&&p.text?p.text:""}).join("");
    return "";
  }
  async function ensureSignedIn(){
    if(!window.puter)throw new Error("Puter failed to load.");
    if(!puter.auth.isSignedIn())await puter.auth.signIn();
  }

  window.api=async function(path,opt){
    if(path!=="/api/chat"||!isPuter())return realApi(path,opt);
    var body;
    try{body=JSON.parse(opt.body)}catch(e){return realApi(path,opt)}
    var modelId=cur;

    var prep=await realApi("/api/puter-prepare",{method:"POST",headers:JH,body:JSON.stringify({conversationId:body.conversationId,model:modelId,language:body.language||""})});
    if(!prep.ok)return prep;
    var ctx=await prep.json();

    var out;
    try{
      await ensureSignedIn();
      var content=body.image
        ?[{type:"text",text:body.message},{type:"image_url",image_url:{url:"data:"+body.image.mimeType+";base64,"+body.image.data}}]
        :body.message;
      var msgs=[{role:"system",content:ctx.system}].concat(ctx.messages,[{role:"user",content:content}]);
      out=await puter.ai.chat(msgs,{model:modelId.slice(6),normalize:true});
    }catch(e){
      var m=(e&&(e.message||(e.error&&e.error.message)))||"Puter request failed.";
      return respond(502,{error:"ai_request_failed",detail:m});
    }

    var msg=(out&&out.message)||{};
    return realApi("/api/puter-commit",{method:"POST",headers:JH,body:JSON.stringify({
      conversationId:body.conversationId,
      model:modelId,
      message:body.message,
      reply:textOf(msg.content)||"No response.",
      thinking:typeof msg.reasoning==="string"?msg.reasoning:"",
      hadImage:!!body.image
    })});
  };

  document.addEventListener("click",function(e){
    var b=e.target.closest&&e.target.closest("#model-panel .mrow");
    if(b&&/\(Puter\)/.test(b.textContent)&&window.puter&&!puter.auth.isSignedIn())puter.auth.signIn().catch(function(){});
  });
})();
