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
import DriverModalCard from "./DriverModal";

function ChooseDriverModal({ isOpen, onClose, handleClick, json, goBack }) {
  if (json) {
    console.log(json);
  }
  const getDriverId = (index) => {
    console.log(index);
  };
  return (
    <Modal
      scrollBehavior={"inside"}
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Выбор водителя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <DriverModalCard handleClick={handleClick} getId={getDriverId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ChooseDriverModal;
