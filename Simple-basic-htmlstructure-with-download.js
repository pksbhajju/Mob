javascript:(function() {
    function shortenString(str, maxLength = 50) {
        // Shorten string if it's longer than the maxLength
        return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    }

    function getBasicStructureWithAttributes(node, depth = 0) {
        // Process only element nodes
        if (node.nodeType === Node.ELEMENT_NODE) {
            let tag = node.tagName.toLowerCase();
            let attributes = '';

            // Add all attributes to the element
            for (let attr of node.attributes) {
                attributes += ` ${attr.name}="${shortenString(attr.value)}"`;
            }

            let children = Array.from(node.children)
                .map(child => getBasicStructureWithAttributes(child, depth + 1))
                .join('\n');
                
            return `${' '.repeat(depth * 2)}<${tag}${attributes}>\n${children}\n${' '.repeat(depth * 2)}</${tag}>`;
        }
        return '';
    }

    function viewBasicStructure() {
        const basicHTML = getBasicStructureWithAttributes(document.documentElement);

        const escapedHtml = basicHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const syntaxHighlightedHtml = `<pre class="language-html"><code>${escapedHtml}</code></pre>`;

        const style = `
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-html.min.js"></script>`;

        // Open a new window with the basic HTML structure
        const newWindow = window.open("", "_blank", "width=800,height=600");
        newWindow.document.write(`<html><head>${style}</head><body>${syntaxHighlightedHtml}</body></html>`);
        newWindow.document.close();

        // Prepare the basic structure for download
        const blob = new Blob([basicHTML], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "basic_structure.html";

        // Trigger the download of the basic structure
        link.click();
    }

    viewBasicStructure();
})();