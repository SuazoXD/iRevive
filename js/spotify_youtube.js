// spotify_youtube.js - uses simple oEmbed and iframe embeds where possible.
// NOTE: For real search APIs you need API keys (YouTube Data API) or Spotify credentials.
// Here we provide simple, user-initiated search using JSON endpoints where possible.
(function(){
  function qs(s){ return document.querySelector(s); }

  // Youtube: simple search via YouTube Data API (optional). If API_KEY is absent, we fallback to open search page.
  var YT_API_KEY = '';
  if (window.CONFIG && window.CONFIG.YT_API_KEY) YT_API_KEY = window.CONFIG.YT_API_KEY;

  function renderYtResults(items){
    var box = qs('#ytResults');
    if (!box) return;
    box.innerHTML = '';
    for(var i=0;i<items.length;i++){
      var it = items[i];
      var el = document.createElement('article');
      el.className = 'item';
      var title = document.createElement('div'); title.textContent = it.snippet.title; title.style.fontWeight='600';
      var thumb = document.createElement('img'); thumb.src = it.snippet.thumbnails && it.snippet.thumbnails.default && it.snippet.thumbnails.default.url;
      thumb.style.height='60px'; thumb.style.marginRight='8px';
      var play = document.createElement('button'); play.textContent = 'Reproducir';
      (function(videoId){
        play.addEventListener('click', function(){
          var p = qs('#ytPlayer');
          p.innerHTML = '<iframe width="100%" height="200" src="https://www.youtube.com/embed/'+videoId+'?rel=0&playsinline=1" frameborder="0" allowfullscreen></iframe>';
          p.style.display='block';
        }, false);
      })(it.id.videoId);
      el.appendChild(thumb); el.appendChild(title); el.appendChild(play);
      box.appendChild(el);
    }
  }

  // Simple YT search using API key (if provided)
  if (qs('#ytSearchBtn')) {
    qs('#ytSearchBtn').addEventListener('click', function(){
      var q = qs('#ytQuery').value || '';
      if (!q) return alert('Escribe algo para buscar');
      if (!YT_API_KEY) {
        // fallback: open YouTube search in new tab
        window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q), '_blank');
        return;
      }
      var xhr = new XMLHttpRequest();
      var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q='+encodeURIComponent(q)+'&key='+YT_API_KEY;
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function(){
        if (xhr.readyState!==4) return;
        if (xhr.status===200) {
          var json = JSON.parse(xhr.responseText);
          renderYtResults(json.items || []);
        } else {
          alert('No se pudo buscar (CORS o API key). Abriendo YouTube en nuevo tab.');
          window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(q), '_blank');
        }
      };
      xhr.send(null);
    }, false);
  }

  // Spotify search: since Spotify Web API needs OAuth for playback/search, we use oEmbed or open in Spotify app.
  if (qs('#spotifySearchBtn')) {
    var spotifyBtn = qs('#spotifySearchBtn');
    spotifyBtn.addEventListener('click', function(){
      var q = qs('#spotifyQuery').value || '';
      if (!q) return alert('Escribe algo para buscar');
      // open Spotify search results page (lightweight)
      var url = 'https://open.spotify.com/search/'+encodeURIComponent(q);
      var box = qs('#spotifyResults');
      box.innerHTML = '<p>Abriendo resultados: <a href="'+url+'" target="_blank">'+url+'</a></p>';
      // Try to embed if we detect a playlist/track link (not doing heavy API here)
    }, false);
  }

})();
