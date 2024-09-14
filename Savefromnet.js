(function() {
   var overlay = document.getElementById('savefrom_overlay');
   if (overlay) overlay.remove();

   var iframe = document.createElement('iframe');
   iframe.src = 'https://en.savefrom.net/18/#url=' + encodeURIComponent(window.location.href);
   iframe.style = 'position:fixed; top:10%; left:10%; width:80%; height:80%; z-index:9999; border:2px solid black; background:white;';
   
   var closeButton = document.createElement('button');
   closeButton.innerHTML = 'Close';
   closeButton.style = 'position:fixed; top:5%; left:90%; z-index:10000;';
   closeButton.onclick = function() {
      iframe.remove();
      closeButton.remove();
   };
   
   document.body.appendChild(iframe);
   document.body.appendChild(closeButton);
})();
