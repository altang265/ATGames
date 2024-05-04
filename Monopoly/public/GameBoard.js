import { defaultMonopoly } from "./DefaultPropertyList.js";
import { Deed } from "./Classes/Deed.js";
import { Railroad } from "./Classes/Railroad.js";
import { Utility } from "./Classes/Utility.js";
import { User } from "./Classes/User.js";

export class GameBoard {

    constructor(){
        this._listOfPlayers; // Holds User objects
        this._chancePile; // Holds chance wild cards 
        this._communityPile; // Holds community wild cards
        this._listOfTiles; // Holds tile objects
        this._listOfProperties = this.#generatePropertiesList(); 
        this._turnCount = 1;
        this._banker = new User(0, "#FFFFFF" , "none", true);
    }

    static rollDice(){
        let firstValue = Math.floor(Math.random() * 6);
        let secondValue = Math.floor(Math.random() * 6);
        return [firstValue, secondValue]
    }

    get getListOfProperties(){
        return this._listOfProperties;
    }

    getPropertyByName(NameOfProperty){
        for(let prop of this._listOfProperties){
            if(prop._propertyName === NameOfProperty)
                return prop;
        }
        return -1;
    }

    #generatePropertiesList() {
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
                        this._banker,
                        prop.HouseCost,
                        prop.HotelCost
                    );

                }
                else if(key === "Utility"){
                    propertyToAdd = new Utility(
                        prop.PropertyName,
                        prop.PropertyCost,
                        prop.RentBreakdown,
                        key,
                        this._banker
                    );
                }
                else {
                    propertyToAdd = new Railroad(
                        prop.PropertyName,
                        prop.PropertyCost,
                        prop.RentBreakdown,
                        key,
                        this._banker
                    );  
                }
                outputPropList.push(propertyToAdd);
            }
        }
        return outputPropList;
    }
    // Given a group name (i.e. Brown), returns all other 
    // deeds that have the same group name as an array
    getDeedGrouping(inputGroupName){
        let output = [];
        for(let prop of this._listOfProperties){
            if(prop.getGroupName === inputGroupName){
                output.push(prop);
            }
        }
        return output;
    }
    
}