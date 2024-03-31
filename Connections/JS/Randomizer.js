function randomIndex(maxLength){
    return Math.floor(Math.random() * maxLength);
}


export function shuffleArray(inputArray) {
    var outputArray = [];
    var tempArray = inputArray;
    var randomIndex;
    for(var i = 0; i < tempArray.length; i++){
        randomIndex = Math.floor(Math.random() * tempArray.length);
        outputArray.push(tempArray.splice(randomIndex, 1));
    }
    return outputArray;
}


