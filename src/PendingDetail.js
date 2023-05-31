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
  InputRightAddon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

function PendingDetailModal({ isOpen, onClose, onClick }) {
  const addresses = 12;
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>№ 231531</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {[...Array(addresses)].map((_, index) => (
            <Box key={index}>
              <Flex flexDirection="row" align={"center"}>
                <InputGroup size="md">
                  <Input
                    focusBorderColor="#FED057"
                    type="text"
                    variant="filled"
                    value="Нажимеденова 26/1"
                    readOnly
                  />
                  {/* <InputRightAddon children="12:43" /> */}
                </InputGroup>
              </Flex>
              {index !== addresses - 1 && (
                <Flex flexDirection="column" align={"center"}>
                  <ChevronDownIcon color={"gray.400"} boxSize={8} />
                </Flex>
              )}
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Stack spacing={4} direction="row" align="center">
            <Button colorScheme="green" size={"md"} onClick={onClick}>
              Назад
            </Button>
            {/* <Button colorScheme="yellow" size={"md"}>
              Посмотреть маршрут
            </Button> */}
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default PendingDetailModal;
