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
    "Color" : "Light Blue",
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
    GameContainer.style.display = "flex";
}); 

let userSelections = [];

// User clicks on one of the buttons
function userSelection(){
    let classList = this.classList;
    // If we click on a card that has already been selected then we should remove the selected card class
    // and remove it from the user selections array
    if(classList.contains("selected_card")){
        classList.toggle("selected_card");
        let iOfCard = userSelections.indexOf(this.innerHTML);
        if(iOfCard != -1){
            userSelections.splice(iOfCard, 1);
        }
        return;
    }
    if(userSelections.length < 4){
        // If there are less then 4 then we should add it to the user selections array 
        // and add the selected css class to it
        classList.toggle("selected_card");
        userSelections.push(this.innerHTML);
    }
    
    // If there are 4 then we should not let the user select anymore
    if(userSelections.length == 4) {
        console.log(userSelections);
        return;
    }
    // console.log("User clicked on: " + this.innerHTML);
}

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


