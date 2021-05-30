import { useContext, useState} from 'react'
import { Box,Text, VStack } from "@chakra-ui/react";

import {MapContext} from './MapContextProvider'
import specialtiesOptions from "../public/specialties.json";
import debounce from '../utils/debounce'

export default function PaginationBox() {
  const {filtersState, filtersDispatch, totalResults} = useContext(MapContext)
  const {specialties, location} = filtersState
  const {radius, title} = location ?? {}
  const [locationValue, setLocationValue] = useState('')

  return (
    <Box
      position='absolute'
      bottom={5}
      zIndex={500}
      maxW='100%'
      p={4}
    >
      <Box
        p={4}
        bgColor='gray.700'
        color='gray.200'
        borderRadius='md'
        fontSize='md'
      > 
        Showing{' '}<Text as='span' fontWeight='semibold'>{totalResults}</Text> results
        {
          title ? <Box>
            <Text as='span'>Searching</Text>  
            <Text isTruncated>{title}</Text>
          </Box> : ''
        }
        {radius ? (
          <Box>
            <Text as='span'>in a</Text>{' '} 
            <Text as='span' fontWeight='semibold'>{Math.round(radius)}</Text>{' '} 
            <Text as='span'>mi radius</Text>{' '}
          </Box>
        )
        : ''}
      </Box>
    </Box>
  );
}
