const keyboardKeys = ["Q", "W" , "E" , "R" , "T" , "Y" , "U", "I" , "O" , "P" , 
    "A" , "S" , "D" , "F" , "G" , "H" , "J" , "K", "L" , "ENTER" , "Z" , "X" , "C" , "V" ,
    "B" , "N" , "M" , "DELETE"];

import { wordList } from "./WordList.js";

let chosenWord = wordList[Math.floor(Math.random() * wordList.length)]; 
console.log(chosenWord);
// Make sure everything is in uppercase
// let chosenWord = "HELLO";
let userSubmissionsList = [];
let userInputList = [];
let guessesLeft = 6;
    
// Keypress events
document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();
    // console.log(key);
    keyPressed(key);
});

function keyPressed(key){
    if(!keyboardKeys.includes(key) && key != "BACKSPACE") return;
    if(key == "BACKSPACE" && userInputList.length > 0){
        addLetterToBoard(key, userInputList.length-1);
        userInputList.pop();
        console.log(userInputList);
    }
    // User submits their answer
    // Make sure it is one of the keys we want
    if(userInputList.length < 5 && key != "ENTER" && key != "BACKSPACE"){
        userInputList.push(key);
        console.log(userInputList);
        addLetterToBoard(key, userInputList.length-1);
    }
    if(key == "ENTER" && userInputList.length == 5){
        // Create a string out of all the characters the user inputted
        let submission = userInputList.join("");
        // Check to see if the word is in the wordlist before subtracting a life
        if(!checkSubmission(submission)){
            alert("Not in the word list...");
            return;
        }
        // Add the user guess to history
        userSubmissionsList = userSubmissionsList.concat(userInputList);
        // Empty out the list of characters the user put in
        userInputList.splice(0, userInputList.length);
        console.log("Submission List: " + userSubmissionsList +
         "\nUser Submission: " + submission);
        guessesLeft--;
    }
}

// function that will add the key that was pressed to the document board
function addLetterToBoard(key, pointer){
    let inputRow = document.getElementsByClassName("GameGridRow")[6-guessesLeft];
    let lettersInRow = inputRow.children;
    if(key == "BACKSPACE"){
        lettersInRow[pointer].innerHTML = "";
    } else
        lettersInRow[pointer].innerHTML = key;
}

// Helper function for checkSubmission() 
// This function changes the color of the tile 
function tileColorChange(color , indexOfLetter){
    // Get the row the user just submitted
    let inputRow = document.getElementsByClassName("GameGridRow")[6-guessesLeft];
    let lettersInRow = inputRow.children;
    lettersInRow[indexOfLetter].style.backgroundColor = color;
    lettersInRow[indexOfLetter].style.opacity = ".60";
    lettersInRow[indexOfLetter].style.color = "Black";
}

// Function that checks the user submission against the word of the day
// Returns TRUE if the word is in the wordlist
// Returns FALSE if the word is not in the wordlist
function checkSubmission(word){
    // Check if word is in word list
    if(!wordList.includes(word)){
        // Alert the user the word is not in the word list
        
        return false;
    }
    for(let i in word){
        // Current letter is the same letter as chosen word index
        if(word[i] == chosenWord[i]){
            // Turn the tile green
            tileColorChange("Green" , i);
        }
        // Current letter is not in the word at all
        else if(!chosenWord.includes(word[i])){
            // Leave the background as is
        }
        // We know that the letter is in the word from this point forward
        // Current letter is in the word (Yellow) 
        else{
            // Turn the tile yellow
            tileColorChange("Yellow" , i);
        }
    }
    return true;
}

function setupGameBoard(){
    // Create the grid for the letters to be entered
    //  Dimensions: 6 Rows 5 Columns 
    let gridContainer = document.getElementById("GameGridContainer");
    let gridRow;
    for(let i = 0; i < 7; i++){
        gridRow = document.createElement("div");
        gridRow.setAttribute("class" , "GameGridRow");
        for(let j = 0; j < 5; j++){
            let letterBox = document.createElement("div");
            letterBox.setAttribute("class" , "inputBox");
            letterBox.innerHTML = "";
            gridRow.appendChild(letterBox);
        }
        gridContainer.appendChild(gridRow);
    }
    // Set up the keyboard 
    let keyboardContainer = document.getElementById("KeyboardContainer");
    let keyGridRow;
    for(let i = 0; i < keyboardKeys.length; i++){
        if(i == 0 || i == 10 || i == 19 ){
            keyGridRow = document.createElement("div");
        }
        let letterBox = document.createElement("div");
        letterBox.setAttribute("class" , "letterBox");
        let keyToAdd = keyboardKeys[i];
        if(keyToAdd == "ENTER" || keyToAdd == "DELETE")
            letterBox.setAttribute("style" , "width: fit-content");
        letterBox.innerHTML = keyToAdd;
        // Allow the user to click on the keyboard
        letterBox.addEventListener("click" , () => {
            console.log("Keyboard pressed: " + keyToAdd);
            if(keyToAdd != "DELETE")
                keyPressed(keyToAdd);
            else 
                keyPressed("BACKSPACE");
        });
        keyGridRow.appendChild(letterBox);
        keyGridRow.setAttribute("class" , "GameGridRow");
        if(i == 9 || i == 18 || i == 27){
            keyboardContainer.appendChild(keyGridRow);
        }
        
    }
}

function showBoard(){
    document.getElementById("StartScreen").style.display = "none";
    document.getElementById("GameArea").style.display = "block";
    document.getElementById("GameContent").setAttribute("style" , "background-color: black");
    document.querySelector("body").setAttribute("class" , "blackLayout");
}

document.getElementById("PlayButton").addEventListener("click" , () =>{
    setupGameBoard();
    showBoard();
})
