import React, { useEffect, useRef, useState } from "react";
import { useTaskContext } from "../../hooks/useTaskContext";
import { clearLogs, register } from "../../scripts/actions";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  FormControl,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import { validateLogin } from "../../utils/validate";
import AlertSubmited from "../Alerts/AlertSubmited";

const newInput = {
  username: "",
  password: "",
};

const Register = () => {
  const [input, setInput] = useState(newInput);
  // const [errors, setErrors] = useState(newInput);
  const { todo, dispatch } = useTaskContext();
  const refInput = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    clearInputs();
  }, []);

  // useEffect(() => {
  //   setErrors(validateLogin({ ...input }));
  // }, [input]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearLogs());
    dispatch(await register(input));
    clearInputs();
  };

  const openForm = (e) => {
    e.preventDefault();
    dispatch(clearLogs());
    onOpen();
  };

  const closeForm = (e) => {
    dispatch(clearLogs());
    onClose();
  };

  const clearInputs = () => {
    setInput(newInput);
    // setErrors(newInput);
    refInput.current?.focus();
  };

  const showMessageError = (value) => (
    <Alert status="error">
      <AlertIcon />
      <AlertDescription color="red.700">{value}</AlertDescription>
    </Alert>
    // <Tag my={1} py={3} w="100%" justifyContent="center" colorScheme="red">
    //   {value}
    // </Tag>
  );

  return (
    <>
      <Text my={3}>
        ¿No tienes cuenta?&nbsp;
        <Link color="gray.500" href="#" onClick={openForm}>
          registrate aquí
        </Link>
      </Text>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeForm}>
        <ModalOverlay />
        <ModalContent py={3}>
          <ModalHeader textAlign="center">
            <Heading color="blackAlpha.800">Registrar Usuario</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {todo?.error && showMessageError(todo?.error)}
            <FormControl>
              <Input
                my={3}
                ref={refInput}
                id="username-create"
                name="username"
                value={input.username}
                placeholder="Ingrese nombre de usuario"
                onChange={handleChange}
              />
              <Input
                my={3}
                type="password"
                id="password-create"
                name="password"
                value={input.password}
                placeholder="Ingrese una contraseña"
                onChange={handleChange}
              />
            </FormControl>
            {todo?.success && <AlertSubmited description={todo?.success} />}
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              w="full"
              colorScheme="cyan"
              color="whiteAlpha.900"
              mr={3}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Register;
