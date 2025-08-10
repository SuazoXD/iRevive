// reader.js - simple reader + swipe gestures (iOS9 friendly)
(function(){
  function qs(s){ return document.querySelector(s); }
  // Simple in-page reader: create an overlay and show image or iframe
  window.showReader = function(options){
    var panel = qs('#readerPanel');
    if (!panel) return;
    panel.innerHTML = '';
    panel.className = 'reader-panel open';
    panel.style.background = window.getComputedStyle(document.body).backgroundColor;
    if (options.type === 'image') {
      var img = document.createElement('img');
      img.className = 'reader-page';
      img.src = options.src;
      panel.appendChild(img);
      attachSwipe(panel, img);
    } else if (options.type === 'pdf') {
      var iframe = document.createElement('iframe');
      iframe.src = options.src;
      iframe.style.width='100%';
      iframe.style.height='100%';
      iframe.style.border='0';
      panel.appendChild(iframe);
    } else {
      panel.textContent = 'No hay vista disponible';
    }
    // close on tap outside
    panel.addEventListener('click', function(e){
      if (e.target === panel) { panel.className = 'reader-panel'; panel.innerHTML=''; }
    }, false);
  };

  function attachSwipe(panel, element){
    var startX=0,startY=0,deltaX=0,deltaY=0;
    var locked=false;
    element.addEventListener('touchstart', function(e){
      if (!e.touches || e.touches.length===0) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      locked = true;
    }, false);
    element.addEventListener('touchmove', function(e){
      if (!locked) return;
      deltaX = e.touches[0].clientX - startX;
      deltaY = e.touches[0].clientY - startY;
      // move slightly for feedback
      element.style.transform = 'translateX('+deltaX+'px)';
      e.preventDefault();
    }, false);
    element.addEventListener('touchend', function(e){
      locked = false;
      element.style.transform = '';
      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) window.dispatchEvent(new CustomEvent('reader-swipe','{detail:1}'));
        else window.dispatchEvent(new CustomEvent('reader-swipe','{detail:-1}'));
      }
      deltaX = 0; deltaY = 0;
    }, false);
  }

})();
