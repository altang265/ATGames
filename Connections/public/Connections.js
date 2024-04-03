// List of Categories

// Each category object should have a name, color for difficulty, four words
// for the category

const categoryOne = {
    "Category_Name" : "Burger Companies",
    "Color" : "Yellow",
    "List_of_words" : ["Kings", "Guys" , "Shack" , "Burger"],
};

const categoryTwo = {
    "Category_Name" : "Greatest Scientific Minds",
    "Color" : "Green",
    "List_of_words" : ["Galileo", "Nikola", "Marie", "Albert"],
};

const categoryThree = {
    "Category_Name" : "Famous Actors of 2023",
    "Color" : "LightBlue",
    "List_of_words" : ["Pascal", "Winstead", "Armas", "Ortega"],
};

const categoryFour = {
    "Category_Name" : "Ben and Jerry's Ice cream",
    "Color" : "Purple",
    "List_of_words" : ["Garcia" , "Monkey", "Food" , "Cheesecake"],
}

const categoryList = [categoryOne, categoryTwo, categoryThree, categoryFour];
var connectionsWordList = categoryOne.List_of_words.concat(categoryTwo.List_of_words, categoryThree.List_of_words, categoryFour.List_of_words);
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

let shuffledWordList = shuffleArray(connectionsWordList);
// console.log("Shuffled list of words: " + shuffledWordList);

// Play button click event
const playButton = document.getElementById("button_playButton");
playButton.addEventListener("click", () => {
    document.getElementById("GameTitleScreen").style.display = "none";
    document.getElementById("userControlsContainer").style.display = "block";
    GameContainer.style.display = "flex";
}); 

// Empty Array to store the user's answers
let userSelections = [];

// User clicks on one of the buttons
function userSelection(){
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

// FIXME Logic of letting the user know how many are left
// Helper function: Given an array of colors. Return if the user is one word away.
function oneWordAway(inputArray){
    // Each index represents a color
    let dict = [0, 0 , 0, 0]
    for(let input of inputArray){
        switch (input.innerHTML) {
            case "Yellow":
                dict[0]++;
                break;
            case "Green":
                dict[1]++;
                break;
            case "LightBlue":
                dict[2]++;
                break;
            default:
                dict[3]++;
        }
    }
    console.log(dict + "Here is the dictionary of the onewordaway func");
    if(dict.indexOf(4) != -1){
        return {"SameColor" : 4}
    }
    let output = {
         
    }
    return dict.contains(3);
    
}

// Function that checks to see if the user selected cards match one of the categories
document.getElementById("SubmitButton").addEventListener("click", () => {
    
    console.log("Users color guesses: " + userGuesses);
    // If they all have the same color then the size should be 1
    if(oneWordAway(userSelections)){
        // TODO Remove the selected card CSS class. Move the four cards to the top row. Use the set get the color of the category
        alert("Correct");
    }
    if(set.size != 1){
        alert("Wrong");
    }
})

// Function for deselecting all the cards picked by the user
document.getElementById("DeselectButton").addEventListener("click", () =>{
    for(let card of userSelections){
        card.classList.toggle("selected_card");
    }
    userSelections.splice(0, userSelections.length);
    console.log(userSelections + "check to see if empty");
})

let gameContentRows = document.getElementsByClassName("connectionsRow")
let wordIter = 0;
// Setup all the clickable tiles 
for(let i = 0; i < gameContentRows.length; i++){
    let buttons  = gameContentRows[i].children;
    for(let j = 0; j < buttons.length; j++){
        let classL = buttons[j].classList;
        classL.add("GameCard");
        buttons[j].addEventListener("click", userSelection);
        buttons[j].innerHTML = shuffledWordList[wordIter++];
    }
}


