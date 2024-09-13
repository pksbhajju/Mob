javascript:(function(){
    // Create editor container
    var editor = document.createElement('div');
    editor.style.position = 'fixed';
    editor.style.top = '10px';
    editor.style.right = '10px';
    editor.style.width = '180px'; // Fixed width
    editor.style.maxHeight = 'calc(100vh - 20px)'; // Max height to fit within viewport
    editor.style.overflowY = 'auto'; // Scroll if content exceeds max height
    editor.style.padding = '5px'; // Reduced padding
    editor.style.zIndex = '9999';
    editor.style.backgroundColor = '#fff';
    editor.style.border = '1px solid #ccc';
    editor.style.fontFamily = 'Arial, sans-serif';
    editor.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
    editor.style.borderRadius = '8px';
    editor.style.fontSize = '12px'; // Adjusted font size for compactness

    // Prevent clicks inside the editor from affecting other elements
    editor.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Create small close button
    var closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '3px'; // Adjusted position
    closeButton.style.right = '3px'; // Adjusted position
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '14px'; // Close button size adjusted
    closeButton.style.color = '#333';
    closeButton.title = 'Close Editor';

    // Close editor on click
    closeButton.addEventListener('click', function() {
        document.body.removeChild(editor);
    });

    editor.appendChild(closeButton);

    // Add heading
    var heading = document.createElement('h3');
    heading.innerText = 'CSS Editor';
    heading.style.margin = '0 0 5px 0'; // Reduced margin below heading
    heading.style.fontSize = '14px'; // Heading font size adjusted
    editor.appendChild(heading);

    // Predefined CSS properties and inputs
    var properties = [
        { name: 'Bg Color', property: 'background-color', type: 'color' },
        { name: 'Text Color', property: 'color', type: 'color' },
        { name: 'Font Size', property: 'font-size', type: 'number', unit: 'px' },
        { name: 'Margin', property: 'margin', type: 'number', unit: 'px' },
        { name: 'Padding', property: 'padding', type: 'number', unit: 'px' },
        { name: 'Border Color', property: 'border-color', type: 'color' },
        { name: 'Border Width', property: 'border-width', type: 'number', unit: 'px' },
        { name: 'Border Radius', property: 'border-radius', type: 'number', unit: 'px' },
        { name: 'Width', property: 'width', type: 'number', unit: 'px' },
        { name: 'Height', property: 'height', type: 'number', unit: 'px' },
        { name: 'Opacity', property: 'opacity', type: 'number', min: 0, max: 1, step: 0.1 },
        { name: 'Text Align', property: 'text-align', type: 'select', options: ['left', 'center', 'right', 'justify'] },
        { name: 'Font Weight', property: 'font-weight', type: 'select', options: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
        // Image-specific properties
        { name: 'Image Width', property: 'width', type: 'number', unit: 'px' },
        { name: 'Image Height', property: 'height', type: 'number', unit: 'px' },
        { name: 'Border Radius', property: 'border-radius', type: 'number', unit: 'px' },
        { name: 'Border Width', property: 'border-width', type: 'number', unit: 'px' },
        { name: 'Border Color', property: 'border-color', type: 'color' },
        { name: 'Box Shadow', property: 'box-shadow', type: 'text' },
        { name: 'Object Fit', property: 'object-fit', type: 'select', options: ['fill', 'contain', 'cover', 'none', 'scale-down'] }
    ];

    var selectedElement;

    properties.forEach(function(prop) {
        var label = document.createElement('label');
        label.innerText = prop.name + ': ';
        label.style.display = 'block';
        label.style.marginBottom = '4px'; // Reduced margin
        label.style.fontSize = '12px'; // Label font size adjusted

        var input;

        if (prop.type === 'select') {
            // Create a dropdown for select properties
            input = document.createElement('select');
            input.style.width = '100%';
            input.style.marginBottom = '4px'; // Reduced margin
            input.style.fontSize = '12px'; // Input font size adjusted
            prop.options.forEach(function(option) {
                var optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.innerText = option;
                input.appendChild(optionElement);
            });
        } else {
            // Create input for other properties
            input = document.createElement('input');
            input.type = prop.type;
            input.style.width = '100%';
            input.style.marginBottom = '4px'; // Reduced margin
            input.style.fontSize = '12px'; // Input font size adjusted

            if (prop.type === 'number') {
                input.placeholder = 'Enter value in ' + (prop.unit || '');
                if (prop.min !== undefined) input.min = prop.min;
                if (prop.max !== undefined) input.max = prop.max;
                if (prop.step !== undefined) input.step = prop.step;
            }
        }

        input.addEventListener('input', function() {
            if (selectedElement) {
                var value = prop.type === 'number' ? input.value + (prop.unit || '') : input.value;
                
                if (prop.property === 'border-width') {
                    selectedElement.style.borderWidth = value;
                } else if (prop.property === 'border-color') {
                    selectedElement.style.borderColor = value;
                } else if (prop.property === 'border-radius') {
                    selectedElement.style.borderRadius = value;
                } else {
                    selectedElement.style[prop.property] = value;
                }
            }
        });

        editor.appendChild(label);
        editor.appendChild(input);
    });

    // Instruction for selecting an element
    var instruction = document.createElement('p');
    instruction.innerText = 'Click an element to edit';
    instruction.style.fontSize = '12px'; // Instruction font size adjusted
    instruction.style.color = '#777';
    editor.appendChild(instruction);

    // Add the editor to the page
    document.body.appendChild(editor);

    // Function to select an element, ignoring clicks inside the editor itself
    document.addEventListener('click', function(e) {
        // Ensure that the clicked element is not inside the editor
        if (!editor.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            selectedElement = e.target;
            instruction.innerText = 'Editing ' + selectedElement.tagName.toLowerCase() + ' element';
        }
    });
})();
