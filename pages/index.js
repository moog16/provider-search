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
        <link rel="stylesheet" href="./leaflet/leaflet.css" />
        <link rel="stylesheet" href=".https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css" />
        {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script> */}
        <script src="./leaflet/leaflet.js"></script>
        <script src='https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'></script>
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
