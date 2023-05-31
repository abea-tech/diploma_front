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

function HistoryModal({ isOpen, onClose, onClick }) {
  const history_data = 7;
  return (
    <Modal
      size={"xl"}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent maxW="800px">
        <ModalHeader>История</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {[...Array(history_data)].map((_, index) => (
              <Card
                key={index}
                size={"sm"}
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="outline"
              >
                <Image
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                  alt="Caffe Latte"
                />

                <Stack>
                  <CardBody>
                    <Heading size="md">№ 231531</Heading>
                    <Text py="2">27.04.2023</Text>
                    <Text py="2">Водитель: Кайрат Нуртас</Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      variant="solid"
                      onClick={onClick}
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
        <ModalFooter>
          {/* <Flex justifyContent="center" w="100%">
            <Button colorScheme="blue" size={"md"}>
              Зарегистрироваться
            </Button>
          </Flex> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default HistoryModal;
