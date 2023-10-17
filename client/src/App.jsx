import React from "react";
import "./App.css";
import ContextTask from "./context/ContextTask";
import Header from "./components/Header/Header";
import FormTask from "./components/FormTask/FormTask";
import Footer from "./components/Footer/Footer";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
} from "@chakra-ui/react";

function App() {
  return (
    <>
      <ContextTask>
        <Container>
          <Card>
            <CardHeader pb={1}>
              <Header />
            </CardHeader>
            <CardBody>
              <FormTask />
            </CardBody>
            <CardFooter>
              <Footer />
            </CardFooter>
          </Card>
        </Container>
      </ContextTask>
    </>
  );
}

export default App;
