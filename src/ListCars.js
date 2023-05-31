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
  Card,
  Image,
  CardBody,
  Heading,
  Text,
  CardFooter,
  VStack,
  StackDivider,
  SimpleGrid,
  CardHeader,
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
import DriverModalCard from "./DriverModal";
import { getAccessToken } from "./auth";
import axios from "axios";
import { Table, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect } from "react";

function ListCarModal({ isOpen, onClose, driverId }) {
  const [carData, setCarData] = useState([]);
  const [carStatus, setCarStatus] = useState(null);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const token = getAccessToken();
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://127.0.0.1:8000/api/utils/car/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data.results);
          setCarData(response.data.results); // Update the carData state with the response data
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOpen]);

  const handleSubmit = (car) => {
    // const formData = new FormData();
    // formData.append("car", car);
    // const requestBodyCar = {
    //   car,
    // };
    axios
      .delete(`http://127.0.0.1:8000/api/utils/car/${car}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data", // Set the content type to form data
        },
      })
      .then((response) => {
        console.log(response.data);
        setCarStatus("success");
        setIsAlertDialogOpen(true);
        // setCarData(response.data.results); // Update the carData state with the response data
        onClose();
      })
      .catch((error) => {
        console.error(error);
        setCarStatus("error");
      });
  };

  const handleClose = () => {
    setCarStatus(null);
    onClose();
  };
  return (
    <>
      <Modal
        scrollBehavior={"inside"}
        size={"3xl"}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Список машин</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Box overflowX="auto"> */}
            <Flex>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Номер машины</Th>
                    <Th>VIN код</Th>
                    <Th>Бренд</Th>
                    <Th>Модель</Th>
                    <Th>Цвет</Th>
                    <Th></Th>
                  </Tr>

                  {carData.map((car) => (
                    <Tr key={car.id}>
                      <Td>{car.plate_number}</Td>
                      <Td>{car.vin_code}</Td>
                      <Td>{car.brand}</Td>
                      <Td>{car.model}</Td>
                      <Td>{car.color}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          variant={"outline"}
                          size="sm"
                          onClick={() => handleSubmit(car.id)}
                        >
                          Удалить
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
            {/* </Box> */}
          </ModalBody>
        </ModalContent>
      </Modal>
      {isAlertDialogOpen && (
        <AlertDialog isOpen={isAlertDialogOpen}>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Машина удалена!</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>Машина успешно удалена!!</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => setIsAlertDialogOpen(false)}
              >
                Закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export default ListCarModal;
