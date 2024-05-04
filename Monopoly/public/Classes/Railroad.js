import { Property } from "./Property.js";

export class Railroad extends Property{

    constructor(propertyName, propertyCost, rentBreakdown, groupName, banker){
        super(propertyName, propertyCost, rentBreakdown, groupName, banker);
    }

    calculateRent(){
        
    }
}