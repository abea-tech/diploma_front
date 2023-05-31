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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";

function RegisterModal({ isOpen, onClose }) {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = () => {
    // Gather form data
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const companyName = document.getElementById("companyName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("confirmPassword").value;
    const username = "krutoi";

    // Create the request body
    const requestBody = {
      first_name,
      last_name,
      username,
      email,
      password,
      password2,
    };
    axios
      .post("http://127.0.0.1:8000/api/register_by_email/", requestBody)
      .then((response) => {
        console.log(response.data);
        setRegistrationStatus("success");
      })
      .catch((error) => {
        console.error(error);
        setRegistrationStatus("error");
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Регистрация</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Error alert */}
          {registrationStatus === "error" && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Регистрация не прошла успешно!
            </Alert>
          )}

          {/* Success alert */}
          {registrationStatus === "success" && (
            <Alert status="success" mb={4}>
              <AlertIcon />
              Регистрация успешна!
            </Alert>
          )}
          <Flex mt={4}>
            <FormControl id="firstName" mr={2}>
              <FormLabel>Имя</FormLabel>
              <Input focusBorderColor="#FED057" type="text" />
            </FormControl>

            <FormControl id="lastName">
              <FormLabel>Фамилия</FormLabel>
              <Input focusBorderColor="#FED057" type="text" />
            </FormControl>
          </Flex>
          <FormControl id="companyName" mt={4}>
            <FormLabel>Название компании</FormLabel>
            <Input focusBorderColor="#FED057" type="text" />
          </FormControl>

          <FormControl id="phoneNumber" mt={4}>
            <FormLabel>Номер телефона</FormLabel>
            <Input focusBorderColor="#FED057" type="tel" pattern="[0-9]{10}" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input focusBorderColor="#FED057" type="email" />
          </FormControl>

          <FormControl id="password" mr={2}>
            <FormLabel>Пароль</FormLabel>
            <Input focusBorderColor="#FED057" type="password" />
          </FormControl>

          <FormControl id="confirmPassword">
            <FormLabel>Подтверждение пароля</FormLabel>
            <Input focusBorderColor="#FED057" type="password" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="center" w="100%">
            <Button colorScheme="blue" size={"md"} onClick={handleRegister}>
              Зарегистрироваться
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegisterModal;
