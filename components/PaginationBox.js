import { useContext, useState} from 'react'
import { Box,Text, VStack } from "@chakra-ui/react";

import {MapContext} from './MapContextProvider'
import specialtiesOptions from "../public/specialties.json";
import debounce from '../utils/debounce'
import { Pagination } from '@material-ui/lab';

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
      bgColor='gray.200'
      borderRadius='md'
      h='10vh'
      p={4}
    >
      <Text>Showing {filtersState.limit} of {totalResults}</Text>
      <Pagination 
        count={Math.ceil(totalResults/filtersState.limit)}
        shape="rounded"
        onChange={(evt) => {
          const pageNumber = Number(evt.target.textContent)
          filtersDispatch({
            type: 'SET_PAGE_OFFSET',
            offset: (pageNumber-1) * filtersState.limit
          })
        }}
      />
    </Box>
  );
}
