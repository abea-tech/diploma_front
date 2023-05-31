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
import { getAccessToken } from "./auth";
function RegisterDriverModal({ isOpen, onClose, chooseCar, listDrivers }) {
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const handleRegister = () => {
    // Gather form data
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const username = document.getElementById("driverUsername").value;
    const phone_number = document.getElementById("phoneNumber").value;
    const driver_license = document.getElementById("driverLicense").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("confirmPassword").value;

    // Create the request body
    const requestBodyUser = {
      first_name,
      last_name,
      username,
      phone_number,
      driver_license,
      email,
      password,
      password2,
    };

    const token = getAccessToken();
    console.log(requestBodyUser);
    axios
      .post("http://127.0.0.1:8000/api/user/deliveryman/", requestBodyUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(requestBodyUser);
        console.log(response.data);
        setRegistrationStatus("success");
        chooseCar(response.data.id);
      })
      .catch((error) => {
        console.error(error);
        console.log(requestBodyUser);

        setRegistrationStatus("error");
      });
  };

  const handleClose = () => {
    setRegistrationStatus(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Регистрация водителя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Error alert */}
          {registrationStatus === "error" && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              Регистарция провалилась.
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
          <FormControl id="driverLicense" mt={4}>
            <FormLabel>Водительское УДО</FormLabel>
            <Input focusBorderColor="#FED057" type="text" />
          </FormControl>
          <FormControl id="phoneNumber" mt={4}>
            <FormLabel>Номер телефона</FormLabel>
            <Input focusBorderColor="#FED057" type="text" />
          </FormControl>

          <FormControl id="driverUsername" mt={4}>
            <FormLabel>Логин</FormLabel>
            <Input focusBorderColor="#FED057" type="tel" pattern="[0-9]{10}" />
          </FormControl>
          <FormControl id="email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input focusBorderColor="#FED057" type="email" />
          </FormControl>

          <FormControl id="password" mt={4}>
            <FormLabel>Пароль</FormLabel>
            <Input focusBorderColor="#FED057" type="password" />
          </FormControl>

          <FormControl mt={4} id="confirmPassword">
            <FormLabel>Подтверждение пароля</FormLabel>
            <Input focusBorderColor="#FED057" type="password" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="center" w="100%">
            <Button
              colorScheme="blue"
              size={"md"}
              mr={"2"}
              onClick={handleRegister}
            >
              Зарегистрировать
            </Button>
            <Button colorScheme="green" size={"md"} onClick={listDrivers}>
              Весь список
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RegisterDriverModal;
