// List of Categories
import { HardConnections } from "../CategoryGames/Archive/HardDifficulty/HardGames.js";
import { EasyConnections } from "../CategoryGames/Archive/EasyDifficulty/EasyGames.js";
import { MediumConnections } from "../CategoryGames/Archive/MediumDifficulty/MediumGames.js";
import { ConnectionsGame as TodaysConnection } from "../CategoryGames/DailyConnection.js";


let difficultyConnectionsList;
document.getElementById("DifficultySelection").addEventListener("change", () => {
    let gameNumberSelection = document.getElementById("GameNumberSelection");
    gameNumberSelection.replaceChildren();
    let diffSelectionValue = document.getElementById("DifficultySelection").value;
    if(diffSelectionValue == "Default"){
        gameNumberSelection.style.display = "none";
        return;
    }
    if(diffSelectionValue == "Hard")
        difficultyConnectionsList = HardConnections;
    else if(diffSelectionValue == "Medium")
        difficultyConnectionsList = MediumConnections;
    else 
        difficultyConnectionsList = EasyConnections;
    for(let game of difficultyConnectionsList){
        let row = document.createElement("option");
        row.setAttribute("value", game.Number);
        row.innerHTML = game.Number;
        gameNumberSelection.appendChild(row);
    }
    gameNumberSelection.style.display = "block";
});

function getConnectionsGame(UserSelectedNumber, arrayOfConnections){
    for(let Game of arrayOfConnections){
        if(Game.Number == UserSelectedNumber)
            return Game;
    }
}

let currentGame;
let connectionsWordList;
let diffSelectionValue;
let categoryList; // Should be an array with four categories
function setupWordList(){
    diffSelectionValue = document.getElementById("DifficultySelection").value;
    if(diffSelectionValue != "Default") {
        let selectedGameNumber = document.getElementById("GameNumberSelection").value;
        // console.log("The number they selected: " + selectedGameNumber);
        currentGame = getConnectionsGame(selectedGameNumber, difficultyConnectionsList);
        categoryList = currentGame.List_of_Categories
        // console.log(categoryList);
    } else {
        currentGame = TodaysConnection;
        categoryList = currentGame.List_of_Categories;
    }
    
    connectionsWordList = [];
    for(let i = 0; i < categoryList.length; i++){
        connectionsWordList = connectionsWordList.concat(categoryList[i].List_of_words);
    }
}

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
    // console.log("Shuffled Array: " + outputArray);
    // console.log("User selections when shuffled: ");
    // for(let i = 0; i < userSelections.length; i++){
    //     console.log(userSelections[i]);
    // }
    
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
    // let rows = document.getElementsByClassName("connectionsRow");
    // for(let row of rows){
    //     row.style.display = "flex";
    // }
    setupWordList();
    // console.log("INit time: " + iH + iM + " Secs: " + iS +" MSecs: "  +iMS);
    let shuffleNum = 5;
    while(shuffleNum--){
        connectionsWordList = shuffleArray(connectionsWordList);
    }
    // Initialize the starting board
    setUpBoard(categoriesLeft);
    setInitialTime();
}); 
// GAME RULES
// Empty Array to store the user's answers
let userSelections = [];
let livesLeft = 4;
let categoriesLeft = 4;
const submissionHistoryList = [];
let numOfGuesses = 0;
let isContinuation = false;
let completedCats = [];

// User clicks on one of the buttons
function cardToggleAction(){
    // console.log("User clicked on: " + this.innerHTML);
    let classList = this.classList;
    // If we click on a card that has already been selected then we should remove the selected card class
    // and remove it from the user selections array
    
        
        let iOfCard = userSelections.indexOf(this);
        if(iOfCard != -1){
            this.classList.toggle("selected_card");
            // console.log("Removed: " + userSelections[iOfCard].innerHTML);
            userSelections.splice(iOfCard, 1);
            return;
        }
        
    
    // If there are 4 then we should not let the user select anymore
    if(userSelections.length == 4) {
        return;
    }

    if(userSelections.length < 4){
        // If there are less then 4 then we should add it to the user selections array 
        // and add the selected css class to it
        classList.toggle("selected_card");
        userSelections.push(this);
    }
    
    
    
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
function getCategoryColor(color){
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
    divReplacement.style.backgroundColor = getCategoryColor(color).Color;
    // Create a header for the category name 
    let completedCatHeader = document.createElement("h3");
    // The header should hold the category name according the color that was completed
    completedCatHeader.innerHTML = getCategoryColor(color).Category_Name;
    // Add the header to the div that will 
    divReplacement.appendChild(completedCatHeader);
    let textForCompDiv = document.createElement("p");
    textForCompDiv.innerHTML = getCategoryColor(color).List_of_words;
    // console.log("Text to add for the completed category: " + textForCompDiv.innerHTML);
    divReplacement.appendChild(textForCompDiv);
    replacedRow.removeAttribute("class");
    // replacedRow.appendChild(divReplacement);
    completedCats.push(divReplacement);
    
    for(let card of arrayOfUserAnswers){
        card.style.backgroundColor = color;
        // Remove all the user guesses from the connections word list
        removeWord(card.innerHTML);
        card.removeEventListener("click", cardToggleAction);
        // console.log("Color changed to: " + color);
    };
    deselectAll();
    --categoriesLeft
    setUpBoard();
}
/* Function that plays the wrong answer shake animation 
* Takes in inputArray (Full of Card objects) and adds the wrongAnswer css class. 
*/
function wrongAnswer(inputArray){
    for(let c of inputArray){
        c.classList.add("wrongAnswer");
    }
    return;
}
function removeWrongAnswerClass(inputArray){
    
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
        wrongAnswer(inputArray);
        livesLeft--;
        setTimeout(() => {
            for(let c of inputArray){
                c.classList.remove("wrongAnswer");
            }
        }, 2000);
        return 1;
    } else {
        wrongAnswer(inputArray);
        livesLeft--;
        setTimeout(() => {
            for(let c of inputArray){
                c.classList.remove("wrongAnswer");
            }
        }, 2000);
        return -1;
    }
    
    
}

// Function that checks to see if the user selected cards match one of the categories
document.getElementById("SubmitButton").addEventListener("click", () => {
    if(userSelections.length < 4 || livesLeft == 0) return;
    let numWords = numWordsAway(userSelections);
    ++numOfGuesses;
    if(numWords == 0){
        // FIXME Make sure I am doing nothing here
    } else if(numWords == 1){
        alert("One Word away...");
        document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
    } else {
        // TODO Add the shake effect when the user gets it wrong
        document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
    }
    if(livesLeft == 0){
        showResults(false);
        document.getElementById("TryAgainButton").style.display = "block";
    }
});


document.getElementById("TryAgainButton").addEventListener("click", () => {
    isContinuation = true;
    // Resetting the users lives
    livesLeft = 4;
    document.getElementById("livesSection").innerHTML = "Lives Left: " + livesLeft;
    document.getElementById("ResultsContainer").style.display = "none";
    document.getElementById('GameContainer').style.opacity = "100%";
    document.getElementById("livesSection").style.opacity = "100%";
    document.getElementById("userControlsContainer").style.opacity = "100%";
    document.getElementById("ShowResultsButton").style.display = "none";
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

// Helper function that saves the userGuessHistory to localStorage
function saveToLocalStorage(userHistory){
    // Check to see if there has already been guesses made
    let key = localStorage.getItem("UserSave");
    let dateObject = new Date();
    let date = "Date: " + dateObject.getMonth() + dateObject.getDate() + dateObject.getFullYear();
    // If there is there is a save but the date doesn't 
    // match then we have a brand new game
    let save;
    if(!key || (key && (key).Date != date)){
        // create a new save if there isn't a save OR 
        // there is a key but the dates don't match
        console.log("Created a new save");
        save = {
            "Date" : date, 
            "UserGuessHistoryList" : userHistory, 
        }
        
    }else {
        console.log("Updating a save");
        // We are continuing a previous game because there is a key
        let parsedObject = JSON.parse(key);
        let oldList = parsedObject.UserGuessHistoryList;  // Datatype: Array
        console.log("Old list: " + parsedObject.UserGuessHistoryList);
        let dataToSave = oldList.concat(submissionHistoryList);
        save = {
            "Date" : date, 
            "UserGuessHistoryList" : dataToSave, 
        }
    }
    console.log("Save object: " + save.Date + " \n History:\n" + save.UserGuessHistoryList);
    // Create the save in the localstorage
    localStorage.setItem("UserSave" , JSON.stringify(save));
}

// Helper function that shows the history of all the guesses the user made
function showResults(isWin){
    saveToLocalStorage(submissionHistoryList);
    document.getElementById("TryAgainButton").style.display = "none";
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
    
    let numRows = submissionHistoryList.length/4;
    let historyIter = 0;

    // If this is a continuation of a game then we need to clear the results container
    // to make room for the other rows
    document.getElementById("GuessHistoryContainer").replaceChildren();
    let row;
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
    }
    let endGameMsg = (isWin ? "Congratulations!!!" : "Wow! You'll get it next time :) Maybe");
    if(!isWin){
        document.getElementById("EndGameMessage").innerHTML = endGameMsg;
        return;
    }

    if(isWin && diffSelectionValue != "Default"){
        endGameMsg += "<br>You completed Connections #" + currentGame.Number + " in: " + ++numOfGuesses + 
        " guesses. <br> On " + diffSelectionValue + " difficulty."
    } else {
        endGameMsg += "<br>You completed today's connections.<br>You did it in: " + ++numOfGuesses + 
        " guesses."
    }
    document.getElementById("EndGameMessage").innerHTML = endGameMsg;
}

// Function for deselecting all the cards picked by the user
function deselectAll(){
    let connRows = document.getElementsByClassName("connectionsRow");
    for(let row of connRows){
        for(let card of row.children){
            if(card.classList.contains("selected_card"))
                card.classList.toggle("selected_card");
        }
    }
    userSelections.splice(0, userSelections.length);
    // console.log(userSelections + "check to see if empty");
}

document.getElementById("DeselectButton").addEventListener("click", deselectAll);
document.getElementById("ShuffleButton").addEventListener("click", () => {
    connectionsWordList = shuffleArray(connectionsWordList);
    setUpBoard();
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

// Helper function Basically an includes() function for my userSelections array
function inSelected(word){
    for(let card of userSelections){
        if(card.innerHTML == word)
            return true;
    }
    return false;
}

function setUpBoard(){
    if(categoriesLeft == 0){
        showResults(true);
    }
    // Empty the Container for new buttons
    let container = document.getElementById("GameContainer");
    container.replaceChildren();
    // Add the completed categories first
    for(let cat of completedCats){
        container.appendChild(cat);
    }
    let wordIter = 0;
    let row;
    // Setup all the clickable tiles 
    for(let i = 0; i < categoriesLeft; i++){
        row = document.createElement("div");
        row.setAttribute("class", "connectionsRow");
        row.setAttribute("style" , "display: flex;");
        for(let j = 0; j < 4; j++){
            let card = document.createElement("div");
            card.addEventListener("click", cardToggleAction);
            let text = connectionsWordList[wordIter++];
            card.innerHTML = text;
            card.setAttribute("class", "GameCard");
            if(inSelected(text)){
                card.classList.toggle("selected_card")
            }
            
            row.appendChild(card);
        }
        // Add the row of colors into the container
        document.getElementById("GameContainer").appendChild(row);
    }
}

