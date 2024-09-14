javascript:(function(){
    // Remove existing overlay if present
    var existingOverlay = document.getElementById('loader_overlay');
    if (existingOverlay) existingOverlay.remove();
    
    // Create a new overlay
    var overlay = document.createElement('div');
    overlay.id = 'loader_overlay';
    overlay.style.position = 'fixed';
    overlay.style.left = '0';
    overlay.style.top = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.textAlign = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    
    // Create an iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://loader.to/api/button/?url=' + encodeURIComponent(window.location.href);
    iframe.style.width = '80%';
    iframe.style.height = '80%';
    iframe.style.border = '2px solid black';
    iframe.style.backgroundColor = 'white';
    
    // Create a close button
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '5%';
    closeButton.style.left = '90%';
    closeButton.style.zIndex = '10000';
    closeButton.onclick = function() {
        overlay.remove();
    };
    
    // Append elements
    overlay.appendChild(iframe);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
})();
