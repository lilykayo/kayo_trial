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
	kayoSays: "Yea starts simple",
	text: "Who is Lily?",
	choices: ["A child", "A monster"],
	correctChoice: "A child",
	kayoReacts: ["Yoyaa, I'm a child", "Dats mean mean mean..."]
},
{
	kayoSays: "Definitely not way too many",
	text: "How many cookies Lily ate today?",
	choices: ["Way too many", "0!!", "1!!"],
	correctChoice: "0!!",
	kayoReacts: ["Am no fat I swear", "0!! (I just ate 14 nutella crepes)", "Ayeeee that smarties cookie tasted bad it no count"]
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
	kayoReacts: ["WHA!!!!??????", "Ehh??? But ChatGPT doesn't count!!"]
},
{
	kayoSays: "Oh oh I know I know-",
	text: "What is this sound?",
	choices: ["A door", "Chewbakka"],
	correctChoice: "A door",
	kayoReacts: ["Didn't get fooled, proud of ya", "Aw close!"]
},
{
    kayoSays: "ez dub yolo fr",
    text: "\\[ \\frac{(2 + 3 \\times 5 - 7) \\times (12 - 4) + \\frac{8^2}{4} - (15 - 6)}{3 + 7 \\times (2^3 - 4)} \\]",
    choices: ["2.8", "3.1", "2.7", "3.0"],
    correctChoice: "2.8",
    kayoReacts: ["Don't get cocky this is kindergarten", "huge noob", "huge noob", "huge noob"]
},
{
    kayoSays: "Rank my fears!",
    text: "Rank her fears",
    choices: ["Submit"],
    correctChoice: undefined,
    kayoReacts: ["Haaa, you actually got it!","Tough luck"]
},
{
    kayoSays: "",
    text: "Lily likes her sister a lot",
    choices: ["Yes", "No"],
    correctChoice: "Yes",
    kayoReacts: ["",""]
},
{
    kayoSays: "",
    text: "Lily can't see her sister now",
    choices: ["Yes", "No"],
    correctChoice: "Yes",
    kayoReacts: ["",""]
},
{
    kayoSays: "",
    text: "Lily misses her sister",
    choices: ["Yes", "No"],
    correctChoice: "Yes",
    kayoReacts: ["",""]
},
{
    kayoSays: "",
    text: "My sister is dead",
    choices: ["Yes", "No"],
    correctChoice: "Yes",
    kayoReacts: ["",""]
},
{
    kayoSays: "",
    text: "My sister is dead",
    choices: ["Yes", "No"],
    correctChoice: "Yes",
    kayoReacts: ["",""]
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
    customGif.id = 'custom-gif';
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

function specialBoxes(questionBox) {
	window.labelOrder = [3,1,2,4];
    const specialBoxContainer = document.createElement('div');
    specialBoxContainer.classList.add('special-box-container');
	
	let labelList = [
		"Fear of height",
		"Fear of people",
		"Fear of loss",
		"Fear of pirates"
	]

    // Create four special boxes with initial position labels
    for (let i = 0; i <= 3; i++) {
        const specialBoxWrapper = document.createElement('div');
        specialBoxWrapper.classList.add('special-box-wrapper');

        const specialBox = document.createElement('div');
        specialBox.classList.add('special-box');
        specialBox.textContent = `#${i+1}`;

        const label = document.createElement('span');
        label.classList.add('box-label');
        label.textContent = labelList[i];

        specialBoxWrapper.appendChild(specialBox);
        specialBoxWrapper.appendChild(label);
        specialBoxContainer.appendChild(specialBoxWrapper);
    }

    // Add click event listener to the special boxes
    specialBoxContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('special-box')) {
            sortSpecialBoxes(event.target, specialBoxContainer);
        }
    });

    questionBox.insertBefore(specialBoxContainer, questionBox.firstChild);
}

function sortSpecialBoxes(clickedBox, container) {
    const boxes = Array.from(container.querySelectorAll('.special-box'));
    const clickedIndex = boxes.indexOf(clickedBox);
	
    if (clickedIndex !== -1 && clickedIndex < boxes.length - 1) {
        // Switch with the box below
        const nextBox = boxes[clickedIndex + 1];
        container.insertBefore(nextBox.parentElement, clickedBox.parentElement);
		
		let prevText = nextBox.innerText;
		nextBox.innerText = clickedBox.innerText;
		clickedBox.innerText = prevText;
		
		let tempLabel = labelOrder[clickedIndex];
		labelOrder[clickedIndex] = labelOrder[clickedIndex+1];
		labelOrder[clickedIndex+1] = tempLabel;
		
    } else if (clickedIndex === boxes.length - 1 && clickedIndex > 0) {
        // Switch with the box above if there's none below
        const prevBox = boxes[clickedIndex - 1];
        container.insertBefore(clickedBox.parentElement, prevBox.parentElement);
		
		let prevText = prevBox.innerText;
		prevBox.innerText = clickedBox.innerText;
		clickedBox.innerText = prevText;
		
		let tempLabel = labelOrder[clickedIndex];
		labelOrder[clickedIndex] = labelOrder[clickedIndex-1];
		labelOrder[clickedIndex-1] = tempLabel;
    }
	console.log(labelOrder);
}

function playVideo(questionBox) {
	const videoContainer = document.createElement('div');
	videoContainer.classList.add('video-container');
	
	const video = document.createElement('video');
	video.src = 'video/mystery_video.mp4'; // Path to your video file
	video.controls = true;
	videoContainer.appendChild(video);
	
	questionBox.appendChild(videoContainer);
	
	// Play video only once
	video.addEventListener('ended', () => {
		videoContainer.remove();
	});

	video.play();
}

function specialButton(questionBox) {
	const specialButton = document.createElement('button');
	specialButton.textContent = "Pley";
	specialButton.classList.add('special-button');
	specialButton.addEventListener('click', () => {
		const sound = new Audio('audio/mystery_sound.mp3'); // Path to your special sound effect file
		sound.play();
	});
	
	questionBox.appendChild(specialButton);
}

// Function to show question box
function showQuestionBox() {
    // Create question box container
    const questionBox = document.createElement('div');
    questionBox.classList.add('question-box');
	
    if (current_question === 5) specialButton(questionBox);
	if (current_question === 7) specialBoxes(questionBox);
    if (current_question === 11) backgroundAudio.pause();
    
    const kayoSays = question_list[current_question]["kayoSays"];
    const text = question_list[current_question]["text"];
    const choices = question_list[current_question]["choices"];
    const correctChoice = question_list[current_question]["correctChoice"];
    const kayoReacts = question_list[current_question]["kayoReacts"];
    
    // Display kayoSays text if defined
	if (kayoSays !== undefined) textContainer.innerHTML = "<p>" + kayoSays + "</p>";
	else textContainer.innerHTML = "";
	textContainer.style.display = "none";
    setTimeout(() => {
		textContainer.style.display = "block";
    }, 1400);

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
			textContainer.style.display = "block";
            
            if (current_question === 0) {
                removeQuestionBox();
                return;
            }
			
            if (current_question === 5) playVideo(questionBox);
			
            if (current_question === 7){
				const expectedOrder = [1, 2, 3, 4];
				const isCorrect = labelOrder.every((value, index) => value === expectedOrder[index]);
				if (isCorrect){
					playSoundEffect("super");
					questionBox.style.backgroundColor = "#30D030";
					index = 0;
				}
				else{
					playSoundEffect("wrong");
					questionBox.style.backgroundColor = "#D03030";
					index = 1;
				}
			}
			
			else{
				if (current_question === 12){
					playSoundEffect("amb_1");
					backgroundAudio.src = "audio/rain.mp3";
					backgroundAudio.pause();
					setTimeout(() => {
						const mainGifElement = document.getElementById("main-gif");
						if (mainGifElement && mainGifElement.parentNode) {
							mainGifElement.parentNode.removeChild(mainGifElement);
						}
						
						const customGifElement = document.getElementById("custom-gif");
						if (customGifElement && customGifElement.parentNode) {
							customGifElement.parentNode.removeChild(customGifElement);
						}
						
						removeQuestionBox();
						backgroundAudio.play();
						document.body.style.backgroundImage = "url('pictures/forest.gif')";
						const darkOverlay = document.querySelector('.dark-overlay');
						if (darkOverlay) {
							darkOverlay.style.display = 'block'; // Ensure the overlay is visible
						}
					}, 5000);
					return;
				}
				else{
					if (correctChoice === undefined || choice === correctChoice) {
						playSoundEffect("correct");
						questionBox.style.backgroundColor = "#30D030";
					} else {
						playSoundEffect("wrong");
						questionBox.style.backgroundColor = "#D03030";
					}
				}
			}
			
            // Update textContainer with the corresponding reaction
            textContainer.innerHTML = "<p>" + kayoReacts[index] + "</p>";

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

function displayFinalMessage() {
    const messages = [
        "This is the first message. This message will be long. Longer than all of this. Can you believe it? So many words. I can't take this at all.",
        "Here's the second message.",
        "And the final message."
    ];

    const container = document.querySelector('.final-message-container');
    container.textContent = ''; // Clear existing content

    let currentMessageIndex = 0; // Track the index of the current message
    let currentWordIndex = 0; // Track the index of the current word

    function displayNextMessage() {
		container.textContent = ''; // Clear existing content
        if (currentMessageIndex < messages.length) {
            const message = messages[currentMessageIndex];
            const words = message.split(' '); // Split message into words
            const messageElement = document.createElement('span');
            messageElement.textContent = ''; // Initially empty
            container.appendChild(messageElement);

            function typeNextWord() {
                if (currentWordIndex < words.length) {
                    const word = words[currentWordIndex];
                    messageElement.textContent += (currentWordIndex > 0 ? ' ' : '') + word;
                    currentWordIndex++;
                    setTimeout(typeNextWord, 40); // Adjust timing: 1000ms for words with dot, 500ms for others
                } else {
                    currentWordIndex = 0; // Reset word index for next message
                    currentMessageIndex++; // Move to the next message
                    document.body.addEventListener('click', displayNextMessage, { once: true }); // Wait for click to display next message
                }
            }

            typeNextWord();
        } else {
            // All messages displayed, do something (e.g., navigate to another page)
            console.log("All messages displayed");
        }
    }

    // Start displaying the first message
    displayNextMessage();
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
					displayFinalMessage();
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
	randomizeOverlayOpacity();
    createButtons(buttonNames);
});

function randomizeOverlayOpacity() {
    const overlay = document.querySelector('.dark-overlay');
    let opacity = 0.5; // Starting opacity

    function changeOpacity() {
        // Calculate a small random change in opacity
        const change = (Math.random() - 0.5) * 0.1; // Random value between -0.05 and 0.05
        opacity = Math.min(0.5, Math.max(0, opacity + change)); // Ensure opacity stays between 0.5 and 1

        overlay.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

        // Change opacity at random intervals between 0.5 to 1.5 seconds
        setTimeout(changeOpacity, Math.random(), 5);
    }

    // Start the first change
    changeOpacity();
}