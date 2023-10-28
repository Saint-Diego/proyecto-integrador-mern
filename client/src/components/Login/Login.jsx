import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Divider,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { clearLogs, login } from "../../scripts/actions";
import { useTaskContext } from "../../hooks/useTaskContext";
import Register from "../Register/Register";

const data = {
  username: "",
  password: "",
};

const Login = () => {
  const [input, setInput] = useState(data);
  const [show, setShow] = useState(false);
  const { todo, dispatch } = useTaskContext();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    clearInputs();
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearLogs());
    dispatch(await login(input));
    clearInputs();
    navigate("/home");
  };

  const handleClick = () => setShow(!show);

  const clearInputs = () => {
    setInput(data);
    inputRef.current?.focus();
  };

  const showMessageError = (value) => (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription color="red.700">{value}</AlertDescription>
    </Alert>
  );

  return (
    <Flex py={10} justifyContent="center">
      <Flex justifyContent="center" h="400px" m={5} bgColor="whitesmoke">
        <FormControl
          w={["xs", "sm"]}
          p={6}
          boxShadow="0px 0px 5px 0px #00000073"
        >
          <Heading mb={3} color="blackAlpha.800">
            Login
          </Heading>
          <Divider borderColor="blackAlpha.500" mb={2} />
          {todo?.error && showMessageError(todo?.error)}
          <Input
            my={3}
            id="username-login"
            name="username"
            ref={inputRef}
            value={input.username}
            placeholder="Ingrese nombre de usuario"
            onChange={handleChange}
          />
          <InputGroup size="md">
            <Input
              my={3}
              pr="4.5rem"
              id="password-login"
              type={show ? "text" : "password"}
              name="password"
              value={input.password}
              placeholder="Ingrese contraseña"
              onChange={handleChange}
            />
            <InputRightElement right="4px" top="12px" width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Ocultar" : "Mostrar"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            my={5}
            w="100%"
            border="none"
            colorScheme="cyan"
            color="whiteAlpha.900"
            onClick={handleSubmit}
          >
            Ingresar
          </Button>
          <Register />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;
