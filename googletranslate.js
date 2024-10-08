javascript:(function() {
    // Create the overlay and input box if they don't already exist
    if (document.getElementById("translator-overlay")) {
        document.getElementById("translator-input").value = ''; // Clear the input box if the overlay exists
        document.getElementById("english-text").innerText = ''; // Clear previous translation
        document.getElementById("hindi-text").innerText = '';
        return; // Do not create a new overlay
    }

    // Create the overlay for the translation interface
    let overlay = document.createElement("div");
    overlay.id = "translator-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "10px"; // Position at the top
    overlay.style.right = "10px"; // Position at the right
    overlay.style.backgroundColor = "white";
    overlay.style.padding = "10px";
    overlay.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    overlay.style.zIndex = "10000";
    overlay.style.borderRadius = "8px";
    overlay.style.width = "300px"; // Fixed width
    overlay.style.maxHeight = "80vh";
    overlay.style.overflowY = "auto";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.border = "1px solid #ccc"; // Optional border for better visibility

    // Create the input box for text entry
    let inputBox = document.createElement("textarea");
    inputBox.id = "translator-input";
    inputBox.placeholder = "Paste text here...";
    inputBox.style.width = "100%";
    inputBox.style.height = "80px"; // Adjusted height
    inputBox.style.borderRadius = "4px";
    inputBox.style.border = "1px solid #ccc";
    inputBox.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
    inputBox.style.fontSize = "14px"; // Smaller font size for mobile
    overlay.appendChild(inputBox);

    // Create the close button (small "X")
    let closeButton = document.createElement("span");
    closeButton.innerText = "✖"; // Cross symbol
    closeButton.style.cursor = "pointer";
    closeButton.style.color = "#FF0000"; // Red color for visibility
    closeButton.style.fontSize = "18px"; // Adjusted size
    closeButton.style.position = "absolute"; // Position it in the overlay
    closeButton.style.top = "5px"; // Position at the top
    closeButton.style.right = "10px"; // Position at the right
    overlay.appendChild(closeButton);

    // Create an area to show translations
    let translationDisplay = document.createElement("div");
    translationDisplay.id = "translation-display";
    translationDisplay.innerHTML = `<strong>Translation:</strong><br><div id="english-text" style="margin-top: 10px;"></div><div id="hindi-text" style="margin-top: 10px;"></div>`;
    overlay.appendChild(translationDisplay);

    // Create a translate button
    let translateButton = document.createElement("button");
    translateButton.innerText = "Translate";
    translateButton.style.marginTop = "10px";
    translateButton.style.padding = "5px 10px";
    translateButton.style.cursor = "pointer";
    translateButton.style.border = "1px solid #28a745";
    translateButton.style.borderRadius = "4px";
    translateButton.style.backgroundColor = "#28a745";
    translateButton.style.color = "white";
    overlay.appendChild(translateButton);

    // Create a copy button
    let copyButton = document.createElement("button");
    copyButton.innerText = "Copy Both";
    copyButton.style.marginTop = "10px";
    copyButton.style.padding = "5px 10px";
    copyButton.style.cursor = "pointer";
    copyButton.style.border = "1px solid #28a745";
    copyButton.style.borderRadius = "4px";
    copyButton.style.backgroundColor = "#28a745";
    copyButton.style.color = "white";
    overlay.appendChild(copyButton);

    // Add overlay to the document body
    document.body.appendChild(overlay);

    // Function to translate text
    async function translateText(text) {
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]; // Split text into sentences
        let translatedText = "";

        for (const sentence of sentences) {
            await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(sentence)}`)
                .then(response => response.json())
                .then(data => {
                    if (data && data[0] && data[0][0] && data[0][0][0]) {
                        translatedText += data[0][0][0] + " "; // Concatenate translations
                    } else {
                        translatedText += "[Translation Error] "; // Handle error
                    }
                })
                .catch(error => {
                    console.error("Translation error:", error);
                    translatedText += "[Translation Error] "; // Handle fetch error
                });
        }

        document.getElementById("english-text").innerText = text; // Show original text
        document.getElementById("hindi-text").innerText = translatedText.trim(); // Show concatenated translated text
    }

    // Event listener for the translate button
    translateButton.onclick = function() {
        let text = inputBox.value.trim();
        if (text) {
            translateText(text);
        } else {
            document.getElementById("hindi-text").innerText = "Please enter text to translate.";
        }
    };

    // Event listener for the input box to detect when the Enter key is pressed
    inputBox.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent newline on Enter
            translateButton.click(); // Trigger translation
        }
    });

    // Event listener for copy button
    copyButton.onclick = function() {
        const englishText = document.getElementById("english-text").innerText;
        const hindiText = document.getElementById("hindi-text").innerText;
        const textToCopy = `English:\n${englishText}\n\nHindi:\n${hindiText}`;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Copied both translations to clipboard!");
                inputBox.value = ''; // Clear input box after copying
                document.getElementById("english-text").innerText = ''; // Clear previous English text
                document.getElementById("hindi-text").innerText = ''; // Clear previous Hindi text
            })
            .catch(err => alert("Failed to copy text: " + err));
    };

    // Close the overlay when the close button is clicked
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
    };
})();
