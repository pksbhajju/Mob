javascript:(function() {
    function shortenElementContent(element) {
        // Check and truncate text content inside the element if it's longer than 50 characters
        if (element.nodeType === Node.TEXT_NODE) {
            if (element.textContent.length > 50) {
                element.textContent = element.textContent.substring(0, 50) + '_xx';
            }
        }

        // Process attributes if it's an element node
        if (element.nodeType === Node.ELEMENT_NODE) {
            // Handle `d` attribute in `<path>` tags
            if (element.tagName.toLowerCase() === 'path' && element.hasAttribute('d')) {
                let pathData = element.getAttribute('d');
                if (pathData.length > 50) {
                    element.setAttribute('d', pathData.substring(0, 50) + '_xx');
                }
            }

            // Iterate over all attributes and truncate their values if needed
            Array.from(element.attributes).forEach(attr => {
                if (attr.value.length > 50) {
                    element.setAttribute(attr.name, attr.value.substring(0, 50) + '_xx');
                }
            });

            // Recursively call for all child nodes
            element.childNodes.forEach(child => {
                shortenElementContent(child);
            });

            // Shorten content inside <script> and <style> tags
            if (element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'style') {
                if (element.textContent.length > 50) {
                    element.textContent = element.textContent.substring(0, 50) + '_xx';
                }
            }
        }
    }

    // Start recursively shortening content from the document's body
    shortenElementContent(document.documentElement);

    // Prepare the HTML for syntax highlighting
    const html = document.documentElement.outerHTML;
    const htmlWithLineNumbers = html.split('\n').map((line, index) => {
        return `${index + 1}: ${line}`;
    }).join('\n');
    
    const escapedHtmlWithLineNumbers = htmlWithLineNumbers.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const syntaxHighlightedHtml = `<pre class="language-html"><code>${escapedHtmlWithLineNumbers}</code></pre>`;

    // Load Prism syntax highlighting styles and scripts
    const style = `
        <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-html.min.js"></script>`;

    // Open a new window with the syntax-highlighted HTML content
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow.document.write(`<html><head>${style}</head><body>${syntaxHighlightedHtml}</body></html>`);
    newWindow.document.close();

    // Prepare raw HTML for downloading without line numbers
    const rawHtml = html; // This contains the original HTML without line numbers
    const blob = new Blob([rawHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "source-without-line-numbers.html";

    // Trigger download in the main window (not the new one)
    link.click();
})();