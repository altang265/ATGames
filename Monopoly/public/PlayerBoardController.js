// This file contains all the methods/functions that will be used during 
// game events.

import { GameBoard } from "./GameBoard";

export class PlayerBoardController {
    constructor(){
        this._GameBoard = new GameBoard();
    }

    #rollDice(){
        let firstValue = Math.floor(Math.random() * 6);
        let secondValue = Math.floor(Math.random() * 6);
        return [firstValue, secondValue]
    }

    

}