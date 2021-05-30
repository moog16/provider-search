import { useContext } from "react";
import {MapContext} from './MapContextProvider'
import ProviderSpecialtiesFilter from "./ProviderSpecialtiesFilter";
import ProviderLocationFilter from "./ProviderLocationFilter";
import ProviderNameFilter from "./ProviderNameFilter";

import { Box, Button, Link, Text, ModalCloseButton, Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay,Flex } from "@chakra-ui/react";

export default function FiltersModal() {
  const {isShowingFilters, setIsShowingFilters, filtersDispatch} = useContext(MapContext)

  return (
    <Modal isOpen={isShowingFilters} onClose={() => setIsShowingFilters(false)} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={8}>
          <Flex align='center'>
            <Text flex={1}>Filters</Text>
            <Link 
              color='gray.500'
              onClick={() => {
                filtersDispatch({type: 'RESET_FILTERS'})
              }}
              pr={8}
              fontSize='sm'
            >
              Reset filters
            </Link>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <ProviderNameFilter />
          </Box>
          <Box mb={4}>
            <ProviderLocationFilter />
          </Box>
          <Box>
            <ProviderSpecialtiesFilter />
          </Box>
          <Button onClick={() => setIsShowingFilters(false)} isFullWidth={[true, null, false]} bgColor='whatsapp.500' my={8} color='white'>
            Search
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}