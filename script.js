// List of button names
const buttonNames = ["Nuwra", "Adum", "Nutella", "Someone else"];

window.current_question = 0;

window.question_list = [
{
	kayoSays: undefined,
	text: "The test will begin!",
	choices: ["Yayaa", "Mhhhmhmh"],
	correctChoice: undefined,
	kayoReacts: ["", ""]
},
{
	kayoSays: "Let's start simple, okay?",
	text: "Who is Lily?",
	choices: ["A child", "A monster"],
	correctChoice: "A child",
	kayoReacts: ["Yoyaa, I'm a child", "Dats mean mean mean..."]
},
{
	kayoSays: "Kayo trust Kayo trust Kayo trust Kayo trust Kayo trust Kayo trust Kayo trust",
	text: "How many cookies Lily ate today?",
	choices: ["Way too many", "0!!", "1!!"],
	correctChoice: "0!!",
	kayoReacts: ["Am no fat I swear", "0!! (I just ate 14 nutella crepes)", "Ayeeee smarties cookie tastes bad it no count"]
},
{
	kayoSays: "Ae wha no no faek",
	text: "Kayo once stole 1€",
	choices: ["True", "False"],
	correctChoice: "True",
	kayoReacts: ["NO FAEK WRONG STOPP", "Yea who even writes these fake news"]
},
{
	kayoSays: "I'm kinda proud yea",
	text: "Kayo made this website all by herself",
	choices: ["True", "False"],
	correctChoice: "False",
	kayoReacts: ["WHAT!!!!??????", "Ehh??? But ChatGPT doesn't count!!"]
}
]

window.dialogue = {
    "Nuwra": [
        "This is Nuwra. Nuwra is my friend.",
        "She's good with drawing.<br>She's good with singing.",
        "Nuwra came to my birthday last time.<br>I was happy.",
        "When she comes back, I will be happy too.",
    ],
    "Adum": [
        "This is Adum. Adum is a kid.",
        "He's in charge of Nuwra. He feeds her.",
        "He feeds friends too. With cheers. With kind.",
        "Adum is smart.",
    ],
    "Nutella": [
        "This is Nutella. He's always yelling.",
        "He won't admit defeat. But he loves playing.",
        "He hates it when people give him things.",
        "But he loves giving things himself. This is funny.",
    ],
    "Someone else": []
};

// Get references to elements
const buttonsContainer = document.getElementById('buttons-container');
const textContainer = document.querySelector('.text-container');
const backgroundAudio = document.getElementById('background-audio'); // Get audio element

// Function to create buttons
function createButtons(names) {
    names.forEach(name => {
        const button = document.createElement('button');
        button.textContent = name;
        button.addEventListener('click', () => {
            hideElementsAndLoadGif(name);
            backgroundAudio.play();
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
        textContainer.innerHTML = "<p>" + window.dialogue[window.friend][0] + "<p>";
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
    
    if (window.dialogue_cursor < dialogue[window.friend].length) {
        textContainer.innerHTML = "<p>" + dialogue[window.friend][window.dialogue_cursor] + "<p>";
        textContainer.style.display = 'block';
    } else {
        document.body.removeEventListener('click', proceedToNextDialogue);
        showQuestionBox();
    }
}

// Function to show question box
function showQuestionBox() {
    const kayoSays = question_list[current_question]["kayoSays"];
    const text = question_list[current_question]["text"];
    const choices = question_list[current_question]["choices"];
    const correctChoice = question_list[current_question]["correctChoice"];
    const kayoReacts = question_list[current_question]["kayoReacts"];
    
    // Display kayoSays text if defined
	setTimeout(() => {
		if (kayoSays !== undefined) textContainer.innerHTML = "<p>" + kayoSays + "</p>";
	}, 1400);
    
    // Create question box container
    const questionBox = document.createElement('div');
    questionBox.classList.add('question-box');

    // Create and append the text element
    const questionText = document.createElement('p');
    questionText.textContent = text;
    questionBox.appendChild(questionText);

    // Create and append choice buttons
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => {
            highlightSelectedButton(button, questionBox);
            
            // Update textContainer with the corresponding reaction
			textContainer.innerHTML = "<p>" + kayoReacts[index] + "</p>";
			
			if (current_question===0){
				removeQuestionBox();
				return;
			}
			
			if (correctChoice === undefined || choice === correctChoice){
				playSoundEffect("correct");
				questionBox.style.backgroundColor = "#30D030";
			}
			else{
				playSoundEffect("wrong");
				questionBox.style.backgroundColor = "#D03030";
			}

            // Remove the question box only after clicking anywhere on the screen
            setTimeout(() => {
                document.body.addEventListener('click', removeQuestionBox);
            }, 100);
        });
        questionBox.appendChild(button);
    });

    // Append the question box to the body
    document.body.appendChild(questionBox);

    // Trigger animation to move question box from bottom to center
    setTimeout(() => {
        questionBox.classList.add('show');
        playSoundEffect("answer_box"); // Function to play sound effect
    }, 100);
}


// Function to highlight selected button and disable others
function highlightSelectedButton(selectedButton, questionBox) {
    const buttons = questionBox.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = true;
        if (button === selectedButton) {
            button.classList.add('selected');
        }
    });
}

// Function to remove question box
function removeQuestionBox() {
    const questionBox = document.querySelector('.question-box');
    if (questionBox) {
        questionBox.classList.remove('show');
        questionBox.addEventListener('transitionend', () => {
            questionBox.remove();
            document.body.removeEventListener('click', removeQuestionBox);
			questionBox.style.backgroundColor = "";
			textContainer.innerHTML = "";
            setTimeout(() => {
                current_question += 1;
                if (current_question < question_list.length) {
                    showQuestionBox();
                } else {
                    textContainer.innerHTML = "You have completed all questions!";
                }
            }, 500);
        });
    }
}

// Function to play sound effect
function playSoundEffect(audio) {
    const sound = new Audio('audio/'+audio+'.mp3'); // Path to your sound effect file
    sound.play();
}

// Attempt to play audio and handle autoplay restrictions
document.addEventListener('DOMContentLoaded', () => {
    // Create buttons with the names from the list
    createButtons(buttonNames);
});
