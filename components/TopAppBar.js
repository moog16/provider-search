import {useContext} from 'react'
import {MapContext} from './MapContextProvider'
import {Button, Flex, Text } from "@chakra-ui/react";
import FilterIcon from './FilterIcon';
import PharmacyIcon from './PharmacyIcon';


export default function TopAppBar() {
  const {setIsShowingFilters} = useContext(MapContext)
  return (
    <Flex p={4} bgColor="whatsapp.500">
      <Flex flex={1} align='center'>
        <PharmacyIcon />
        <Text color="white" fontWeight="semibold" fontSize="xl" ml={2}>
          Provider Search
        </Text>
      </Flex>

      <Button leftIcon={<FilterIcon />} colorScheme='whatsapp' onClick={() => setIsShowingFilters(true)}>Filters</Button>
    </Flex>
  );
}
