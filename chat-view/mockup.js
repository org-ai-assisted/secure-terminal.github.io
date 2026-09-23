// Minimal, clearly non-functional demo wiring: switch theme / state / block-style,
// and let a session row look selected. Nothing here talks to a shell.
(function(){
  var root=document.documentElement, app=document.getElementById('app'),
      chat=document.getElementById('chat');

  function press(group, active){
    document.querySelectorAll('['+group+']').forEach(function(b){
      b.setAttribute('aria-pressed', b.getAttribute(group)===active ? 'true':'false');
    });
  }
  document.querySelectorAll('[data-theme-btn]').forEach(function(b){
    b.addEventListener('click',function(){ root.setAttribute('data-theme',b.dataset.themeBtn);
      press('data-theme-btn',b.dataset.themeBtn); });
  });
  document.querySelectorAll('[data-state-btn]').forEach(function(b){
    b.addEventListener('click',function(){ app.setAttribute('data-state',b.dataset.stateBtn);
      press('data-state-btn',b.dataset.stateBtn); });
  });
  document.querySelectorAll('[data-bs-btn]').forEach(function(b){
    b.addEventListener('click',function(){ chat.setAttribute('data-blockstyle',b.dataset.bsBtn);
      press('data-bs-btn',b.dataset.bsBtn); });
  });
  document.querySelectorAll('#sessions .srow').forEach(function(r){
    r.addEventListener('click',function(){
      document.querySelectorAll('#sessions .srow').forEach(function(x){x.classList.remove('active');});
      r.classList.add('active');
    });
  });
  var cb=document.getElementById('collapsebtn');
  if(cb){ cb.addEventListener('click',function(){ var on=app.classList.toggle('collapsed');
    cb.title = on ? 'Expand sidebar' : 'Collapse sidebar'; }); }
  // unicode setting chip cycles the display mode of the inline demo block
  var umodes=['box','show','reveal','detail'],
      umlabel={box:'Box',show:'Show',reveal:'Reveal',detail:'Detail'};
  document.querySelectorAll('.chip.set').forEach(function(chip){
    if(!/unicode/i.test(chip.textContent)) return;
    chip.addEventListener('click',function(){
      var cur=chat.getAttribute('data-umode')||'show';
      var nx=umodes[(umodes.indexOf(cur)+1)%umodes.length];
      chat.setAttribute('data-umode',nx);
      var b=chip.querySelector('b'); if(b) b.textContent=umlabel[nx];
      var cap=document.getElementById('umcap'); if(cap) cap.textContent=umlabel[nx];
    });
  });
  // open scrolled to the newest block (real chat behavior), so the latest output shows
  try{ chat.scrollTop = chat.scrollHeight; }catch(e){}
})();
