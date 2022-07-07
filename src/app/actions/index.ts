import {BombPosition} from "../../Components/models/GlobalState.interface";

export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";
export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";
export const SET_DIS_DIRECTION = "SET_DIS_DIRECTION";
export const INCREMENT_SCORE = "INCREMENT_SCORE";
export const INCREASE_SNAKE = "INCREASE_SNAKE";
export const STOP_GAME = "STOP_GAME";
export const RESET_SCORE = "RESET_SCORE";
export const RESET = "RESET";
export const ADD_BOMB = "ADD_BOMB";


export const addBomb = (bombPosition: BombPosition) => {
  return {
    type: ADD_BOMB,
    payload: bombPosition,
  };
};

export const makeMove = (dx: number, dy: number, move: string) => ({
  type: move,
  payload: [dx, dy],
});

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: direction,
});

export const resetGame = () => ({
  type: RESET,
});

export const stopGame = () => ({
  type: STOP_GAME,
});

export const increaseSnake = () => ({
  type: INCREASE_SNAKE,
});

export const scoreUpdates = (type: string) => ({
  type,
});
