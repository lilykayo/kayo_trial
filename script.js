// List of button names
const buttonNames = ["Nuwra", "Adum", "Nutella", "Fman", "Someone else"];

// Get the container for buttons
const buttonsContainer = document.getElementById('buttons-container');

// Function to create buttons
function createButtons(names) {
    names.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.addEventListener('click', () => {
            loadCustomGif(name);
        });
        buttonsContainer.appendChild(button);
    });
}

// Function to load custom GIF
function loadCustomGif(name) {
    // Remove existing custom GIF if already loaded
    const existingCustomGif = document.querySelector('.custom-gif');
    if (existingCustomGif) {
        existingCustomGif.remove();
    }

    // Create and append the new custom GIF element
    const customGif = document.createElement('img');
    customGif.src = `pictures/${name.toLowerCase()}_idle_1.gif`; // Adjust path as per your folder structure
    customGif.alt = "Custom GIF";
    customGif.classList.add('custom-gif');
    document.body.appendChild(customGif);

    // Trigger animation by updating right position after a short delay
    setTimeout(() => {
        customGif.style.right = '60%'; // Move to center of the screen
    }, 100);
}

// Create buttons with the names from the list
createButtons(buttonNames);
