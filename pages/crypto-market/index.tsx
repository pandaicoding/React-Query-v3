/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Badge, Flex, Table, Tbody, Td, Th, Thead, Tr, Image, Text, Spinner, Grid, Button } from "@chakra-ui/react";
import Layout from "components/Layout";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import Percentage from "components/formatter/Percentage";
import Price from "components/formatter/Price";
import NumberFormatter from "components/formatter/NumberFormatter";

type Price = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
};

const getMarket = async (page = 1) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["market", 1], () => getMarket());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Market() {
  const [page, setPage] = useState(1);
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(["market", page], () => getMarket(page), {
    // staleTime: 5000,
    refetchInterval: 7000,
  });
  return (
    <Layout title="Crypto Market">
      {isFetching && <Spinner color="blue.500" position="fixed" top={10} right={10} />}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Coin</Th>
            <Th>Last Price</Th>
            <Th>24h % Change</Th>
            <Th isNumeric>Total Volume</Th>
            <Th isNumeric>Market Cap</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isSuccess && data?.map((price: Price) => (
            <Tr key={price.id}>
              <Td>
                <Flex alignItems="center">
                  <Image
                    src={price.image}
                    boxSize="24px"
                    ignoreFallback={true}
                  />
                  <Text pl={2} fontWeight="bold" textTransform="capitalize">
                    {price.id}
                  </Text>
                  <Badge ml={3}>{price.symbol}</Badge>
                </Flex>
              </Td>
              <Td>{Price(price.current_price)}</Td>
              <Td><Percentage percent={(price.price_change_percentage_24h)} /></Td>
              <Td isNumeric>{NumberFormatter(price.total_volume)}</Td>
              <Td isNumeric>{NumberFormatter(price.market_cap)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Grid templateColumns="70% 1fr auto 1fr" gap={6} mt={10} >
        <div></div>
        <Button
          colorScheme="facebook"
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={page === 1 ? true : false}
        >
          Previous
        </Button>
        <Text>{page}</Text>
        <Button
          colorScheme="facebook"
          variant="outline"
          size="sm"
          onClick={nextPage}
        >
          Next
        </Button>
      </Grid>
    </Layout>
  );
}