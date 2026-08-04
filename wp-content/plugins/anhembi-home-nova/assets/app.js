(function(){
  /* reveal */
  var ioFired=false;
  var io=new IntersectionObserver(function(es){ioFired=true;es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal,.rise,.img-reveal').forEach(function(e){io.observe(e);});
  setTimeout(function(){if(!ioFired){document.querySelectorAll('.reveal,.rise,.img-reveal').forEach(function(e){e.classList.add('in');});}},3000);

  /* count-up generico (ex: "25 anos" na Sobre) */
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    document.querySelectorAll('.count-up[data-count]').forEach(function(el){
      var done=false;
      var cio=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting&&!done){done=true;cio.unobserve(el);
          var end=+el.getAttribute('data-count'),t0=null,dur=1400;
          function tk(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);el.textContent=''+Math.round((1-Math.pow(1-p,3))*end);if(p<1)requestAnimationFrame(tk);}
          requestAnimationFrame(tk);
          setTimeout(function(){el.textContent=''+end;},1600);
        }
      });},{threshold:.6});
      cio.observe(el);
    });
  }

  /* count-up stats */
  var stats=document.getElementById('stats');
  if(stats){
    var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
    var statsDone=false;
    function runStats(sc){
      if(statsDone)return; statsDone=true;
      sc.querySelectorAll('.stat').forEach(function(s){s.classList.add('in-stat');});
      sc.querySelectorAll('.n').forEach(function(el){
        var end=+el.getAttribute('data-count'),pre=el.getAttribute('data-prefix')||'',suf=el.getAttribute('data-suffix')||'';
        if(reduce){el.textContent=pre+end+suf;return;}
        var t0=null,dur=1300;
        function tick(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var val=Math.round((1-Math.pow(1-p,3))*end);el.textContent=pre+val+suf;if(p<1)requestAnimationFrame(tick);}
        requestAnimationFrame(tick);
        setTimeout(function(){el.textContent=pre+end+suf;},1700);
      });
    }
    var sfired=false;
    var sio=new IntersectionObserver(function(es){sfired=true;es.forEach(function(e){if(e.isIntersecting){sio.unobserve(e.target);runStats(e.target);}});},{threshold:.4});
    sio.observe(stats);
    setTimeout(function(){if(!sfired)runStats(stats);},3200);
  }

  /* ticker */
  var tick=document.getElementById('ticker');
  if(tick){
    var msgs=['Minicursos de Férias 2026 · gratuitos','Vestibular 2026/2 · inscrições abertas','Feira das Profissões · 02 de agosto','Prova online com resultado na hora','Hands On · comunicação e negócios','+40 empresas parceiras na região'];
    var html=msgs.map(function(m){return '<span>'+m+'</span>';}).join('');
    tick.innerHTML=html+html;
  }

  /* partner logos */
  var logos=[
    ['assets/img/parceiros/microsoft.webp','Microsoft'],['assets/img/parceiros/embraer.webp','Embraer'],['assets/img/parceiros/saint-gobain.webp','Saint-Gobain'],['assets/img/parceiros/tqs.webp','TQS'],
    ['assets/img/parceiros/fidere.webp','Fidere'],['assets/img/parceiros/cordier.webp','Cordier Investimentos'],['assets/img/parceiros/apter.webp','Apter'],['assets/img/parceiros/blue-royal.webp','Blue Royal'],
    ['assets/img/parceiros/ejem.webp','EJEM'],['assets/img/parceiros/new-moveis.webp','New Moveis'],['assets/img/parceiros/oficina-da-costura.webp','Oficina da Costura']
  ];
  var lt=document.getElementById('logoTrack');
  if(lt){
    var AB=window.__ASSET_BASE||'';
    var one=logos.map(function(l){return '<div class="logo-m"><img src="'+AB+l[0]+'" alt="'+l[1]+'" loading="lazy"></div>';}).join('');
    lt.innerHTML=one+one;
  }

  /* ACONTECE reels */
  var ITEMS=[
    {chip:'Curso gratuito',c:'#06ae8f',date:'20 a 24 de julho',title:'Minicursos de Férias 2026',sub:'Experimente antes de escolher',desc:'De 20 a 24 de julho, mais de 10 minicursos gratuitos e presenciais para você conhecer as áreas na prática, com professores do campus. Vagas limitadas.',cta:'Garantir minha vaga',isnew:true},
    {chip:'Inscrições',c:'#a42c81',date:'Vestibular 2026/2',title:'Prova online, do seu jeito',sub:'Resultado na hora',desc:'Faça a prova de casa, use sua nota do ENEM ou entre por transferência. O processo é rápido, sem burocracia, e você já sai sabendo o resultado.',cta:'Fazer inscrição'},
    {chip:'Evento',c:'#00796c',date:'02 de agosto, sábado',title:'Feira das Profissões',sub:'Um dia pra decidir seu futuro',desc:'Passe o sábado no campus, converse com coordenadores e alunos de cada curso, visite os laboratórios e tire todas as dúvidas antes de escolher.',cta:'Confirmar presença'},
    {chip:'Podcast',c:'#005347',date:'Novo episódio',title:'Conversa de Valor',sub:'Carreira e mercado, sem rodeio',desc:'No novo episódio, o diretor geral Sandro Vidotto fala sobre o que o mercado espera de quem está se formando e os bastidores da faculdade.',cta:'Ouvir agora'},
    {chip:'Na mídia',c:'#4a5f59',date:'Portal Band',title:'Anhembi na imprensa',sub:'Direito em pauta',desc:'A Feira de Direito Constitucional da faculdade debateu os direitos da criança em Sorocaba e virou notícia nos principais veículos da região.',cta:'Ler a notícia'},
    {chip:'Evento',c:'#84bc45',date:'15 de agosto',title:'Hands On',sub:'Comunicação e negócios na prática',desc:'Workshops abertos à comunidade, com profissionais do mercado, reunindo alunos e quem quer conhecer as áreas de comunicação e negócios.',cta:'Quero participar'}
  ];
  var rail=document.getElementById('rail');
  var ov=document.getElementById('ov');
  function arrow(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';}
  if(rail&&ov){
  ITEMS.forEach(function(it,i){
    var el=document.createElement('button');
    el.className='reel';el.style.setProperty('--c',it.c);el.style.setProperty('--fd',(i*0.5)+'s');el.setAttribute('data-i',i);
    el.setAttribute('aria-label',it.title);
    el.innerHTML=
      '<div class="cover"></div><div class="tri"></div><div class="glow"></div>'+
      ''+
      '<div class="top"><span class="chip">'+it.chip+'</span><span class="exp"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></span></div>'+
      '<div class="body"><div class="date">'+it.date+'</div><h3>'+it.title+'</h3><div class="desc">'+it.desc+'</div><span class="go">Saiba mais '+arrow()+'</span></div>';
    el.addEventListener('click',function(){openModal(i);});
    rail.appendChild(el);
  });

  function openModal(i){
    var it=ITEMS[i];
    document.getElementById('mbanner').style.setProperty('--c',it.c);
    document.getElementById('m-chip').textContent=it.chip;
    document.getElementById('m-chip2').textContent=it.chip;
    document.getElementById('m-chip2').style.setProperty('--c',it.c);
    document.getElementById('m-btitle').textContent=it.title;
    document.getElementById('m-bsub').textContent=it.sub;
    document.getElementById('m-date').textContent=it.date;
    document.getElementById('m-title').textContent=it.title;
    document.getElementById('m-desc').textContent=it.desc;
    document.getElementById('m-link').textContent=it.cta;
    ov.classList.add('on');document.body.style.overflow='hidden';
  }
  function closeModal(){ov.classList.remove('on');document.body.style.overflow='';}
  document.getElementById('mclose').addEventListener('click',closeModal);
  document.getElementById('m-more').addEventListener('click',closeModal);
  ov.addEventListener('click',function(e){if(e.target===ov)closeModal();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal();});

  /* rail nav */
  var prev=document.getElementById('prev'),next=document.getElementById('next');
  function step(){return Math.min(rail.clientWidth*.8,300);}
  function upd(){prev.disabled=rail.scrollLeft<8;next.disabled=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-8;}
  prev.addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:'smooth'});});
  next.addEventListener('click',function(){rail.scrollBy({left:step(),behavior:'smooth'});});
  rail.addEventListener('scroll',upd,{passive:true});upd();
  }

  /* form */
  var lf=document.getElementById('lf');
  if(lf){lf.addEventListener('submit',function(ev){ev.preventDefault();if(!lf.checkValidity()){lf.reportValidity();return;}lf.querySelectorAll('.field,.field-row,button[type=submit],.form-note').forEach(function(n){n.style.display='none';});document.getElementById('ok').style.display='block';});}

  /* mobile menu */
  var burger=document.getElementById('burger'),mobmenu=document.getElementById('mobmenu');
  if(burger&&mobmenu){
    burger.addEventListener('click',function(){var o=mobmenu.classList.toggle('open');burger.setAttribute('aria-expanded',o);});
    mobmenu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mobmenu.classList.remove('open');});});
  }

  /* banner slider (mantido) */
  var track=document.getElementById('bslides');
  if(track){
    var n=track.children.length,dots=document.getElementById('bdots'),i=0,timer;
    function go(x){i=(x+n)%n;track.style.transform='translateX('+(-i*100)+'%)';for(var k=0;k<dots.children.length;k++)dots.children[k].classList.toggle('on',k===i);}
    for(var k=0;k<n;k++){var d=document.createElement('i');(function(x){d.addEventListener('click',function(){go(x);rst();});})(k);dots.appendChild(d);}
    document.querySelector('.barrow.l').addEventListener('click',function(){go(i-1);rst();});
    document.querySelector('.barrow.r').addEventListener('click',function(){go(i+1);rst();});
    function auto(){timer=setInterval(function(){go(i+1);},6000);}
    function rst(){clearInterval(timer);auto();}
    go(0);auto();
  }

  /* magnetic CTA */
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('.magnetic').forEach(function(el){
      el.addEventListener('pointermove',function(e){
        var r=el.getBoundingClientRect();
        var mx=(e.clientX-(r.left+r.width/2))/r.width;
        var my=(e.clientY-(r.top+r.height/2))/r.height;
        el.style.transform='translate('+(mx*10)+'px,'+(my*10-2)+'px)';
      });
      el.addEventListener('pointerleave',function(){el.style.transform='';});
    });
  }

  /* glow-card: brilho seguindo o cursor (adaptado do morphin, sutil) */
  document.querySelectorAll('.glow-card').forEach(function(el){
    el.addEventListener('pointermove',function(e){
      var r=el.getBoundingClientRect();
      el.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
      el.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  });

  /* hello: o botao do card ja escolhe a opcao no formulario de agendamento */
  var selAgendar=document.getElementById('agendarSelect');
  if(selAgendar){
    document.querySelectorAll('[data-agendar]').forEach(function(b){
      b.addEventListener('click',function(){
        selAgendar.value=b.getAttribute('data-agendar');
        selAgendar.dispatchEvent(new Event('change'));
      });
    });
  }

  /* video do campus: fachada, so carrega o YouTube quando o visitante clica */
  var play=document.querySelector('.tour-play');
  if(play){
    play.addEventListener('click',function(){
      var id=play.getAttribute('data-yt'),moldura=play.parentNode;
      var f=document.createElement('iframe');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&modestbranding=1';
      f.title='Vídeo de apresentação do campus';
      f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen=true;
      moldura.innerHTML='';moldura.appendChild(f);
    });
  }

  /* filtro reaproveitavel; aceita mais de um grupo de chips (area + grau + modalidade) */
  function montaFiltro(grade,seletorItem,grupos,conta,unidade){
    if(!grade)return null;
    grupos=(grupos||[]).filter(function(g){return g&&g.barra;});
    if(!grupos.length)return null;
    var itens=[].slice.call(grade.querySelectorAll(seletorItem));
    grupos.forEach(function(g){
      g.attr=g.attr||'data-cat';
      g.valor='tudo';
      g.chips=[].slice.call(g.barra.querySelectorAll('.gal-f'));
    });
    function visiveis(){return itens.filter(function(b){return !b.classList.contains('off');});}
    function tem(b,g,valor){
      if(valor==='tudo')return true;
      return (b.getAttribute(g.attr)||'').split(/\s+/).indexOf(valor)>-1;
    }
    function casa(b,g){return tem(b,g,g.valor);}
    /* quantos itens sobram se este grupo valesse "valor", respeitando os outros filtros */
    function quantos(g,valor){
      return itens.filter(function(b){
        return grupos.every(function(o){return o===g?tem(b,o,valor):casa(b,o);});
      }).length;
    }
    function aplicar(){
      /* se a escolha de um grupo ficou impossivel depois de outra escolha, ele volta pra "tudo" */
      for(var passo=0;passo<grupos.length;passo++){
        var mudou=false;
        grupos.forEach(function(g){
          if(g.valor!=='tudo'&&quantos(g,g.valor)===0){g.valor='tudo';mudou=true;}
        });
        if(!mudou)break;
      }
      itens.forEach(function(b){
        b.classList.toggle('off',!grupos.every(function(g){return casa(b,g);}));
      });
      grupos.forEach(function(g){
        g.chips.forEach(function(f){
          var valor=f.getAttribute('data-cat');
          var on=valor===g.valor;
          f.classList.toggle('on',on);f.setAttribute('aria-pressed',on?'true':'false');
          /* opcao que nao levaria a nenhum resultado some da barra */
          var vazia=(valor!=='tudo'&&!on&&quantos(g,valor)===0);
          f.classList.toggle('sem-resultado',vazia);
          f.disabled=vazia;
        });
      });
      if(conta){var n=visiveis().length;conta.textContent=n+' '+(n===1?unidade[0]:unidade[1]);}
    }
    grupos.forEach(function(g){
      g.chips.forEach(function(f){
        f.addEventListener('click',function(){g.valor=f.getAttribute('data-cat');aplicar();});
      });
    });
    aplicar();
    return visiveis;
  }

  montaFiltro(document.getElementById('evGrid'),'.ev-card',
              [{barra:document.getElementById('evFiltros')}],
              document.getElementById('evConta'),['edição','edições']);

  montaFiltro(document.getElementById('lcGrid'),'.curso-card',
              [{barra:document.getElementById('lcArea')},
               {barra:document.getElementById('lcGrau'), attr:'data-grau'},
               {barra:document.getElementById('lcMod'),  attr:'data-mod'}],
              document.getElementById('lcConta'),['curso','cursos']);

  /* galeria do campus: filtro por categoria + lightbox (sem dependencia externa) */
  var gal=document.getElementById('campusGrid');
  if(gal){
    var itens=[].slice.call(gal.querySelectorAll('.gal-item'));
    var visiveis=montaFiltro(gal,'.gal-item',[{barra:document.querySelector('.gal-filtros')}],
                             document.getElementById('galConta'),['foto','fotos']);

    var lb=document.getElementById('lb');
    if(lb){
      var lbImg=lb.querySelector('.lb-img'),lbCap=lb.querySelector('.lb-cap'),
          lbPos=lb.querySelector('.lb-pos'),ultimoFoco=null,atual=0,lista=[];
      function pinta(){
        var b=lista[atual];if(!b)return;
        var pequena=b.getAttribute('data-full-m');
        lbImg.src=(pequena&&innerWidth<=700)?pequena:b.getAttribute('data-full');
        lbImg.alt=b.getAttribute('data-cap');
        lbCap.textContent=b.getAttribute('data-cap');
        lbPos.textContent=(atual+1)+' de '+lista.length;
      }
      function abre(b){
        lista=visiveis();atual=lista.indexOf(b);if(atual<0)atual=0;
        ultimoFoco=b;pinta();lb.classList.add('on');document.body.style.overflow='hidden';
        lb.querySelector('.lb-close').focus();
      }
      function fecha(){
        lb.classList.remove('on');document.body.style.overflow='';
        lbImg.removeAttribute('src');
        if(ultimoFoco)ultimoFoco.focus();
      }
      function anda(d){if(!lista.length)return;atual=(atual+d+lista.length)%lista.length;pinta();}
      itens.forEach(function(b){b.addEventListener('click',function(){abre(b);});});
      lb.querySelector('.lb-close').addEventListener('click',fecha);
      lb.querySelector('.lb-prev').addEventListener('click',function(){anda(-1);});
      lb.querySelector('.lb-next').addEventListener('click',function(){anda(1);});
      lb.addEventListener('click',function(e){if(e.target===lb)fecha();});
      document.addEventListener('keydown',function(e){
        if(!lb.classList.contains('on'))return;
        if(e.key==='Escape')fecha();
        else if(e.key==='ArrowLeft')anda(-1);
        else if(e.key==='ArrowRight')anda(1);
      });
    }
  }

  /* nav-pill: pilula que desliza entre os itens (adaptado do morphin) */
  var nav=document.querySelector('nav.main'), pill=document.getElementById('navPill');
  if(nav&&pill){
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('mouseenter',function(){
        var nr=nav.getBoundingClientRect(), ar=a.getBoundingClientRect();
        pill.style.left=(ar.left-nr.left)+'px';
        pill.style.width=ar.width+'px';
      });
    });
  }
})();