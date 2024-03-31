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
var connectionsWordList = [];
for(var cat of categoryList){
    connectionsWordList.concat(cat.List_of_words);
}
