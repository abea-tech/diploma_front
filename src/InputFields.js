import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Box,
  Flex,
  Spacer,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, ChevronDownIcon } from "@chakra-ui/icons";

function DynamicInputFields(props) {
  const [numFields, setNumFields] = useState(1);
  let dataArray = [];

  const handleAddField = () => {
    setNumFields(numFields + 1);
  };

  const handleRemoveField = (index) => {
    console.log(index);
    const newFields = [...Array(numFields)].filter((_, i) => i !== index);
    console.log(newFields);
    setNumFields(newFields.length);
  };

  const handleInputChange = (event) => {
    // setInputValues({
    //   ...inputValues,
    //   [event.target.id]: event.target.value,
    // });
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      const data = {
        value: input.value,
      };
      dataArray.push(data);
    });
    console.log(dataArray);
  };

  const handleSubmit = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input) => {
      const data = {
        value: input.value,
      };
      dataArray.push(data);
    });
    console.log(dataArray);
  };

  return (
    <Box>
      {[...Array(numFields)].map((_, index) => (
        <FormControl style={{ marginTop: "10px" }} key={index}>
          <Flex flexDirection="row" align={"center"}>
            <Input
              focusBorderColor="#FED057"
              type="text"
              placeholder="Введите точку назначения"
              id={`address-${index + 1}`}
              onChange={handleInputChange}
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
          <Flex flexDirection="column" align={"center"}>
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
  );
}

export default DynamicInputFields;
