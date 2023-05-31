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
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Box,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import "./Sidebar.css";
import DynamicInputFields from "./InputFields";
import { getAccessToken } from "./auth";
import { useEffect } from "react";
import axios from "axios";

function DriverModalCard({ handleClick, getId, toRemove }) {
  // const drivers = 5;
  const [drivers, setDrivers] = useState([]);
  const token = getAccessToken();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/deliveryman/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.results);
        setDrivers(response.data.results); // Store the deliveryman data in state
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <SimpleGrid columns={2} spacing={"10px"}>
        {drivers.map((driver) => (
          <Card key={driver.id}>
            <CardHeader>
              <Heading size="md">{driver.user.username}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Машина
                  </Heading>

                  {driver.car && driver.car.brand ? (
                    <Text pt="2" fontSize="sm">
                      {driver.car.brand} {driver.car.model}
                    </Text>
                  ) : (
                    <Button
                      mt={"3"}
                      colorScheme="red"
                      variant="solid"
                      size={"sm"}
                      onClick={() => getId(driver.id)}
                    >
                      Выбрать
                    </Button>
                  )}
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Номер телефона
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {driver.phone_number}
                  </Text>
                </Box>
                <Box>
                  {!toRemove ? (
                    <Button
                      colorScheme="yellow"
                      variant="solid"
                      onClick={() => handleClick(driver.id)}
                    >
                      Выбрать
                    </Button>
                  ) : (
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleClick(driver.id)}
                    >
                      Удалить
                    </Button>
                  )}
                </Box>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default DriverModalCard;
