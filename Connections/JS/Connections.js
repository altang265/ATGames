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
    "Category_Name" : "Ben and Jerry's Icecream",
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
    console.log("Play button clicked");
    document.getElementById("GameTitleScreen").style.display = "none";
    GameContainer.style.display = "flex";
}); 

// User clicks on one of the buttons
function userSelection(){
    this.style.backgroundColor = "#5a594e";
    this.style.color = "#FFFFFF";
    console.log("User clicked on: " + this.innerHTML);
}

let gameContentRows = document.getElementsByClassName("connectionsRow")
let wordIter = 0;
// Setup all the clickable tiles 
for(let i = 0; i < gameContentRows.length; i++){
    let buttons  = gameContentRows[i].children;
    for(let j = 0; j < buttons.length; j++){
        buttons[j].addEventListener("click", userSelection);
        buttons[j].innerHTML = shuffledWordList[wordIter++];
    }
}


