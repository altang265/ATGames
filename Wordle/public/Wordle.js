const keyboardKeys = ["Q", "W" , "E" , "R" , "T" , "Y" , "U", "I" , "O" , "P" , 
    "A" , "S" , "D" , "F" , "G" , "H" , "J" , "K", "L" , "ENTER" , "Z" , "X" , "C" , "V" ,
    "B" , "N" , "M" , "DELETE"];

const wordList = []
let chosenWord = Math.floor(Math.random() * wordList.length); 
let userSubmissionsList = [];
let userInputList = [];
let guessesLeft = 6;
    
// Keypress events
document.addEventListener("keydown", (e) => {
    let key = e.key.toUpperCase();
    // console.log(key);
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
        userSubmissionsList = userSubmissionsList.concat(userInputList);
        userInputList.splice(0, userInputList.length);
        console.log("Submission List: " + userSubmissionsList +
         "\nUser input list check: " + userInputList);
        guessesLeft--;
    }
});

// function that will add the key that was pressed to the document board
function addLetterToBoard(key, pointer){
    let inputRow = document.getElementsByClassName("GameGridRow")[6-guessesLeft];
    let lettersInRow = inputRow.children;
    if(key == "BACKSPACE"){
        lettersInRow[pointer].innerHTML = "";
    } else
        lettersInRow[pointer].innerHTML = key;
}

// Function that checks the user submission against the word of the day
function checkSubmission(word){
    // Check if word is in word list
    if(!wordList.includes(word)){
        // Alert the user the word is not in the word list
    }
    for(let i in word){
        // Current letter is the same letter as chosen word index
        // Current letter is not in the word at all
        // Current letter is in the word (Yellow)
        if(!chosenWord.includes(word[i])){
            // 
        }
        // 
        if(word[i] != chosenWord[i]){

        }
    }
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
