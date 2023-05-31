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
import { getAccessToken } from "./auth";
import axios from "axios";
import { useEffect } from "react";

function ListDeliveriesModal({ isOpen, onClose, onClick, type }) {
  const [deliveryGroups, setDeliveryGroups] = useState([]);
  const [state, setState] = useState("");

  const token = getAccessToken();

  useEffect(() => {
    if (type === "История") {
      setState("COMPLETED");
    } else if (type === "В ожидании") {
      setState("ON HOLD");
    }
  }, [type]);
  useEffect(() => {
    if (isOpen && state) {
      axios
        .get(
          `http://127.0.0.1:8000/api/delivery/delivery_group?state=${state}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.results);
          setDeliveryGroups(response.data.results); // Store the delivery group data in state
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOpen, state, token]);

  const nullyfyingDeliveryGroup = () => {
    onClose();
    setState(null);
    setDeliveryGroups([]);
  };
  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onClose={nullyfyingDeliveryGroup}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>{type}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {deliveryGroups.map((group, index) => (
              <Card
                key={group.id}
                size={"sm"}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={group.deliveryman.avatar}
                  // alt="Ca"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">№ {group.id}</Heading>

                    <Text py="2">
                      Водитель: {group.deliveryman.user.username}
                    </Text>
                    <Text py="2">
                      Номер водитея: {group.deliveryman.phone_number}
                    </Text>
                    <Text py="2">
                      Машина: {group.deliveryman.car.brand}{" "}
                      {group.deliveryman.car.model}
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="solid"
                      onClick={() => onClick(deliveryGroups[index])}
                      colorScheme="yellow"
                    >
                      Подробнее
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ListDeliveriesModal;
