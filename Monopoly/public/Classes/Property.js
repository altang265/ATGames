export class Property {
    /*
    * Color: String
    * PropName: String
    * PropertyCost: int
    * rentBreakdown: int[]
    */
    #_propertyName;
    #_propertyCost;
    #_rentBreakdown;
    #_isMortgaged;
    #_owner;
    #_groupName;
    
    constructor(propertyName, propertyCost, rentBreakdown, groupName, banker){
        this.#_propertyName = propertyName;
        this.#_propertyCost = propertyCost;
        this.#_rentBreakdown = rentBreakdown;
        this.#_isMortgaged = false;
        this.#_owner = banker;
        this.#_groupName = groupName;
    }

    get getGroupName(){
        return this.#_groupName;
    }

    mortgageValue() {
        return this._propertyCost * 0.10 + this._propertyCost;
    }

    setOwner(newOwner) {
        this._owner = newOwner;
    }

}