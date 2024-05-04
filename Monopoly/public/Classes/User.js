export class User {

    constructor(playerNumber, playerColor, playerToken, isBanker){
        this._playerNumber = playerNumber;
        this._playerColor = playerColor;
        this._totalCash = (isBanker ? 1000000 : 1500);
        this._listOfProperties = []; // Stores list of property names
        this._isRetired = false;
        this._isBanker = isBanker;
        this._playerToken = playerToken;
        this._hasGetOutOfJailFreeCard = false;
    }

    calculateNetWorth() {
        let total = this._totalCash;
        for(let prop of this._listOfProperties){
            total += prop._propertyCost;
        }
        return total;
    }

    retirePlayer() {
        this._isRetired = true;
    }
}