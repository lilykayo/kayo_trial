// List of button names
const buttonNames = ["Nuwra", "Adum", "Nutella", "Fman", "Someone else"];

window.dialogue = {
	"Nuwra": [
		"Hohoaaaa!! Nuwra!!",
		"This is Yor, just like in the dream Kayo had back there",
		"You remember... The dream..."
	]
}

// Get references to elements
const buttonsContainer = document.getElementById('buttons-container');
const textContainer = document.querySelector('.text-container');

// Function to create buttons
function createButtons(names) {
    names.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.addEventListener('click', () => {
            hideElementsAndLoadGif(name);
        });
        buttonsContainer.appendChild(button);
    });
}

// Function to hide elements and load custom GIF
function hideElementsAndLoadGif(name) {
    // Hide text and buttons
    textContainer.style.display = 'none';
    buttonsContainer.style.display = 'none';

    // Load custom GIF
    loadCustomGif(name);

    // Show updated text after 1 second
    setTimeout(() => {
        textContainer.innerHTML = "<p>" + dialogue[window.friend][0] + "<p>";
        textContainer.style.display = 'block';
		
		window.dialogue_cursor = 0;
        
        // Add event listener for click anywhere on the screen to proceed
        document.body.addEventListener('click', proceedToNextDialogue);
    }, 1000); // 1000 milliseconds = 1 second
}

// Function to load custom GIF
function loadCustomGif(name) {
	window.friend = name;
	
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

// Function to proceed to next dialogue
function proceedToNextDialogue() {
	
	window.dialogue_cursor += 1;
	
	textContainer.innerHTML = "<p>" + dialogue[window.friend][window.dialogue_cursor] + "<p>";
	textContainer.style.display = 'block';
}

// Create buttons with the names from the list
createButtons(buttonNames);
