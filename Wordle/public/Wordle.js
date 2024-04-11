
const keyboardKeys = ["Q", "W" , "E" , "R" , "T" , "Y" , "U", "I" , "O" , "P" , 
    "A" , "S" , "D" , "F" , "G" , "H" , "J" , "K", "L" , "ENTER" , "Z" , "X" , "C" , "V" ,
    "B" , "N" , "M" , "DELETE"];
function setupGameBoard(){
    // Create the grid for the letters to be entered
    //  Dimensions: 6 Rows 5 Columns 
    let gridContainer = document.getElementById("GameGridContainer");
    for(let i = 0; i < 7; i++){
        let gridRow = document.createElement("div");
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
    let gridRow;
    for(let i = 0; i < keyboardKeys.length; i++){
        if(i == 0 || i == 10 || i == 19 ){
            gridRow = document.createElement("div");
        }
        let letterBox = document.createElement("div");
        letterBox.setAttribute("class" , "letterBox");
        let keyToAdd = keyboardKeys[i];
        if(keyToAdd == "ENTER" || keyToAdd == "DELETE")
            letterBox.setAttribute("style" , "width: fit-content");
        letterBox.innerHTML = keyToAdd;
        gridRow.appendChild(letterBox);

        gridRow.setAttribute("class" , "GameGridRow");
        if(i == 9 || i == 18 || i == 27){
            keyboardContainer.appendChild(gridRow);
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
