import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ChakraProvider,
  FormControl,
  Input,
  IconButton,
  Box,
  Flex,
  Stack,
  ButtonGroup,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { setAccessTokenHeader, storeAccessToken } from "./auth";

function LoginModal({ isOpen, onClose, onClick }) {
  const [showRegistration, setShowRegistration] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRegistrationClick = () => {
    setShowRegistration(true);
  };

  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // const username = "pompa";
    const requestBody = {
      // email,
      username,
      password,
    };
    axios
      .post("http://127.0.0.1:8000/api/login_by_email/", requestBody)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        const accessToken = response.data.access;
        storeAccessToken(accessToken);
        setAccessTokenHeader(accessToken);
        setIsLogged(true);
        onClose();
        window.location.reload(); // Reload the page after login
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Вход</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleLogin)}>
            <FormControl id="username" isInvalid={errors.email} mb={3}>
              <FormLabel>Логин</FormLabel>
              <Input
                type="text"
                focusBorderColor="#FED057"

                // {...register("email", {
                //   required: true,
                //   pattern: /^\S+@\S+$/i,
                // })}
              />
              <FormErrorMessage>Логин обязательна</FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password} mb={3}>
              <FormLabel>Пароль</FormLabel>
              <Input
                type="password"
                focusBorderColor="#FED057"
                {...register("password", { required: true })}
              />
              <FormErrorMessage>Пароль обязателен</FormErrorMessage>
            </FormControl>
            <Flex flexDirection="column" align={"center"}>
              <Button
                colorScheme="blue"
                size={"md"}
                type="submit"
                // onClick={() => {
                //   handleSubmit(handleLogin);
                //   window.location.reload(); // Reload the page after login
                // }}
              >
                Войти
              </Button>
            </Flex>
          </form>
        </ModalBody>
        {/* <ModalFooter>
          <Flex justifyContent="center" w="100%">
            <Button
              colorScheme="blue"
              variant="link"
              size={"sm"}
              onClick={onClick}
            >
              Зарегистрироваться
            </Button>
          </Flex>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
