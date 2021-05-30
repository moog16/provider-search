import Head from "next/head";
import Image from "next/image";
import { Box, Flex } from "@chakra-ui/react";
import TopAppBar from "../components/TopAppBar";
import Map from "../components/Map";

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Provider Search</title>
        <meta name="description" content="Interactive map to find providers near you" />
      </Head>
      <Flex flexDirection="column" h="100vh">
        <TopAppBar />

        <Box flex={1}>
          <Map />
        </Box>
      </Flex>
    </Box>
  );
}
