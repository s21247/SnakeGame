import React from "react";
import Game from "./Pages/Game";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Container maxW={"container.lg"} centerContent>
          <Heading as={"h1"} size={"xl"}>
            Snake Game
          </Heading>
          <Game />
        </Container>
      </ChakraProvider>
    </>
  );
}

export default App;
