javascript:(function() {
    function viewSourceWithLineNumbers() {
        const html = document.documentElement.outerHTML;
        const htmlWithLineNumbers = html.split('\n').map((line, index) => {
            return `${index + 1}: ${line}`;
        }).join('\n');

        const escapedHtmlWithLineNumbers = htmlWithLineNumbers.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const syntaxHighlightedHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-html.min.js"></script>
            </head>
            <body>
                <pre class="language-html"><code>${escapedHtmlWithLineNumbers}</code></pre>
            </body>
            </html>`;

        // Open a new window with line numbers
        const newWindow = window.open("", "_blank", "width=800,height=600");
        newWindow.document.write(syntaxHighlightedHtml);
        newWindow.document.close();

        // Prepare raw HTML for downloading without line numbers
        const rawHtml = html; // This contains the original HTML without line numbers.
        const blob = new Blob([rawHtml], { type: "text/html" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "source-without-line-numbers.html";

        // Trigger download in the main window (not the new one)
        link.click();
    }

    viewSourceWithLineNumbers();
})();