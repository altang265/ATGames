
/* This class is for housing properties that the user can purchase 
* throughout the entire board.
* RentBreakdown[] === [
*    rentWithZeroHouses, 
*    rentWithOneHouse, 
*    rentWithTwoHouses,
*    rentWithThreeHouses,
*    rentWithFourHouses,
*    rentWithHotel]
*/
class Deed extends Property {
    constructor(propertyName, propertyCost, rent, groupName, houseCost, hotelCost){
        super(propertyName, propertyCost, rent, groupName);
        this._houseCost = houseCost;
        this._hotelCost = hotelCost;
        this._numOfHouses = 0;
    }

    calculateRent(){
        return this._rentBreakdown[this._numOfHouses];
    }

    //TODO Check to see if they can build (Maybe add a parameter?).
    // Need to check if they have a full set, less than 5 houses
    buildHouses(numToBuild){
        // Check to see if they 
        if(this._numOfHouses+numToBuild < 5)
            this._numOfHouses += numToBuild;
    }

    // TODO Check to see if they have four houses on the other properties
    buildHotel(){
        // do something
    }
}