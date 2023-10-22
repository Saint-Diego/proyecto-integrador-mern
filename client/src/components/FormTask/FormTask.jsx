import React, { useEffect, useRef, useState } from "react";
import {
  Icon,
  Button,
  Divider,
  Textarea,
  Input,
  Tag,
  FormControl,
} from "@chakra-ui/react";
import { MdOutlineAdd, MdOutlineModeEdit } from "react-icons/md";
import { actualizarTarea, crearTarea } from "../../scripts/actions";
import { useTaskContext } from "../../hooks/useTaskContext";
import { validateTask } from "../../utils/validate";
import TaskList from "../TaskList/TaskList";

const newInput = {
  title: "",
  description: "",
};

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
};

const SAVE = "save";
const EDIT = "edit";

const FormTask = () => {
  const [input, setInput] = useState(newInput);
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [options, setOptions] = useState({ id: 0, action: SAVE });
  const { dispatch } = useTaskContext();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (input.title && input.description) setIsDisabled(false);
    else setIsDisabled(true);
  }, [input]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validateTask({ ...input, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isObjectEmpty(error)) {
      if (options.action === SAVE) {
        dispatch(await crearTarea(input));
      } else if (options.action === EDIT) {
        dispatch(await actualizarTarea(options.id, input));
        setOptions({ ...options, action: SAVE });
      }
      clearInputs();
    }
  };

  const clearInputs = () => {
    setInput(newInput);
    inputRef.current.focus();
  };

  const showMessageError = (value) => (
    <Tag my={1} py={3} w="100%" justifyContent="center" colorScheme="red">
      {value}
    </Tag>
  );

  return (
    <>
      <FormControl>
        <Input
          my={1}
          id="task"
          name="title"
          ref={inputRef}
          value={input.title}
          placeholder="Ingrese tarea"
          onChange={handleChange}
          isInvalid={error.title}
        />
        {error.title && showMessageError(error.title)}
        <Textarea
          id="description"
          name="description"
          cols="10"
          rows="3"
          value={input.description}
          placeholder="Ingrese una breve descripción"
          onChange={handleChange}
          isInvalid={error.description}
        ></Textarea>
        {error.description && showMessageError(error.description)}
        <Button
          my={1}
          w="100%"
          border="none"
          colorScheme="cyan"
          isDisabled={isDisabled}
          onClick={handleSubmit}
        >
          {options.action === SAVE ? (
            <Icon as={MdOutlineAdd} boxSize={6} color="white" />
          ) : (
            <Icon as={MdOutlineModeEdit} boxSize={6} color="white" />
          )}
        </Button>
      </FormControl>
      <Divider borderColor="blackAlpha.500" mb={2}/>
      <TaskList setInput={setInput} setOptions={setOptions} />
    </>
  );
};

export default FormTask;
