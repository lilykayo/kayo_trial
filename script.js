// List of button names
const buttonNames = ["Nuwra", "Adum", "Nutella", "Someone else"];

window.current_question = 0;
window.solved_correctly = 0;

window.dialogue = {
    "Nuwra": [
        "This is Nuwra.<br>Nuwra is my friend.",
        "She's good with drawing<br>with singing too.",
        "Nuwra came to my birthday<br>last time. I was happy!",
        "When she comes back,<br>I will be happy too."
    ],
    "Adum": [
        "This is Adum.<br>Adum is a kid.",
        "He's in charge of Nuwra.<br>He feeds her.",
        "He feeds friends too.<br>With cheers. With kind.",
        "Adum is a smarty."
    ],
    "Nutella": [
        "This is Nutella.<br>He's always yelling.",
        "He won't admit defeat.<br>But he loves playing.",
        "He hates it when people<br>give him things.",
        "But he loves giving things<br>himself. This is funny.",
		"Recently, he hasn't been<br>giving any news.",
		"But if he's reading this,<br>kayo is reassured!",
		"..."
    ],
    "Someone else": [
        "Aw. You weren't in the list...",
		"Maybe this trial just<br>wasn't intended for you!",
		"But... that doesn't necessarily<br>mean we're not friends.",
		"It doesn't mean we are, though,<br>but we could be. We could...",
		"Kayo don't speak a lot.<br>But she likes lot of people."
    ]
};

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
    kayoSays: "Do you know me well?",
    text: "What is Lily's favorite game?",
    choices: ["Castlevania", "Any 3D Zelda", "Super Mario Galaxy", "E.T.", "All (except E.T.)"],
    correctChoice: "All (except E.T.)",
    kayoReacts: ["Nope, I like them all!","Nope, I like them all!","Nope, I like them all!","Are you serious?","I like them all differently! (except E.T.)"]
},
{
    kayoSays: "*plug earphones*",
    text: "Kayo is extremely sensitive to sound",
    choices: ["True", "False"],
    correctChoice: "True",
    kayoReacts: ["Aeee...", "People must know!!!"]
},
{
    kayoSays: "You can't guess that wrong!!",
    text: "How many plushies Kayo has?",
    choices: ["1", "6", "16", "44"],
    correctChoice: "44",
    kayoReacts: ["Eeeeh??? Just one??", "Cmon that's very low!", "A bit more...", "44 that is correct (for now)"]
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
	if (window.friend == "Someone else") return;
    
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
    if (current_question === 14) backgroundAudio.pause();
    
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
					solved_correctly += 1;
					console.log(solved_correctly);
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
				if (current_question === 15){
					playSoundEffect("amb_1");
					backgroundAudio.src = "audio/rain.mp3";
					backgroundAudio.pause();
					setTimeout(() => {
						const mainGifElement = document.getElementById("main-gif");
						mainGifElement.style.display = "none";
						
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
						if (choice === correctChoice && window.current_question < 11){
							solved_correctly += 1;
							console.log(solved_correctly);
						}
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
		"- A while ago",
		
		"\"Your sister has dark ideas\", mom said in the car. Dark ideas? But she's so smiling...",
		"She's just a teenager, with a phone. This is normal. I hope she gets better.",
		
		"- A while ago",
		
		"Mom can't see my sister. I can't either. Nobody can. She was sent to the mental hospital. Nobody knows what she have.",
		"She was still smiling and looked like she enjoyed activities, although she looked down at dinner.",
		"Doctors didn't give information. They were just asking stupid question to try and understand. They are useless.",
		"They also lied. We can't see her Friday. My brother hate them. My mom starts crying.",
		"She eventually says she have to look strong before dad comes home and she stops crying. This is sad.",
		
		"- April 12th",
		
		"Mom is crying downstairs. At first, Lily is pissed. She wants peace. But she realizes that mom usualy never cries.",
		"So this must be important. Her sister is making heavy breathing noises. Mom is crying.",
		"Dad sent her to the hospital. People can't help her there but she is safe. She is safe.",
		"Lily comes downstairs with her mom. She's crying in her bed. She's bad at helping emotionally because she's autistic and she can't talk.",
		"Mom appreciated what she was trying to do. Maybe there was hope. But that's not the idea she was grabbing on.",
		"My sister was either gonna be unhappy for life, or not living at all.",
		
		"- A while ago",
		
		"There isn't much happening around my sister. We played a scam Kirby game on the raspberry. Just because it was fun.",
		"At first, Lily wanted to talk to her. Because they have a secret link. Maybe she could put her finger on new things others couldn't find.",
		"Maybe her sister would confess a little more.",
		"But alas, she looked fine and she went along instead.",
		
		"- May 7th, 17:00",
		
		"We went to island. Island is a nice place to play games, go at beach. Swim. I don't like swimming but they do.",
		"Water is still cold, it's not summer. I'm really sensitive to cold water.",
		"I felt happy as we went to island's town to buy a few things. Books and tee-shirt. And food.",
		"My little sister was with us, parents got her a new jacket. My older sister joined us later on.",
		"We came to a park with a junk food stand nearby.",
		"We got lucky, we were served first. Little sister was at the fitness section of the park.",
		"There was a machine that made you feel like flying, she loved it. I could see her in the distance.",
		"\"She's happy\", mom said with a relieved smile.",
		"After some time, she joined me at the game section with my older sister, who's as childish as me. We played pushing her on some kind of tire swing.",
		
		"- May 11th",
		
		"We came back from our trip. That felt relieving, and Kayo can come back to school.",
		"She studies well, although this is overwhelming sometimes. Everything feels normal.",
		
		"- May 16th, 07:30",
		
		"Mom is driving me to school. She says something weird happened on my sister's phone, she uninstalled What's App.",
		"She wanted to question her tonight to know what's going on. She's worried, Kayo thought that wasn't cool to spy.",
		
		"- May 16th, 09:21",
		
		"Someone left for vacation.",
		
		"- May 16th, 13:34",
		
		"Dad is calling on phone. This is scary, he usually never calls because he knows Lily don't like calls a lot.",
		
		"- May 16th, afternoon",
		
		"They are crying in the kitchen. Kayo's family. Kayo thought she didn't hear well what dad said on phone.",
		"Her sister's favorite doudou was lying on the table. Family was grabbing it strong. She realized.",
		"She was falling in tears. Mom went to hug her, then dad for a while.",
		
		"- May 17th",
		
		"My older sister arrived with her husband. He gave condolences before leaving us be, as a family.",
		"I went downstairs. Older sister looked at me, eyes full of tears.",
		"We hugged for a very long time. At some point, she looked at me and said: \"no words...?\" with a sad face and broken voice.",
		"I shaked my head to say no. I could not talk.",

		"- May 18th",

		"There are a lot of pictures of her everywhere. Kayo don't like that.",

		"- May 24th",

		"This is the first time Kayo sees someone being buried. She felt atrocious, like she couldn't tell what was real around her.",
		"At least she didn't mind letting it out, crying. People were not important at that point.",
		"Her family is big, big. Nobody ever died, she was scared that this might happen.",
		"Nobody would have thought the 13 years old little girl would leave first.",
		"Before she was buried, we could tell her goodbye in her coffin.",
		"Kayo didn't want to see her and just stayed in the room, coffin hidden by a paravent. Music and smell was relaxing.",
		"\"We are going to close the coffin. This is your last occasion to see her.\"",
		"Older sister took my hand and said \"let's come see her together\". I was scared but I felt like doing it.",
		"I entered the room. I went around the paravent. I fell, sister caught me. I couldn't support the sight.",
		"She just looked like she was asleep, except in that body, there wasn't my sister anymore. Her cold hands holding flowers couldn't move anymore.",
		"She wouldn't be able to make me laugh, feel disgusted or anything anymore. That was a shock, they made me sit down.",
		"I took a pushbutton from my pocket before leaving. I left it in the coffin, with her. Inside it, a voice recording. One final gift.",
		
		"- A while ago",

		"We do grief each our way, my mom said. I don't go see her at the cemetery. Am I a bad person?",

		"- A while ago",

		"Mom was driving me in the car.",
		"People from work made her a book with words from everyone to support her.",
		"There are a lot of pages left, so she will write memories she has about her before she forgets.",
		"I said I could help her filling it. But I don't know what to put in it. I missed so many memories.",

		"- July 6th",

		"We were watching a western at friend's house. \"Once Upon a Time in the West\". My friend's favorite western.",
		"I suggested watching one, he suggested this one.",
		"In the movie, the lady loses her whole family. Including her son. As they buried him, Kayo noticed this felt similar.",
		"It was the exact same way her sister was buried. She couldn't move, or talk. Friend asked her a question, but she was in tears and couldn't answer.",
		"She just sat there watching the movie.",

		"- Now",

		"I'm doing dreams. I hate these dreams. She's alive, I can still do something. I wake up. I can't do anything anymore.",
		"I hit my bed. I hate my bed. I hate this world. I don't wanna feel this. Give her back. Give me a chance. I haven't took the last one.",
		"Fuck me. I hate me. I could do so much and didn't take it seriously.",
		"She was close to me, she was autistic too. We had a connection, and I didn't even talk to her after her first issue.",
		"I said I would, but she looked fine. She looked fine.",

		"Please. Let me call dad. Tell him to not let her go. To check her bag.",

		"Let me call dad.",

		"I don't want this to happen.",

		"Let me call dad please.",
		
		""
    ];

    const container = document.querySelector('.final-message-container');
    container.textContent = ''; // Clear existing content

    let currentMessageIndex = 0; // Track the index of the current message
    let currentWordIndex = 0; // Track the index of the current word

    function displayNextMessage() {
		console.log(currentMessageIndex);
		container.textContent = ''; // Clear existing content
        if (currentMessageIndex < messages.length) {
			
			if (currentMessageIndex === 38) playSoundEffect("vacation");
			
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
			document.body.style.backgroundImage = "url('pictures/background.jpg')";
			const mainGifElement = document.getElementById("main-gif");mainGifElement
			mainGifElement.src = "pictures/kayo_idle_2.gif";
			mainGifElement.style.display = "block";
			showHiddenMessage(window.solved_correctly,10);
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




// Example function to show the hidden message
function showHiddenMessage(correctAnswers, totalQuestions) {
    const hiddenMessageContainer = document.getElementById('hidden-message-container');
    const hiddenCorrectAnswersSpan = document.getElementById('hidden-correct-answers');
    const hiddenTotalQuestionsSpan = document.getElementById('hidden-total-questions');
    
    // Set the text content with the correct answers and total questions
    hiddenCorrectAnswersSpan.textContent = correctAnswers;
    hiddenTotalQuestionsSpan.textContent = totalQuestions;
    
    // Display the hidden message container
    hiddenMessageContainer.style.display = 'block';
}