import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  ObjectBody,
  snakeCollided,
} from "../utils";
import { GlobalState } from "./models/GlobalState.interface";
import {
  addBomb,
  increaseSnake,
  INCREMENT_SCORE,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RESET_SCORE,
  resetGame,
  scoreUpdates,
  stopGame,
} from "../app/actions";
import { BombPosition } from "./models/GlobalState.interface";
import Instructions from "./Instructions";

interface CanvasProps {
  height: number;
  width: number;
}

const CanvasPanel = ({ height, width }: CanvasProps) => {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [position, setPosition] = useState<ObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );
  const [bombPosition, setBombPosition] = useState<BombPosition>(
    generateRandomPosition(width - 20, height - 20)
  );
  const snake = useSelector((state: GlobalState) => state.snake);
  const disallowedDirection = useSelector(
    (state: GlobalState) => state.disallowedDirection
  );
  const bombPositionArray = useSelector((state: GlobalState) => state.bomb);
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  );
  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);
    drawObject(context, snake, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    );
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake, width]);

  useEffect(() => {
    if (isConsumed) {
      const position = generateRandomPosition(width - 20, height - 20);
      setPosition(position);
      setIsConsumed(false);
      dispatch(increaseSnake());
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }

    if (!gameEnded) {
      const interval = setInterval(() => {
        const position = generateRandomPosition(width - 20, height - 20);
        setPosition(position);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isConsumed, width, height, dispatch, position, gameEnded]);
  useEffect(() => {
    if (!gameEnded) {
      const interval2 = setInterval(() => {
        const position = generateRandomPosition(width - 20, height - 20);
        setBombPosition(position);
        dispatch(addBomb(bombPosition));
      }, 30000);
      return () => clearInterval(interval2);
    }
  }, [bombPosition, dispatch, gameEnded, height, width]);
  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current?.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake, "#91C483");
    drawObject(context, [position], "#8B0000");
    drawObject(context, [...bombPositionArray], "#080808");
    if (snake[0].x === position?.x && snake[0].y === position?.y) {
      setIsConsumed(true);
    }
    if (
      snakeCollided(snake, snake[0]) ||
      snake[0].x >= width ||
      snake[0].x <= 0 ||
      snake[0].y <= 0 ||
      snake[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else if (
      bombPositionArray.some((e) => e?.x === snake[0].x && e?.y === snake[0].y)
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);
  }, [
    context,
    position,
    snake,
    height,
    width,
    handleKeyEvents,
    dispatch,
    bombPositionArray,
  ]);
  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          border: `3px solid ${gameEnded ? "red" : "black"}`,
        }}
        height={height}
        width={width}
      />
      <Instructions resetBoard={resetBoard} />
    </>
  );
};

export default CanvasPanel;
