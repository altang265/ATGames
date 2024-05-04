export class Property {
    /*
    * Color: String
    * PropName: String
    * PropertyCost: int
    * rentBreakdown: int[]
    */
    constructor(propertyName, propertyCost, rentBreakdown, groupName, banker){
        this._propertyName = propertyName;
        this._propertyCost = propertyCost;
        this._rentBreakdown = rentBreakdown;
        this._isMortgaged = false;
        this._owner = banker;
        this._groupName = groupName;
    }

    mortgageValue() {
        return this._propertyCost * 0.10 + this._propertyCost;
    }

    setOwner(newOwner) {
        this._owner = newOwner;
    }
}