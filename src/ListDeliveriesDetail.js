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
  Grid,
  Text,
  InputGroup,
  Tooltip,
  InputRightAddon,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

function ListDeliveriesDetailModal({
  isOpen,
  onClose,
  onClick,
  getCoord,
  type,
  deliveryGroup,
}) {
  const addresses = 12;

  const renderAdditionalData = (delivery) => {
    return (
      <Tooltip
        label={
          <Table variant="unstyled" size={"sm"}>
            <Thead>
              <Tr>
                <Th>Подъезд</Th>
                <Th>Этаж</Th>
                <Th>Квартира</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>2</Td>
                <Td>3</Td>
              </Tr>
            </Tbody>
          </Table>
        }
        placement="top"
        hasArrow
        closeDelay={200}
      >
        <InputGroup size="md">
          <Flex mr={"2"} direction="column" align="start">
            <FormLabel ml={"1"} htmlFor="order-id">
              Номер посылки
            </FormLabel>
            <Input
              focusBorderColor="#FED057"
              type="text"
              variant="filled"
              value={delivery.order_id}
              id="order-id"
              readOnly
            />
          </Flex>
          <Flex direction="column" align="start">
            <FormLabel ml={"1"} htmlFor="other-input">
              Номер телефона
            </FormLabel>
            <Input
              focusBorderColor="#FED057"
              type="text"
              variant="filled"
              value={delivery.contact_number}
              id="other-input"
              readOnly
            />
          </Flex>
        </InputGroup>
      </Tooltip>
    );
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>№ 231531</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {deliveryGroup && deliveryGroup.deliveries ? (
            deliveryGroup.deliveries.map((delivery, index) => (
              <Box key={delivery.id}>
                <Flex flexDirection="row" align="center">
                  <FormControl>
                    <FormLabel ml={"1"}>Адрес Клиента</FormLabel>
                    <InputGroup size="md">
                      <Input
                        focusBorderColor="#FED057"
                        type="text"
                        variant="filled"
                        value={`${delivery.client_address.address.street} ${delivery.client_address.address.building_number}`}
                        readOnly
                      />
                      {type === "История" && (
                        <InputRightAddon children="12:43" />
                      )}
                    </InputGroup>
                  </FormControl>
                </Flex>
                <Flex mt={"2"} flexDirection="row" align="center">
                  {/* <InputGroup size="md">
                    <Input
                      focusBorderColor="#FED057"
                      type="text"
                      variant="filled"
                      value={delivery.order_id}
                      readOnly
                    />
                  </InputGroup> */}
                  {renderAdditionalData(delivery)}
                </Flex>
                {index !== deliveryGroup.deliveries.length - 1 && (
                  <Flex
                    flexDirection="column"
                    align="center"
                    style={{ marginTop: "10px" }}
                  >
                    <ChevronDownIcon color="gray.400" boxSize={8} />
                  </Flex>
                )}
              </Box>
            ))
          ) : (
            <p>No deliveries found.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="green" size={"md"} onClick={onClick}>
              Назад
            </Button>
            <Button
              colorScheme="yellow"
              size={"md"}
              onClick={() => getCoord(deliveryGroup)}
            >
              Посмотреть на карте
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ListDeliveriesDetailModal;
