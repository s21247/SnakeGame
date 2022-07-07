import { GlobalState } from "../../Components/models/GlobalState.interface";
import {
  ADD_BOMB,
  DOWN,
  INCREASE_SNAKE,
  INCREMENT_SCORE,
  LEFT,
  RESET,
  RESET_SCORE,
  RIGHT,
  SET_DIS_DIRECTION,
  UP,
} from "../actions";

export const globalState: GlobalState = {
  snake: [{ x: 580, y: 300 }],
  disallowedDirection: "",
  score: 0,
  bomb: [],
};

const gameReducer = (state = globalState, action: any) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];
      newSnake = [
        {
          x: state.snake[0].x + action.payload[0],
          y: state.snake[0].y + action.payload[1],
        },
        ...newSnake,
      ];
      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    }
    case RESET:
      return {
        ...state,
        snake: [{ x: 580, y: 300 }],
        disallowedDirection: "",
        bomb: [],
      };

    case SET_DIS_DIRECTION:
      return { ...state, disallowedDirection: action.payload };
    case INCREASE_SNAKE:
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x - 20,
            y: state.snake[snakeLen - 1].y - 20,
          },
        ],
      };
    case ADD_BOMB: {
      return {
        ...state,
        bomb: [...state.bomb, action.payload],
      };
    }
    case INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    case RESET_SCORE:
      return { ...state, score: 0 };
    default:
      return state;
  }
};

export default gameReducer;
