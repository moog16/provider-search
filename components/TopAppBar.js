import {useContext} from 'react'
import {MapContext} from './MapContextProvider'
import {Button, Flex, Text } from "@chakra-ui/react";
import FilterIcon from './FilterIcon';

export default function TopAppBar() {
  const {setIsShowingFilters} = useContext(MapContext)
  return (
    <Flex p={4} bgColor="whatsapp.500">
      <Text color="white" fontWeight="semibold" fontSize="xl" flex={1}>
        1 Up Health
      </Text>
      <Button leftIcon={<FilterIcon />} colorScheme='whatsapp' onClick={() => setIsShowingFilters(true)}>Filters</Button>
    </Flex>
  );
}
