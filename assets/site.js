/* ===== Hasan Adam · 2026 portal shared JS ===== */
(function(){
  "use strict";

  /* ---- Rotating dot-globe (self-contained, Three.js from CDN w/ fallback handled in HTML) ---- */
  function initGlobe(canvas){
    if(!window.THREE || !canvas) return;
    var renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true,preserveDrawingBuffer:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
    function size(){renderer.setSize(window.innerWidth,window.innerHeight,false);}
    size();
    var scene=new THREE.Scene();
    var cam=new THREE.PerspectiveCamera(48,window.innerWidth/window.innerHeight,0.1,100);
    cam.position.z=14;

    // fibonacci sphere of dots
    var N=3000, pos=new Float32Array(N*3), phi=Math.PI*(3-Math.sqrt(5));
    for(var i=0;i<N;i++){
      var y=1-(i/(N-1))*2, r=Math.sqrt(1-y*y), th=phi*i;
      pos[i*3]=Math.cos(th)*r*5; pos[i*3+1]=y*5; pos[i*3+2]=Math.sin(th)*r*5;
    }
    var geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
    var mat=new THREE.PointsMaterial({color:0x60a5fa,size:0.055,transparent:true,opacity:.9});
    var globe=new THREE.Points(geo,mat); scene.add(globe);

    // glowing arcs (latitude/longitude feel)
    var wire=new THREE.Mesh(new THREE.IcosahedronGeometry(5.18,2),
      new THREE.MeshBasicMaterial({color:0x3b82f6,wireframe:true,transparent:true,opacity:.10}));
    scene.add(wire);

    // atmosphere
    var c=document.createElement('canvas');c.width=c.height=128;
    var x=c.getContext('2d');var g=x.createRadialGradient(64,64,0,64,64,64);
    g.addColorStop(0,'rgba(96,165,250,.45)');g.addColorStop(1,'transparent');
    x.fillStyle=g;x.fillRect(0,0,128,128);
    var atmo=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,opacity:.55}));
    atmo.scale.set(17,17,1);scene.add(atmo);

    // orbiting ring (extra "wow")
    var ringGeo=new THREE.RingGeometry(6.2,6.32,120);
    var ring=new THREE.Mesh(ringGeo,new THREE.MeshBasicMaterial({color:0xa855f7,side:THREE.DoubleSide,transparent:true,opacity:.4}));
    ring.rotation.x=Math.PI/2.3; scene.add(ring);

    var mx=0,my=0;
    window.addEventListener('mousemove',function(e){mx=(e.clientX/window.innerWidth-.5);my=(e.clientY/window.innerHeight-.5);});
    (function spin(){
      requestAnimationFrame(spin);
      globe.rotation.y+=0.0017; globe.rotation.x+=0.0004;
      wire.rotation.copy(globe.rotation); ring.rotation.z+=0.002;
      cam.position.x+=(mx*4-cam.position.x)*0.03;
      cam.position.y+=(-my*3-cam.position.y)*0.03;
      cam.lookAt(0,0,0); renderer.render(scene,cam);
    })();
    window.addEventListener('resize',function(){cam.aspect=window.innerWidth/window.innerHeight;cam.updateProjectionMatrix();size();});
  }

  /* ---- cursor glow ---- */
  function initGlow(){
    var g=document.getElementById('glow-cursor');if(!g)return;
    window.addEventListener('mousemove',function(e){g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';g.style.opacity=1;});
    window.addEventListener('mouseleave',function(){g.style.opacity=0;});
  }

  /* ---- scroll reveal ---- */
  function initReveal(){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting)en.target.classList.add('in');});},{threshold:.12});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  }

  /* ---- card spotlight ---- */
  function initCards(){
    document.querySelectorAll('.card').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var r=card.getBoundingClientRect();
        card.style.setProperty('--mx',(e.clientX-r.left)+'px');
        card.style.setProperty('--my',(e.clientY-r.top)+'px');
      });
    });
  }

  /* ---- live status ---- */
  function initStatus(){
    fetch('status.json?t='+Date.now()).then(function(r){return r.json();}).then(function(d){
      if(d.sentToday!=null)document.getElementById('st-sent')&&(document.getElementById('st-sent').textContent=d.sentToday);
      if(d.total!=null)document.getElementById('st-total')&&(document.getElementById('st-total').textContent=d.total);
      if(d.lastBatch)document.getElementById('st-last')&&(document.getElementById('st-last').textContent=d.lastBatch);
    }).catch(function(){/* seed values stay */});
  }

  /* ---- Julie chatbot (free proxy fallback) ---- */
  function initJulie(){
    var chat=document.getElementById('joulie-chat');
    var bubble=document.getElementById('joulie-bubble');
    var msgs=document.getElementById('joulie-msgs');
    var input=document.getElementById('joulie-in');
    var send=document.getElementById('joulie-send');
    if(!chat||!bubble)return;
    bubble.addEventListener('click',function(){chat.classList.toggle('open');if(chat.classList.contains('open'))input.focus();});
    function add(who,text){var d=document.createElement('div');d.className='m '+(who==='me'?'me':'ju');d.textContent=text;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;}
    add('ju',"Hi, I'm Julie — Hasan's site copilot. Ask about his work, the AutoApply engine, or how to start a campaign.");
    var SYS="You are Julie, the friendly AI copilot for Hasan Adam's operations-automation site and AutoApply SA. Hasan is an Industrial Engineer in Jeddah, KSA, founder of AutoApply SA (an automated job-application engine). Keep answers short, helpful, on-brand.";
    function ask(q){
      if(!q)return; add('me',q); add('ju','…');
      fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'gpt-3.5-turbo',messages:[{role:'system',content:SYS},{role:'user',content:q}]})})
        .then(function(r){return r.json();}).then(function(d){msgs.lastChild.textContent=(d.choices&&d.choices[0].message.content)||'(demo proxy offline — email hasan@hsndm.tech)';})
        .catch(function(){msgs.lastChild.textContent='(demo proxy offline — email hasan@hsndm.tech and I\'ll relay it)';});
    }
    send.addEventListener('click',function(){var v=input.value.trim();if(v){ask(v);input.value='';}});
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){var v=input.value.trim();if(v){ask(v);input.value='';}}});
  }

  /* ---- mobile nav toggle ---- */
  function initNav(){
    var burger=document.getElementById('hamburger');
    var links=document.getElementById('navlinks');
    if(!burger||!links)return;
    burger.addEventListener('click',function(){
      var open=links.classList.toggle('open');
      burger.classList.toggle('open',open);
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){links.classList.remove('open');burger.classList.remove('open');burger.setAttribute('aria-expanded','false');});
    });
  }

  /* ---- boot ---- */
  function boot(){
    initGlobe(document.getElementById('bg-canvas'));
    initGlow(); initReveal(); initCards(); initStatus(); initJulie(); initNav();
    var y=document.getElementById('year'); if(y)y.textContent=new Date().getFullYear();
  }
  if(document.readyState==='loading'){
    window.addEventListener('DOMContentLoaded',boot);
  } else {
    boot();
  }

  /* expose for pages that load THREE before DOMContentLoaded (CDN) */
  window.__hasanInitGlobe=initGlobe;
})();
