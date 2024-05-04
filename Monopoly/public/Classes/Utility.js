// Rent breakdown will just be [4, 10]
import { Property } from "./Property.js";

export class Utility extends Property {
    
    constructor(propertyName, propertyCost, rentBreakdown, groupName){
        super(propertyName, propertyCost, rentBreakdown, groupName);
    }

    calculateRent(diceRoll){
        let owner = this._owner;
        let otherCompany = (this._propertyName === "")
        if(owner.__listOfProperties.includes());
    }
}