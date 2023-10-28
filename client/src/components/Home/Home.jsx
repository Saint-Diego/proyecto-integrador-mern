import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
} from "@chakra-ui/react";
import Header from "../Header/Header";
import FormTask from "../FormTask/FormTask";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <Flex direction="column" alignItems="center" pb={5}>
      <NavBar />
      <Container my={5}>
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
    </Flex>
  );
};

export default Home;
