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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAccessToken } from "./auth";
function RegisterCarModal({ isOpen, onClose, listCar }) {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleRegister = () => {
    // Gather form data
    const brand = document.getElementById("carBrand").value;
    const model = document.getElementById("carModel").value;
    const color = document.getElementById("carColour").value;
    const vin_code = document.getElementById("carVinCode").value;
    const plate_number = document.getElementById("carNumber").value;

    // Create the request body
    const requestBodyCar = {
      brand,
      model,
      color,
      vin_code,
      plate_number,
    };

    const token = getAccessToken();
    axios
      .post("http://127.0.0.1:8000/api/utils/car/", requestBodyCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRegistrationStatus("success");
        setIsAlertDialogOpen(true);
        onClose();
      })
      .catch((error) => {
        console.error(error);

        setRegistrationStatus("error");
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Регистрация машины</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Error alert */}
            {registrationStatus === "error" && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                Registration failed. Please try again.
              </Alert>
            )}

            {/* Success alert */}

            <Flex direction="row">
              <FormControl id="carBrand" mt={4} mr={2}>
                <FormLabel>Бренд машины</FormLabel>
                <Input focusBorderColor="#FED057" type="text" />
              </FormControl>
              <FormControl id="carModel" mt={4}>
                <FormLabel>Модель машины</FormLabel>
                <Input focusBorderColor="#FED057" type="text" />
              </FormControl>
            </Flex>
            <Flex direction="row">
              <FormControl id="carNumber" mt={4} mr={2}>
                <FormLabel>Номер машины</FormLabel>
                <Input focusBorderColor="#FED057" type="text" />
              </FormControl>
              <FormControl id="carColour" mt={4}>
                <FormLabel>Цвет машины</FormLabel>
                <Input focusBorderColor="#FED057" type="text" />
              </FormControl>
            </Flex>
            <FormControl id="carVinCode" mt={4}>
              <FormLabel>VIN код</FormLabel>
              <Input focusBorderColor="#FED057" type="text" />
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
              <Button colorScheme="green" size={"md"} onClick={listCar}>
                Весь список
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isAlertDialogOpen && (
        <AlertDialog isOpen={isAlertDialogOpen}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Регистарция машины</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              Регистрация машины прошла успешно!
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default RegisterCarModal;
