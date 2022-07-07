import React from "react";
import { useSelector } from "react-redux";
import { GlobalState } from "./models/GlobalState.interface";
import { Heading } from "@chakra-ui/react";

const Score = () => {
  const score = useSelector((state: GlobalState) => state.score);
  return (
    <Heading as="h2" size="md" mt={5} mb={5}>
      Current Score: {score}
    </Heading>
  );
};

export default Score;
