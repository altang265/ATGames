import { defaultMonopoly } from "./DefaultPropertyList.js";

class GameBoard {
    constructor(){
        this._listOfPlayers; // Holds User objects
        this._chancePile; // Holds chance wild cards 
        this._communityPile; // Holds community wild cards
        this._listOfTiles; // Holds tile objects
        this._listOfProperties = this.generatePropertiesList(); 
        this._turnCount = 1;
    }

    static rollDice(){
        let firstValue = Math.floor(Math.random() * 6);
        let secondValue = Math.floor(Math.random() * 6);
        return [firstValue, secondValue]
    }

    getPropertyByName(NameOfProperty){
        for(let prop of this._listOfProperties){
            if(prop._propertyName === NameOfProperty)
                return prop;
        }
        return -1;
    }

    generatePropertiesList() {
        let outputPropList = [];
        // Key = color , value = properties in that color set
        for (let [key, value] of Object.entries(defaultMonopoly)){
            for(let prop of value){
                let propertyToAdd;
                if(key != "Railroad" && key != "Utility"){
                    propertyToAdd = new Deed(
                        prop.PropertyName,
                        prop.PropertyCost,
                        prop.RentBreakdown,
                        key,
                        prop.HouseCost,
                        prop.HotelCost
                    );

                }
                else if(key === "Utility"){
                    propertyToAdd = new Utility(
                        prop.PropertyName,
                        prop.PropertyCost,
                        prop.RentBreakdown,
                        key);
                }
                else {
                    propertyToAdd = new Railroad(
                        prop.PropertyName,
                        prop.PropertyCost,
                        prop.RentBreakdown,
                        key
                    );  
                }
                outputPropList.push(propertyToAdd);
            }
        }
    }
}