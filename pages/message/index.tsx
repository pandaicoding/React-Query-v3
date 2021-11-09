import React from "react";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Textarea,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useQuery } from "react-query";
import MessageTable from "components/tables/MessageTable";

const getMessages = async () => {
  const response = await fetch("http://localhost:3000/api/message");
  const data = await response.json();
  return data;
};

export type MessageProps = {
  id?: number;
  createdAt?: string;
  phoneNumber: string;
  message: string;
  status?: string;
}

export default function Message() {
  const { data, isSuccess } = useQuery("message", getMessages, {
    refetchInterval: 5000
  })
  return (
    <Layout title="💌 Message" subTitle="Minta Uang">
      <Flex>
        <Box>
          <Box
            w="md"
            p={5}
            mr={4}
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={4}
              pb={2}
              borderBottom="1px"
              borderColor="gray.200"
            >
              ✍️ Request Pulsa
            </Text>
            <form>
              <FormControl pb={4}>
                <FormLabel
                  htmlFor="phoneNumber"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Phone Number
                </FormLabel>
                <Input name="phoneNumber" placeholder="Phone Number" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="name"
                  fontWeight="bold"
                  fontSize="xs"
                  letterSpacing="1px"
                  textTransform="uppercase"
                >
                  Message
                </FormLabel>
                <Textarea placeholder="Bullshit Message" />
                <FormErrorMessage></FormErrorMessage>
              </FormControl>

              <Button mt={4} colorScheme="teal" type="submit">
                Send
              </Button>
            </form>
          </Box>
        </Box>
        <Box flex="1">
          {isSuccess && <MessageTable data={data} />}
        </Box>
      </Flex>
    </Layout>
  );
}