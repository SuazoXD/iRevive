// app.js - compatibilidad iOS9: usar var, no Promise fancy
(function () {
  // helpers
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function qsa(sel, root){ return (root||document).querySelectorAll(sel); }

  // menu toggle
  var hamburger = qs('#hamburger') || qs('#hamburger2') || qs('#hamburger3') || qs('#hamburger4') || qs('#hamburger5');
  var nav = qs('#mainNav') || qs('#nav2') || qs('#nav3') || qs('#nav4') || qs('#nav5');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function(){
      nav.className = nav.className.indexOf('open')===-1 ? nav.className+' open' : nav.className.replace(' open','');
    }, false);
  }
  // handle multiple hamburger buttons by delegation
  var hamburgers = qsa('.icon-btn');
  for (var i=0;i<hamburgers.length;i++){
    (function(btn){
      btn.addEventListener('click', function(){ /* noop: individual handlers exist */ }, false);
    })(hamburgers[i]);
  }

  // theme toggle
  function applyTheme(t) {
    if (t === 'night') { document.body.className = 'theme-night'; localStorage.setItem('irevive-theme','night'); }
    else { document.body.className = 'theme-day'; localStorage.setItem('irevive-theme','day'); }
    // update icon buttons text (if present)
    var toggles = document.querySelectorAll('[id^=themeToggle]');
    for (var j=0;j<toggles.length;j++){ toggles[j].textContent = (t === 'night') ? '🌙' : '☀️'; }
  }
  var saved = localStorage.getItem('irevive-theme') || 'day';
  applyTheme(saved);
  var toggleButtons = qsa('[id^=themeToggle]');
  for (var k=0;k<toggleButtons.length;k++){
    (function(btn){ btn.addEventListener('click', function(){ var current = (document.body.className==='theme-night') ? 'night' : 'day'; applyTheme(current==='night' ? 'day' : 'night'); }, false); })(toggleButtons[k]);
  }

  // card navigation on index
  var cards = document.querySelectorAll('.btn-card');
  for (var c=0;c<cards.length;c++){
    (function(card){ card.addEventListener('click', function(){ var href = card.getAttribute('data-href'); if (href) { window.location = href; } }, false);
      card.addEventListener('keydown', function(e){ if(e.key && (e.key==='Enter' || e.key===' ')) card.click(); }, false);
    })(cards[c]);
  }

  // back buttons
  var backBtns = document.querySelectorAll('[id^=backBtn]');
  for (var b=0;b<backBtns.length;b++){
    (function(btn){ btn.addEventListener('click', function(){ window.location = 'index.html'; }, false); })(backBtns[b]);
  }

  // global search: basic filter across lists (client-side)
  var globalSearch = qs('#globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', function(){
      var term = this.value.toLowerCase();
      var lists = document.querySelectorAll('.list');
      for (var li=0; li<lists.length; li++){
        var items = lists[li].querySelectorAll('article,li,.item');
        for (var it=0; it<items.length; it++){
          var txt = items[it].textContent || items[it].innerText || '';
          items[it].style.display = (txt.toLowerCase().indexOf(term)!==-1) ? '' : 'none';
        }
      }
    }, false);
  }

  // Add-to-home hint: simple
  var addHome = qs('#addHome');
  if (addHome){
    addHome.addEventListener('click', function(e){
      e.preventDefault();
      alert('Para añadir a la pantalla de inicio: en Safari, presiona el botón compartir → "Añadir a pantalla de inicio".');
    }, false);
  }

  // Register service worker (optional; iOS9 NO lo soporta; se intenta en navegadores que sí)
  if ('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('/sw.js').then(function(){ /* registered */ }, function(){ /* failed ignore */ });
    } catch(e) { /* ignore */ }
  }
})();
