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
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

function RouteModal({ isOpen, onClose, chooseDriver }) {
  const [numFields, setNumFields] = useState(1);
  const [formData, setFormData] = useState([]);

  const handleRemoveField = (index) => {
    const newFields = [...Array(numFields)].filter((_, i) => i !== index);
    setNumFields(newFields.length);
  };

  const handleAddField = () => {
    setNumFields(numFields + 1);
  };

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [id]: value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    // Create JSON object from formData
    const addresses = formData.map((data, index) => ({
      contact_number: data[`clientNumber-${index + 1}`],
      order_id: data[`order_id-${index + 1}`],
      address: data[`address-${index + 1}`],
      entrance: data[`entrance-${index + 1}`],
      floor: data[`floor-${index + 1}`],
      apartment_number: data[`apartment-${index + 1}`],
    }));

    const jsonData = JSON.stringify({ addresses });
    chooseDriver(jsonData);

    // Send jsonData to backend endpoint
    // ... (your code here)
  };

  const handleClose = () => {
    setFormData([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      scrollBehavior={"inside"}
      size={"lg"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Маршрут</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            {[...Array(numFields)].map((_, index) => (
              <FormControl style={{ marginTop: "10px" }} key={index}>
                <Flex flexDirection="row" align={"center"}>
                  <Input
                    focusBorderColor="#FED057"
                    type="text"
                    placeholder="Введите точку назначения"
                    id={`address-${index + 1}`}
                    onChange={(e) => handleChange(e, index)}
                  />

                  {index > 1 && (
                    <IconButton
                      style={{ marginLeft: "5px" }}
                      ml="auto"
                      colorScheme="red"
                      size="md"
                      variant={"outline"}
                      aria-label="Remove address"
                      icon={<MinusIcon />}
                      onClick={() => handleRemoveField(index)}
                    />
                  )}
                </Flex>
                <Flex mt={2} flexDirection="column" align={"center"}>
                  <Flex mb={2}>
                    <Input
                      focusBorderColor="#FED057"
                      placeholder="Номер клиента"
                      type="text"
                      flex={"30%"}
                      onChange={(e) => handleChange(e, index)}
                      id={`clientNumber-${index + 1}`}
                    />
                    <Input
                      focusBorderColor="#FED057"
                      placeholder="Подъезд"
                      type="text"
                      flex={"20%"}
                      onChange={(e) => handleChange(e, index)}
                      id={`entrance-${index + 1}`}
                    />

                    <Input
                      focusBorderColor="#FED057"
                      placeholder="Этаж"
                      type="text"
                      flex={"20%"}
                      onChange={(e) => handleChange(e, index)}
                      id={`floor-${index + 1}`}
                    />

                    <Input
                      focusBorderColor="#FED057"
                      placeholder="Квартира"
                      type="text"
                      flex={"20%"}
                      onChange={(e) => handleChange(e, index)}
                      id={`apartment-${index + 1}`}
                    />
                  </Flex>
                  <Input
                    focusBorderColor="#FED057"
                    type="text"
                    placeholder="Введите ID посылки"
                    onChange={(e) => handleChange(e, index)}
                    id={`order_id-${index + 1}`}
                  />
                  <ChevronDownIcon color={"gray.400"} boxSize={8} />
                </Flex>
              </FormControl>
            ))}
            <Flex flexDirection="column" align={"center"}>
              <IconButton
                alignItems="center"
                style={{ marginTop: "10px" }}
                size="md"
                aria-label="Add address"
                icon={<AddIcon color={"gray.400"} />}
                onClick={handleAddField}
              />
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Закрыть
          </Button>
          <Button colorScheme="yellow" onClick={() => handleSubmit()}>
            Выбрать водителя
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default RouteModal;
