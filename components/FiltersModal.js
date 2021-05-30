import { useContext } from "react";
import {MapContext} from './MapContextProvider'
import ProviderSpecialtiesFilter from "./ProviderSpecialtiesFilter";
import ProviderLocationFilter from "./ProviderLocationFilter";
import { Box, Button, ModalCloseButton, Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay,Flex } from "@chakra-ui/react";

export default function FiltersModal() {
  const {isShowingFilters, setIsShowingFilters} = useContext(MapContext)

  return (
    <Modal isOpen={isShowingFilters} onClose={() => setIsShowingFilters(false)} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Filters
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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