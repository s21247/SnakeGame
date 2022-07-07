import React from "react";
import CanvasPanel from "../Components/CanvasPanel";
import Score from "../Components/Score";

const Game = () => {
  return (
    <>
      <Score />
      <CanvasPanel height={600} width={1000} />
    </>
  );
};

export default Game;
