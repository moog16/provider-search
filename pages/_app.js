import React from "react";
import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import MapContextProvider from "../components/MapContextProvider";

const theme = extendTheme({
  fonts: {
    heading: `'Merriweather', serif`,
  },
});

function App({ Component, pageProps }) {
  return (
    <MapContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MapContextProvider>
  );
}

export default App;
