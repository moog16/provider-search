import { useContext, useState} from 'react'
import { Box,Text, VStack } from "@chakra-ui/react";

import {MapContext} from './MapContextProvider'
import specialtiesOptions from "../public/specialties.json";
import debounce from '../utils/debounce'

export default function PaginationBox() {
  const {filtersState, filtersDispatch, totalResults} = useContext(MapContext)
  const {specialties, location} = filtersState
  const [locationValue, setLocationValue] = useState('')

  return (
    <Box
      position='absolute'
      bottom={5}
      left={5}
      zIndex={500}
      bgColor='gray.700'
      borderRadius='md'
      p={4}
      color='white'
      fontSize='lg'
    >
      <Text>Showing {totalResults}</Text>
      
    </Box>
  );
}
