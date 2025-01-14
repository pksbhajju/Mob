javascript:(function(){
    function transformHTML(node) {
        const clonedNode = node.cloneNode(true);

        function traverse(node) {
            if (node.nodeType === 1) { // Element node
                // Handle `src` and `href` attributes
                if (node.hasAttribute('src')) {
                    const tagName = node.tagName.toLowerCase();
                    if (tagName === 'img') {
                        node.setAttribute('src', 'IMAGE_LINK');
                    } else {
                        node.setAttribute('src', 'SOURCE_LINK');
                    }
                }
                if (node.hasAttribute('href')) {
                    const rel = node.getAttribute('rel');
                    if (rel === 'stylesheet') {
                        node.setAttribute('href', 'STYLESHEET_LINK');
                    } else {
                        node.setAttribute('href', 'LINK');
                    }
                }
                // Recursively process child nodes
                for (let child of node.childNodes) {
                    traverse(child);
                }
            }
        }
        traverse(clonedNode);
        return clonedNode;
    }

    // Clone and transform the current document
    const transformedHTML = transformHTML(document.documentElement);

    // Convert the transformed HTML to a string
    const htmlString = '<!DOCTYPE html>\n' + transformedHTML.outerHTML;

    // Create a blob and download the file
    const blob = new Blob([htmlString], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'template.html'; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})();
