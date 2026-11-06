/* Gabriel Basso — progressive enhancement, no external dependencies.
 * All interactive concept form flows are client-side simulations; no data is transmitted.
 */
(() => {
  'use strict';
  const $ = (s, context = document) => context.querySelector(s);
  const $$ = (s, context = document) => [...context.querySelectorAll(s)];
  const safeText = v => String(v ?? '');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Resolve assets from the actual script location (supports local file:// and hosted subfolders).
  const imageBase = new URL('../img/', document.currentScript.src);
  const imageAsset = name => new URL(name, imageBase).href;

  // Navigation / accessibility.
  $$('[data-menu]').forEach(toggle => {
    const menu = document.getElementById(toggle.dataset.menu);
    if (!menu) return;
    const close = () => {toggle.setAttribute('aria-expanded','false'); menu.classList.remove('open');};
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('open',open);
      if(open) menu.querySelector('a')?.focus();
    });
    menu.addEventListener('click',event => { if(event.target.closest('a'))close(); });
    document.addEventListener('keydown',event => {if(event.key === 'Escape'){close();toggle.focus();}});
    document.addEventListener('pointerdown',event => {if(!menu.contains(event.target) && !toggle.contains(event.target))close();});
  });
  $$('[data-current-year]').forEach(x => {x.textContent = new Date().getFullYear();});

  // Motion respectful of preference & availability of IntersectionObserver.
  const reveals = $$('.reveal');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{rootMargin:'0px 0px -25px 0px',threshold:.08});
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  // Contact form opens draft in email app; never claims message was sent.
  const mailForm = $('[data-mailto-form]');
  if (mailForm) mailForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!mailForm.reportValidity()) return;
    const name = $('[name="name"]',mailForm).value.trim();
    const email = $('[name="email"]',mailForm).value.trim();
    const message = $('[name="message"]',mailForm).value.trim();
    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(`Olá, Gabriel!\n\n${message}\n\nNome: ${name}\nE-mail: ${email}\n\nMensagem preparada no website (o envio depende de confirmação).`);
    $('[data-mailto-status]',mailForm).textContent='Seu aplicativo de e-mail será aberto com a mensagem preparada. Confirme o envio nele.';
    window.location.href = `mailto:gabrielbassoadc@outlook.com?subject=${subject}&body=${body}`;
  });

  // Actual interactive preview: iframe resizing. Nothing decorative.
  const controls = $('[data-preview-controls]');
  if (controls) {
    const frame = $('[data-preview-frame]');
    $$('[data-mode]',controls).forEach(button => button.addEventListener('click', () => {
      const mobile = button.dataset.mode==='mobile';
      frame.classList.toggle('mobile',mobile);
      $$('[data-mode]',controls).forEach(b => {
        const on = b === button;
        b.classList.toggle('active',on);
        b.setAttribute('aria-pressed', String(on));
      });
    }));
  }

  // Bruma — spatial exploration. Independent graphic views of the same conceptual residence.
  const floorplan = $('[data-floorplan]');
  if (floorplan) {
    const rooms = {
      patio:{title:'Pátio interno',text:'O jardim organiza a casa ao redor da luz natural, da vegetação e da água.',meta:'Vegetação · Água · Travertino',image:'casa-patio.svg',alt:'Pátio interno da Casa Pátio, ilustração conceitual'},
      sala:{title:'Sala de estar',text:'Um ambiente aberto para o jardim, com painéis de madeira clara e superfícies táteis.',meta:'Madeira clara · Vidro · Luz natural',image:'casa-sala.svg',alt:'Estar da Casa Pátio, ilustração conceitual'},
      cozinha:{title:'Cozinha integrada',text:'O plano de trabalho acompanha a transparência e a fluidez dos espaços compartilhados.',meta:'Pedra natural · Madeira · Integração',image:'casa-cozinha.svg',alt:'Cozinha da Casa Pátio, ilustração conceitual'},
      suite:{title:'Suíte privativa',text:'Um espaço mais protegido, com materiais claros e luz indireta para uma atmosfera de descanso.',meta:'Linho · Madeira · Intimidade',image:'casa-suite.svg',alt:'Suíte da Casa Pátio, ilustração conceitual'}
    };
    $$('[data-room]',floorplan).forEach(button => button.addEventListener('click', () => {
      $$('[data-room]',floorplan).forEach(b => {b.classList.remove('active');b.setAttribute('aria-pressed','false');});
      button.classList.add('active');button.setAttribute('aria-pressed','true');
      const room = rooms[button.dataset.room];
      if(!room) return;
      $('[data-room-title]',floorplan).textContent=room.title;
      $('[data-room-text]',floorplan).textContent=room.text;
      $('[data-room-meta]',floorplan).textContent=room.meta;
      const image=$('.room-result-image',floorplan);
      image.src=imageAsset(room.image); image.alt=room.alt;
    }));
  }

  // Bruma — two distinct scene renders with the same architecture & viewpoint.
  const lighting = $('[data-lighting-tool]');
  if(lighting) $$('[data-light]',lighting).forEach(button=>button.addEventListener('click',()=>{
    const isDay=button.dataset.light==='dia';
    const scene=$('[data-lighting-image]',lighting);
    scene.src=imageAsset(isDay?'refugio-dia.svg':'refugio-noite.svg');
    scene.alt=isDay?'Ilustração diurna do Refúgio Neblina':'Ilustração noturna do Refúgio Neblina';
    $$('[data-light]',lighting).forEach(x=>x.setAttribute('aria-pressed',String(x===button)));
  }));

  // Bruma — material library; no fake commerce actions.
  const materials=$('[data-materials]');
  if(materials){
    const details={
      nogueira:['Nogueira','Madeira de tom profundo, usada em painéis e mobiliário para criar continuidade e calor visual.'],
      travertino:['Travertino','Pedra de variações suaves, prevista para superfícies de destaque e para dar unidade material.'],
      linho:['Linho','Tecido natural cuja textura discreta contribui para uma atmosfera acolhedora e tátil.'],
      bronze:['Bronze','Detalhes metálicos de acabamento quente que pontuam iluminação, puxadores e acessórios.']
    };
    $$('[data-material]',materials).forEach(button=>button.addEventListener('click',()=>{
      const key=button.dataset.material, d=details[key];if(!d)return;
      $$('[data-material]',materials).forEach(x=>x.setAttribute('aria-pressed',String(x===button)));
      $('[data-material-title]').textContent=d[0];
      $('[data-material-description]').textContent=d[1];
      const image=$('[data-material-image]');image.src=imageAsset(`material-${key}.svg`);image.alt=`Amostra gráfica conceitual de ${d[0]}`;
    }));
  }

  const appendReview=(root,fields)=>{
    root.replaceChildren();
    fields.forEach(([key,value])=>{
      const row=document.createElement('div');
      const name=document.createElement('strong');name.textContent=safeText(key);
      const data=document.createElement('span');data.textContent=safeText(value);
      row.append(name,data);root.append(row);
    });
  };
  const formatDate = date => {
    if(!date) return '';
    const [y,m,d] = date.split('-');
    return `${d}/${m}/${y}`;
  };
  const showError = (root,message) => {
    const active=$('.booking-step.active,.quote-step.active',root);
    const error=$('[data-booking-error],[data-quote-error]',active);
    if(error){error.textContent=message;error.hidden=!message;}
  };

  // Alva — non-persistent booking simulation.
  const booking=$('[data-booking]');
  if(booking){
    let step=1, selectedTime='';
    const date=$('[name="date"]',booking);
    const today=new Date();
    const localToday=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    date.min=localToday;
    const showStep=n=>{
      step=n;
      $$('[data-booking-step]',booking).forEach(el=>el.classList.toggle('active',Number(el.dataset.bookingStep)===n));
      $$('.booking-progress span',booking).forEach((el,i)=>el.classList.toggle('active',i<n));
      showError(booking,'');
      booking.scrollIntoView({block:'start',behavior:reducedMotion?'instant':'smooth'});
    };
    const validate=()=>{
      if(step===1){
        for(const name of ['specialty','date']){
          const el=$(`[name="${name}"]`,booking);
          if(!el.checkValidity()){el.reportValidity();showError(booking,'Escolha a especialidade e a data demonstrativa.');return false;}
        }
      }
      if(step===2){
        if(!selectedTime){showError(booking,'Selecione um dos horários ilustrativos.');return false;}
        for(const name of ['name','email']){
          const el=$(`[name="${name}"]`,booking);
          if(!el.checkValidity()){el.reportValidity();showError(booking,'Informe um nome e um e-mail válidos para a simulação.');return false;}
        }
      }
      return true;
    };
    $$('[data-time]',booking).forEach(button=>button.addEventListener('click',()=>{
      selectedTime=button.dataset.time;
      $$('[data-time]',booking).forEach(b=>{
        b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));
      });
      showError(booking,'');
    }));
    $$('[data-booking-next]',booking).forEach(button=>button.addEventListener('click',()=>{
      if(!validate())return;
      if(step===2){
        appendReview($('[data-booking-summary]',booking),[
          ['Especialidade',$('[name="specialty"]',booking).value],
          ['Data ilustrativa',formatDate(date.value)],
          ['Horário ilustrativo',selectedTime],
          ['Nome de exemplo',$('[name="name"]',booking).value.trim()],
          ['E-mail de exemplo',$('[name="email"]',booking).value.trim()]
        ]);
      }
      if(step<4)showStep(step+1);
    }));
    $$('[data-booking-back]',booking).forEach(b=>b.addEventListener('click',()=>showStep(Math.max(step-1,1))));
    $('[data-booking-reset]',booking).addEventListener('click',()=>{
      booking.reset();selectedTime='';
      $$('[data-time]',booking).forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});
      showStep(1);
    });
    booking.addEventListener('submit',e=>e.preventDefault());
  }

  // Prumo — conditional quote-form simulation, with no network requests or storage.
  const quoteForm=$('[data-quote]');
  if(quoteForm){
    let step=1;
    const service=$('[name="service"]',quoteForm);
    const urgency=$('[name="urgency"]',quoteForm);
    const emergency=$('[name="emergency"]',quoteForm);
    const serviceToLabel=value=>service.querySelector(`option[value="${CSS.escape(value)}"]`)?.textContent||value;
    const showConditionals=()=>{
      const urgent=urgency.value==='Urgente';
      $('[data-cond="urgente"]',quoteForm).classList.toggle('show',urgent);
      emergency.required=urgent;
      if(!urgent)emergency.value='';
      $('[data-cond="preventiva"]',quoteForm).classList.toggle('show',service.value==='manutencao-preventiva');
    };
    service.addEventListener('change',showConditionals);
    urgency.addEventListener('change',showConditionals);
    const initialService=new URLSearchParams(location.search).get('servico');
    if(initialService && [...service.options].some(o=>o.value===initialService))service.value=initialService;
    showConditionals();
    const showStep=n=>{
      step=n;
      $$('[data-quote-step]',quoteForm).forEach(el=>el.classList.toggle('active',Number(el.dataset.quoteStep)===n));
      $$('.quote-progress span',quoteForm).forEach((el,i)=>el.classList.toggle('active',i<n));
      showError(quoteForm,'');
      quoteForm.scrollIntoView({block:'start',behavior:reducedMotion?'instant':'smooth'});
    };
    const validate=()=>{
      const fields=step===1?['service','property','region','urgency',...(urgency.value==='Urgente'?['emergency']:[])]:['description','contact','email'];
      for (const name of fields){
        const el=$(`[name="${name}"]`,quoteForm);
        if(!el.checkValidity()){
          el.reportValidity();showError(quoteForm,'Preencha os campos obrigatórios desta etapa antes de continuar.');return false;
        }
      }
      return true;
    };
    $$('[data-quote-next]',quoteForm).forEach(button=>button.addEventListener('click',()=>{
      if(!validate())return;
      if(step===2){
        const property=$('[name="property"]',quoteForm);
        const fields=[
          ['Serviço',serviceToLabel(service.value)],
          ['Tipo de imóvel',property.value],
          ['Região',$('[name="region"]',quoteForm).value.trim()],
          ['Prioridade',urgency.value],
          ...(urgency.value==='Urgente'?[['Risco imediato',emergency.value]]:[]),
          ...(service.value==='manutencao-preventiva'?[['Periodicidade',$('[name="frequency"]',quoteForm).value]]:[]),
          ['Descrição',$('[name="description"]',quoteForm).value.trim()],
          ['Nome de exemplo',$('[name="contact"]',quoteForm).value.trim()],
          ['E-mail de exemplo',$('[name="email"]',quoteForm).value.trim()]
        ];
        appendReview($('[data-quote-summary]',quoteForm),fields);
      }
      showStep(step+1);
    }));
    $$('[data-quote-back]',quoteForm).forEach(b=>b.addEventListener('click',()=>showStep(Math.max(1,step-1))));
    $('[data-quote-complete]',quoteForm).addEventListener('click',()=>{
      $('[data-quote-done]',quoteForm).hidden=false;
      $('[data-quote-complete]',quoteForm).hidden=true;
    });
    $('[data-quote-reset]',quoteForm).addEventListener('click',()=>{
      quoteForm.reset();
      $('[data-quote-done]',quoteForm).hidden=true;
      $('[data-quote-complete]',quoteForm).hidden=false;
      showConditionals();showStep(1);
    });
    quoteForm.addEventListener('submit',e=>e.preventDefault());
  }

  // Risco — functional contrast experiment and lightweight pointer response.
  $$('[data-risco-swap]').forEach(panel=>{
    $('[data-risco-palette]',panel)?.addEventListener('click',()=>{
      const inverse=panel.dataset.inverse==='true';
      panel.dataset.inverse=String(!inverse);
      panel.style.background=inverse?'#D9FF3F':'#17191D';
      panel.style.color=inverse?'#151515':'#D9FF3F';
      $('[data-risco-palette]',panel).textContent=inverse?'Inverter linguagem ↗':'Voltar à linguagem original ↗';
      const button=$('[data-risco-palette]',panel);
      button.style.color='inherit';button.style.borderColor='currentColor';
    });
  });
  if(!reducedMotion){
    $$('[data-risco-parallax]').forEach(panel=>{
      panel.addEventListener('pointermove',event=>{
        if(event.pointerType==='touch')return;
        const rect=panel.getBoundingClientRect();
        const x=((event.clientX-rect.left)/rect.width-.5)*15;
        const y=((event.clientY-rect.top)/rect.height-.5)*12;
        panel.style.setProperty('--pointer-x',`${x}px`);
        panel.style.setProperty('--pointer-y',`${y}px`);
      },{passive:true});
      panel.addEventListener('pointerleave',()=>{panel.style.setProperty('--pointer-x','0px');panel.style.setProperty('--pointer-y','0px');});
    });
  }
})();
