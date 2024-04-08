// List of Categories
// TODO Quinections 
// Each category object should have a name, color for difficulty, four words
// for the category
const categoryOne = {
    "Category_Name" : "Pizza Ingredients",
    "Color" : "Yellow",
    "List_of_words" : ["Dough" , "Sauce" , "Cheese" , "Pepperoni"],
};

const categoryTwo = {
    "Category_Name" : "Money",
    "Color" : "Green",
    "List_of_words" : ["Bread" , "Moolah" , "Bucks" , "Cash"],
};

const categoryThree = {
    "Category_Name" : "Deli",
    "Color" : "LightBlue",
    "List_of_words" : ["Bologna" , "Turkey" , "Roast beef" , "Pastrami"],
};

const categoryFour = {
    "Category_Name" : "-room",
    "Color" : "Purple",
    "List_of_words" : ["Bath" , "Bed" , "Ball" , "Living"],
}


const categoryList = [categoryOne, categoryTwo, categoryThree, categoryFour];
let connectionsWordList = categoryOne.List_of_words.concat(categoryTwo.List_of_words, categoryThree.List_of_words, categoryFour.List_of_words);
// console.log("Here is the list of words for all the categories " + connectionsWordList.toString());

// Randomize all the categories and their words 
function shuffleArray(inputArray) {
    let outputArray = [];
    let tempArray = inputArray;
    let randomIndex;
    let numberOfItems = inputArray.length;
    // console.log(numberOfItems);
    for(let k = 0; k < numberOfItems; k++){
        randomIndex = Math.floor(Math.random() * tempArray.length);
        outputArray.push(tempArray.splice(randomIndex, 1));
    }
    return outputArray;
}
// Initial time
let iH;
let iM;
let iS;
let iMS;
// Helper function that will start the calculation for the start and end of the game
function setInitialTime(){
    let time = new Date();
    iH = time.getHours();
    iM = time.getMinutes();
    iS = time.getSeconds();
    iMS = time.getMilliseconds();
    console.log("Start Time: " + "H: " + iH + " min: " + iM + " sec: " + iS + " ms: " + iMS);
}

// Play button click event
const playButton = document.getElementById("button_playButton");
playButton.addEventListener("click", () => {
    document.getElementById("GameTitleScreen").style.display = "none";
    document.getElementById("livesSection").style.display = "block";
    document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
    document.getElementById("userControlsContainer").style.display = "block";
    document.getElementById("GameContainer").style.display = "flex";
    let rows = document.getElementsByClassName("connectionsRow");
    for(let row of rows){
        row.style.display = "flex";
    }
    
    // console.log("INit time: " + iH + iM + " Secs: " + iS +" MSecs: "  +iMS);
    connectionsWordList = shuffleArray(connectionsWordList);
    // Initialize the starting board
    setUpBoard(categoriesLeft);
    setInitialTime();
}); 
// GAME RULES
// Empty Array to store the user's answers
let userSelections = [];
let livesLeft = 4;
let categoriesLeft = categoryList.length;
const submissionHistoryList = [];

// User clicks on one of the buttons
function cardToggleAction(){
    let classList = this.classList;
    // If we click on a card that has already been selected then we should remove the selected card class
    // and remove it from the user selections array
    if(classList.contains("selected_card")){
        classList.toggle("selected_card");
        let iOfCard = userSelections.indexOf(this);
        if(iOfCard != -1){
            userSelections.splice(iOfCard, 1);
        }
        return;
    }
    if(userSelections.length < 4){
        // If there are less then 4 then we should add it to the user selections array 
        // and add the selected css class to it
        classList.toggle("selected_card");
        userSelections.push(this);
    }
    
    // If there are 4 then we should not let the user select anymore
    if(userSelections.length == 4) {
        return;
    }
    // console.log("User clicked on: " + this.innerHTML);
}

// Helper function: Given a word. Return the category color it belongs to.
function findCategory(card){
    for(let i = 0; i < 4; i++){
        let x = categoryList[i].List_of_words.indexOf(card.innerHTML);
        if (x != -1)
            return categoryList[i].Color;
    }
}
// Helper Function: Remove Word from the word list
function removeWord(word){
    let poppedWord;
    for(let i = 0; i < connectionsWordList.length; i++){
        poppedWord = connectionsWordList.shift();
        if(poppedWord != word)
            connectionsWordList.push(poppedWord);
    }
    // console.log("After removed user guess: " + connectionsWordList
    // + " \nLength: " + connectionsWordList.length);
}

// Helper function that returns the category name according to color provided
// Returns Category Object 
function getCategoryInfo(color){
    for(let cat of categoryList){
        if((cat.Color == color)){
            return cat;
        }
    }
}

// Helper function: When a category is completed then we should trigger the complete animation
// Parameter: The color of the category that we are making and an array of HTML objects to change
// TODO Create the complete animation just like the real connections game
let replacedRowList = [];
function completeCategory(color, arrayOfUserAnswers){
    //Store what is in the row it is going to replace
    // console.log("Row Index: " + rowIndex);

    let replacedRow = document.getElementsByClassName("connectionsRow")[0];
    let divReplacement = document.createElement("div");
    divReplacement.setAttribute("class" , "completedCategory");
    divReplacement.style.backgroundColor = getCategoryInfo(color).Color;
    // Create a header for the category name 
    let completedCatHeader = document.createElement("h3");
    // The header should hold the category name according the color that was completed
    completedCatHeader.innerHTML = getCategoryInfo(color).Category_Name;
    // Add the header to the div that will 
    divReplacement.appendChild(completedCatHeader);
    let textForCompDiv = document.createElement("p");
    textForCompDiv.innerHTML = getCategoryInfo(color).List_of_words;
    // console.log("Text to add for the completed category: " + textForCompDiv.innerHTML);
    divReplacement.appendChild(textForCompDiv);
    for(let i = replacedRow.children.length-1; i >= 0; i--){
        let content = replacedRow.children[i];
        if(!arrayOfUserAnswers.includes(content)){
            replacedRowList.push(content.innerHTML);
            content.remove();
        }
        content.remove();
    }

    replacedRow.appendChild(divReplacement);
    replacedRow.removeAttribute("class");
    
    // console.log("List for replaced stuff: " + replacedRowList)
    for(let card of arrayOfUserAnswers){
        card.style.backgroundColor = color;
        // Remove all the user guesses from the connections word list
        removeWord(card.innerHTML);
        card.removeEventListener("click", cardToggleAction);
        // console.log("Color changed to: " + color);
    };
    deselectAll();
    setUpBoard(--categoriesLeft);
    
}
// Helper function: Given an array of colors. 
// Returns 1 if the user is one word away.
// Returns 0 if the user is zero words away 
function numWordsAway(inputArray){
    // Each index represents a color
    let dict = [0, 0 , 0, 0];
    let c;
    for(let input of inputArray){
        c = findCategory(input);
        switch (c) {
            case "Yellow":
                dict[0]++;
                break;
            case "Green":
                dict[1]++;
                break;
            case "LightBlue":
                dict[2]++;
                break;
            case "Purple":
                dict[3]++;
                break;
        }
        // Add the user's guesses to the submissionHistory Array whenever they submit
        submissionHistoryList.push(c);
    }
    // console.log("Num Words away submission history: " + submissionHistoryList + "\n");
    // console.log(dict + "Here is the dictionary of the onewordaway func");
    // Worry only about having a max of three or four
    // TODO Keep track of all the guesses the user has made in an array. 
    // (For the screen that displays at the end)
    if(dict.includes(4)){
        completeCategory(c, userSelections);
        return {
            "Left" : 0,
            "Color" : c,
        };
    } else if (dict.includes(3)){
        livesLeft--;
        return 1;
    } else {
        livesLeft--;
        return -1;
    }
    
    
}

// Function that checks to see if the user selected cards match one of the categories
document.getElementById("SubmitButton").addEventListener("click", () => {
    if(userSelections.length < 4) return;
    let numWords = numWordsAway(userSelections);
    if(numWords == 0){
        
    } else if(numWords == 1){
        alert("One Word away...");
        document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
    } else {
        // TODO Add the shake effect when the user gets it wrong
        document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
        // do something 
    }
    if(livesLeft == 0){
        showResults(false);
    }
});

// Makes sure the output has some zeros to fill in the gaps
function formatTime(value){
    if(value < 10)
        return "0" + value;
    return value; 
}


// Calculate the time it took to complete the game
// Returns the time as a string
function endTime(){
    let currTime = new Date();
    console.log("Final Time: " + "H: " + currTime.getHours() + " min: " + 
        currTime.getMinutes() + " sec: " + currTime.getSeconds() + " ms: " + currTime.getMilliseconds());
    let carry = false;
    // Final - Initial 
    let ms = currTime.getMilliseconds() - iMS;
    if(ms < 0) {
        ms += 1000;
        carry = true;
    }
    let s = currTime.getSeconds() - iS;
    if(carry){
        // Minus 1 due to carry
        s -= 1;
        carry=false;  
    }
    if(s < 0){
        s += 60;
        carry = true;
    }
    let m = currTime.getMinutes() - iM;
    if(carry){
        m -= 1;
        carry=false;   
    }
    if(m < 0){
        m += 60;
        carry = true;
    }
    // Going to assume they don't take longer than a day
    let h = currTime.getHours()- iH;
    if(carry){
        h -= 1;  
        carry=false; 
    }
    if(h < 0){
        h += 24;
        carry = true;
    }
    return "Finished in: " + formatTime(h) + ":" + formatTime(m) + ":" + formatTime(s) + "." + ms;
}

// Helper function that shows the history of all the guesses the user made
function showResults(isWin){
    // Show the timer on the results pop-up
    document.getElementById("GameTimer").innerHTML = endTime();
    // Allow the user to see the Results button
    document.getElementById("ShowResultsButton").style.display = "block";

    // Hide all the game containers
    document.getElementById('GameContainer').style.opacity = "50%";
    document.getElementById("livesSection").style.opacity = "50%";
    document.getElementById("userControlsContainer").style.opacity = "50%";

    // Show the results for the game
    document.getElementById("ResultsContainer").style.display = "block";
    let endGameMsg = (isWin ? "Congratulations!!! You solved it!" : "Wow! You'll get it next time :) Maybe");
    document.getElementById("EndGameMessage").innerHTML = endGameMsg;

    let numRows = submissionHistoryList.length/4;
    let historyIter = 0;
    
    // TODO Create a history that is stored in the localStorage
    // Create a row for every submission the user made throughout the game
    for(let i = 1; i <= numRows; i++){
        row = document.createElement("div");
        row.setAttribute("class", "ResultsRow");
        // console.log("Row " + i + " created.\n");
        // Loop through each submission the user made and create colored boxes that 
        // correspond with their guess
        for(let j = 0; j < 4; j++){
            let colorBlock = document.createElement("div");
            let color = submissionHistoryList[historyIter++];
            colorBlock.style.backgroundColor = color;
            colorBlock.setAttribute("class", "ResultBlock");
            // console.log("Made results block: " + color);
            row.appendChild(colorBlock);
        }
        // Add the row of colors into the container
        document.getElementById("GuessHistoryContainer").appendChild(row);
        // alert("Congrats you got them all!");
    }
}

// Function for deselecting all the cards picked by the user
function deselectAll(){
    for(let card of userSelections){
        card.classList.toggle("selected_card");
    }
    userSelections.splice(0, userSelections.length);
    // console.log(userSelections + "check to see if empty");
}

document.getElementById("DeselectButton").addEventListener("click", deselectAll);
document.getElementById("ShuffleButton").addEventListener("click", () => {
    connectionsWordList = shuffleArray(connectionsWordList);
    // FIXME Selected cards do not follow the word but the card.
    deselectAll();
    setUpBoard(categoriesLeft)
});

// Close the results box if they click the X button
document.getElementById("CloseResults").addEventListener("click", () => {
    document.getElementById("ResultsContainer").style.display = "none";
    document.getElementById('GameContainer').style.opacity = "100%";
    document.getElementById("livesSection").style.opacity = "100%";
    document.getElementById("userControlsContainer").style.opacity = "100%";
});

document.getElementById("ShowResultsButton").addEventListener("click", () => {
    document.getElementById("ShowResultsButton").style.display = "block";
    document.getElementById("ResultsContainer").style.display = "block";
    document.getElementById('GameContainer').style.opacity = "50%";
    document.getElementById("livesSection").style.opacity = "50%";
    document.getElementById("userControlsContainer").style.opacity = "50%";
});

function setUpBoard(numRows){
    if(categoriesLeft == 0){
        showResults(true);
    }
    // console.log("number of rows to create: " + numRows);
    let gameContentRows = document.getElementsByClassName("connectionsRow")
    let wordIter = 0;
    // console.log("Number of rows to create: " + numRows);
    // Setup all the clickable tiles 
    for(let i = 0; i < numRows; i++){
        let buttons  = gameContentRows[i].children;
        for(let j = 0; j < buttons.length; j++){
            let classL = buttons[j].classList;
            classL.add("GameCard");
            buttons[j].removeAttribute("style");
            buttons[j].addEventListener("click", cardToggleAction);
            buttons[j].innerHTML = connectionsWordList[wordIter++];
        }
    }
    // Setup the other completed categories
}





